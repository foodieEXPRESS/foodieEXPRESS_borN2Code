
const { io } = require('socket.io-client');

// Fixed driverId as requested
const DRIVER_ID = '7212e0a5-88f4-4a47-b415-85f9671d8dc3';

// Order ID from CLI arg or ENV
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
const USE_REAL = String(process.env.USE_REAL || '').toLowerCase() === 'true';
const API_BASE_URL = process.env.API_BASE_URL; 
const API_TOKEN = process.env.API_TOKEN;   

const socket = io(SOCKET_URL, { transports: ['websocket'] });

socket.on('connect', async () => {
  console.log('Driver connected:', socket.id, 'driverId:', DRIVER_ID, 'orderId:', ORDER_ID);

  // Join the order room as a driver
  socket.emit('join_order', { orderId: ORDER_ID, role: 'driver', driverId: DRIVER_ID });

  const cliStartLat = parseFloat(process.argv[3]);
  const cliStartLng = parseFloat(process.argv[4]);
  const cliEndLat = parseFloat(process.argv[5]);
  const cliEndLng = parseFloat(process.argv[6]);

  const DEFAULT_ROUTE = [
    { lat: 40.7589, lng: -73.9851 }, 
    { lat: 40.7596, lng: -73.9837 },
    { lat: 40.7602, lng: -73.9824 },
    { lat: 40.7608, lng: -73.9810 },
    { lat: 40.7613, lng: -73.9797 },
    { lat: 40.7616, lng: -73.9786 },
    { lat: 40.7616, lng: -73.9776 }, 
  ];
  const startOverride = !Number.isNaN(cliStartLat) && !Number.isNaN(cliStartLng)
    ? { lat: cliStartLat, lng: cliStartLng }
    : (process.env.START_LAT && process.env.START_LNG
        ? { lat: parseFloat(process.env.START_LAT), lng: parseFloat(process.env.START_LNG) }
        : null);
  const endOverride = !Number.isNaN(cliEndLat) && !Number.isNaN(cliEndLng)
    ? { lat: cliEndLat, lng: cliEndLng }
    : (process.env.END_LAT && process.env.END_LNG
        ? { lat: parseFloat(process.env.END_LAT), lng: parseFloat(process.env.END_LNG) }
        : null);
  let ROUTE = [...DEFAULT_ROUTE];
  if (USE_REAL && API_BASE_URL) {
    try {
      const url = `${API_BASE_URL.replace(/\/$/, '')}/${ORDER_ID}`;
      const headers = API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {};
      console.log('Fetching real order details from:', url);
      const resp = await fetch(url, { headers });
      if (!resp.ok) throw new Error(`API ${resp.status}`);
      const json = await resp.json();
      const data = json?.data || json; 
      const rLat = data?.restaurant?.latitude ?? data?.restaurant?.lat;
      const rLng = data?.restaurant?.longitude ?? data?.restaurant?.lng;
      const cLat = data?.customer?.latitude ?? data?.customer?.lat;
      const cLng = data?.customer?.longitude ?? data?.customer?.lng;
      if (
        typeof rLat === 'number' && typeof rLng === 'number' &&
        typeof cLat === 'number' && typeof cLng === 'number'
      ) {
        const start = startOverride || { lat: rLat, lng: rLng };
        const end = endOverride || { lat: cLat, lng: cLng };
        const steps = 25;
        const pts = [];
        for (let i = 0; i <= steps; i += 1) {
          const t = i / steps;
          pts.push({ lat: start.lat + (end.lat - start.lat) * t, lng: start.lng + (end.lng - start.lng) * t });
        }
        ROUTE = pts;
        console.log('Using REAL route', `(${start.lat},${start.lng}) -> (${end.lat},${end.lng})`, 'with', ROUTE.length, 'waypoints');
      } else {
        console.warn('API response missing lat/lng, falling back to dummy route');
      }
    } catch (e) {
      console.warn('Failed to fetch real order details:', e.message, '— falling back to dummy route');
    }
  }

  if (startOverride) ROUTE[0] = startOverride;
  if (endOverride) ROUTE[ROUTE.length - 1] = endOverride;

  console.log('Using', USE_REAL && API_BASE_URL ? 'REAL' : 'DUMMY', 'route with', ROUTE.length, 'waypoints');

  const intervalMs = parseInt(process.env.INTERVAL_MS || '1500', 10);
  let idx = 0;

  const emitPoint = () => {
    const point = ROUTE[idx];
    const payload = { orderId: ORDER_ID, driverId: DRIVER_ID, lat: point.lat, lng: point.lng, ts: Date.now() };
    socket.emit('driver_location', payload);

    // One-way: advance until final waypoint, then stop
    if (idx >= ROUTE.length - 1) {
      console.log('Reached customer destination, stopping driver updates.');
      clearInterval(interval);
      return;
    }
    idx += 1;
  };

  const interval = setInterval(emitPoint, intervalMs);
  emitPoint();

  socket.on('disconnect', () => {
    clearInterval(interval);
  });
});

socket.on('connect_error', (err) => {
  console.error('Socket connect_error:', err.message);
});
