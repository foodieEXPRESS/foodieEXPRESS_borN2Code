// Standalone Socket.IO server for live driver tracking
// Does not modify or depend on server/index.js
// Run with: node server/realtime/driverTracking.js

const http = require('http');
const { Server } = require('socket.io');

// Config
const PORT = process.env.SOCKET_PORT ? parseInt(process.env.SOCKET_PORT, 10) : 8081;
const ALLOWED_ORIGIN = process.env.SOCKET_CORS_ORIGIN || '*';

// Create HTTP server and Socket.IO
const httpServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: true, service: 'driver-tracking', status: 'running' }));
});

const io = new Server(httpServer, {
  cors: {
    origin: ALLOWED_ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Helpers
const orderRoom = (orderId) => `order:${orderId}`;

// Socket handlers
io.on('connection', (socket) => {
  // Optional auth can be read from headers or handshake.query
  // const token = socket.handshake.auth?.token || socket.handshake.query?.token;

  // Join a specific order room to receive updates
  socket.on('join_order', ({ orderId, role }) => {
    if (!orderId) return;
    socket.join(orderRoom(orderId));
    socket.data.orderId = orderId;
    socket.data.role = role || 'client';
    socket.emit('joined_order', { orderId });
    // debug
    // eslint-disable-next-line no-console
    console.log(`[socket.io] ${socket.id} joined ${orderRoom(orderId)} as ${socket.data.role}`);
  });

  // Leave order room
  socket.on('leave_order', ({ orderId }) => {
    if (!orderId) return;
    socket.leave(orderRoom(orderId));
    // eslint-disable-next-line no-console
    console.log(`[socket.io] ${socket.id} left ${orderRoom(orderId)}`);
  });

  // Driver sends live location updates
  // payload: { orderId: string, lat: number, lng: number, heading?: number, speedKmh?: number }
  socket.on('driver_location', (payload) => {
    const { orderId, lat, lng, heading, speedKmh } = payload || {};
    if (!orderId || typeof lat !== 'number' || typeof lng !== 'number') return;
    // eslint-disable-next-line no-console
    console.log(`[socket.io] driver_location from ${socket.id} for ${orderRoom(orderId)}:`, lat, lng);
    io.to(orderRoom(orderId)).emit('driver_location', {
      orderId,
      lat,
      lng,
      heading: typeof heading === 'number' ? heading : undefined,
      speedKmh: typeof speedKmh === 'number' ? speedKmh : undefined,
      ts: Date.now(),
    });
  });

  // Order status updates (optional)
  // payload: { orderId: string, stage: 'PLACED'|'COOKING'|'OUT_FOR_DELIVERY'|'DELIVERED', etaText?: string }
  socket.on('order_status', (payload) => {
    const { orderId, stage, etaText } = payload || {};
    if (!orderId || !stage) return;
    io.to(orderRoom(orderId)).emit('order_status', { orderId, stage, etaText, ts: Date.now() });
  });

  socket.on('disconnect', () => {
    // Cleanup is automatic; rooms are left on disconnect
  });
});

httpServer.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[socket.io] driver-tracking listening on http://localhost:${PORT}`);
});
