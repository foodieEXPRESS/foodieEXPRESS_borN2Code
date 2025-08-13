// Mock driver that emits periodic location updates to the Socket.IO server
// Usage:
//   node realtime/mockDriver.js <ORDER_ID>
// or set env var:
//   PowerShell:   $env:ORDER_ID = "your-order-id"; node realtime/mockDriver.js
//   CMD:          set ORDER_ID=your-order-id && node realtime/mockDriver.js
//   Bash (WSL):   ORDER_ID=your-order-id node realtime/mockDriver.js

const { io } = require('socket.io-client');

// Fixed driverId as requested
const DRIVER_ID = '7212e0a5-88f4-4a47-b415-85f9671d8dc3';

// Order ID from CLI arg or ENV
// CLI format: node realtime/mockDriver.js <ORDER_ID> [<startLat> <startLng> <endLat> <endLng>]
const ORDER_ID = process.argv[2] || process.env.ORDER_ID || '483a2d3c-106d-4ddf-90b6-0009816d9134';
if (!ORDER_ID) {
  console.error('\nMissing ORDER_ID. Provide it as an arg or env variable.');
  console.error('Examples:');
  console.error('  node realtime/mockDriver.js <ORDER_ID>');
  console.error('  node realtime/mockDriver.js <ORDER_ID> <startLat> <startLng> <endLat> <endLng>');
  console.error('  $env:ORDER_ID = "00000000-0000-0000-0000-000000000000"; node realtime/mockDriver.js');
  process.exit(1);
}

const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:8081';
const API_BASE_URL = process.env.API_BASE_URL; // e.g. http://localhost:8080/api/am/order-details-tracking
const API_TOKEN = process.env.API_TOKEN;      // Bearer token for protected endpoints

const socket = io(SOCKET_URL, { transports: ['websocket'] });

// Attempt to fetch restaurant/customer coordinates for the given order
async function resolveStartEndFromAPI(orderId) {
  if (!API_BASE_URL || !API_TOKEN) return null;
  try {
    const headers = { 'Authorization': `Bearer ${API_TOKEN}` };
    const [restRes, custRes] = await Promise.all([
      fetch(`${API_BASE_URL}/order/${orderId}/restaurant`, { headers }),
      fetch(`${API_BASE_URL}/order/${orderId}/customer`, { headers })
    ]);
    if (!restRes.ok || !custRes.ok) {
      console.warn('API fetch failed with status:', restRes.status, custRes.status);
      return null;
    }
    const restaurant = await restRes.json();
    const customer = await custRes.json();
    const rLat = parseFloat(restaurant?.latitude ?? restaurant?.data?.latitude);
    const rLng = parseFloat(restaurant?.longitude ?? restaurant?.data?.longitude);
    const cLat = parseFloat(customer?.latitude ?? customer?.data?.latitude);
    const cLng = parseFloat(customer?.longitude ?? customer?.data?.longitude);
    if ([rLat, rLng, cLat, cLng].some(Number.isNaN)) return null;
    return { START_LAT: rLat, START_LNG: rLng, END_LAT: cLat, END_LNG: cLng };
  } catch (e) {
    console.warn('API fetch error:', e.message || e);
    return null;
  }
}

socket.on('connect', async () => {
  console.log('Driver connected:', socket.id, 'driverId:', DRIVER_ID, 'orderId:', ORDER_ID);

  // Join the order room as a driver
  socket.emit('join_order', { orderId: ORDER_ID, role: 'driver', driverId: DRIVER_ID });

  // Determine dynamic start/end (restaurant -> customer)
  // Priority: API (if configured) > CLI args > ENV vars > defaults
  const cliStartLat = parseFloat(process.argv[3]);
  const cliStartLng = parseFloat(process.argv[4]);
  const cliEndLat = parseFloat(process.argv[5]);
  const cliEndLng = parseFloat(process.argv[6]);

  let coords = await resolveStartEndFromAPI(ORDER_ID);
  let START_LAT, START_LNG, END_LAT, END_LNG;
  if (coords) {
    ({ START_LAT, START_LNG, END_LAT, END_LNG } = coords);
  } else {
    START_LAT = !Number.isNaN(cliStartLat) ? cliStartLat : (process.env.START_LAT ? parseFloat(process.env.START_LAT) : 40.7589);
    START_LNG = !Number.isNaN(cliStartLng) ? cliStartLng : (process.env.START_LNG ? parseFloat(process.env.START_LNG) : -73.9851);
    END_LAT   = !Number.isNaN(cliEndLat)   ? cliEndLat   : (process.env.END_LAT   ? parseFloat(process.env.END_LAT)   : 40.7616);
    END_LNG   = !Number.isNaN(cliEndLng)   ? cliEndLng   : (process.env.END_LNG   ? parseFloat(process.env.END_LNG)   : -73.9776);
  }

  console.log('Using route:', { START_LAT, START_LNG, END_LAT, END_LNG });

  // Linear interpolation between start and end; ping-pong back and forth
  const steps = parseInt(process.env.STEPS || '20', 10); // number of segments between points
  const intervalMs = parseInt(process.env.INTERVAL_MS || '1500', 10);
  let idx = 0;
  let forward = true;

  const emitPoint = () => {
    const t = idx / steps; // 0..1
    const lat = START_LAT + (END_LAT - START_LAT) * t;
    const lng = START_LNG + (END_LNG - START_LNG) * t;

    // Rough speed estimate for UI
    const dLat = (END_LAT - START_LAT) / steps;
    const dLng = (END_LNG - START_LNG) / steps;
    const approxMeters = Math.sqrt(dLat*dLat + dLng*dLng) * 111_000; // per step
    const speedKmh = Math.max(10, Math.min(50, (approxMeters / 1000) / (intervalMs/3600000)));

    const payload = { orderId: ORDER_ID, driverId: DRIVER_ID, lat, lng, speedKmh, ts: Date.now() };
    socket.emit('driver_location', payload);

    if (forward) {
      idx += 1;
      if (idx >= steps) { forward = false; }
    } else {
      idx -= 1;
      if (idx <= 0) { forward = true; }
    }
  };

  const interval = setInterval(emitPoint, intervalMs);
  emitPoint(); // emit immediately

  socket.on('disconnect', () => {
    clearInterval(interval);
  });
});

socket.on('connect_error', (err) => {
  console.error('Socket connect_error:', err.message);
});
