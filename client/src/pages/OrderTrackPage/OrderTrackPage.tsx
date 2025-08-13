import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import LiveNavigationMap from '../../components/LiveNavigationMap';
import './OrderTrackPage.css';

interface DriverInfo {
  name: string;
  rating?: number;
  vehicle?: string;
  phone?: string;
}

type OrderStage = 'PLACED' | 'COOKING' | 'OUT_FOR_DELIVERY' | 'DELIVERED';

interface OrderStatus {
  stage: OrderStage;
  timeline?: {
    placedAt?: string;
    cookingAt?: string;
    outForDeliveryAt?: string;
    deliveredAt?: string;
  };
  etaText?: string; // e.g., "Delivered!" or "15-20 min"
}

const SOCKET_URL = 'http://localhost:8081';

const OrderTrackPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [driver, setDriver] = useState<DriverInfo | null>(null);
  const [status, setStatus] = useState<OrderStatus>({ stage: 'PLACED', etaText: undefined });
  const [distanceRemaining, setDistanceRemaining] = useState<string>('-');
  const [liveDriverLocation, setLiveDriverLocation] = useState<{ latitude: number; longitude: number; name: string } | undefined>(undefined);
  const [customerLocation, setCustomerLocation] = useState<{ latitude: number; longitude: number; name: string } | undefined>(undefined);
  const [restaurantLocation, setRestaurantLocation] = useState<{ latitude: number; longitude: number; name: string } | undefined>(undefined);
  const socketRef = useRef<Socket | null>(null);
  const geoWatchIdRef = useRef<number | null>(null);

  // Watch user's real location (customer)
  useEffect(() => {
    if ('geolocation' in navigator) {
      geoWatchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCustomerLocation({ latitude, longitude, name: 'You' });
        },
        () => {},
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
      );
    }
    return () => {
      if (geoWatchIdRef.current !== null && 'geolocation' in navigator) {
        navigator.geolocation.clearWatch(geoWatchIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!orderId) return;
    // Connect to standalone socket.io server and join order room
    const socket = io(SOCKET_URL, { transports: ['websocket'] });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('[OrderTrackPage] socket connected', socket.id);
      console.log('[OrderTrackPage] joining order room', orderId);
      socket.emit('join_order', { orderId, role: 'client' });
    });

    socket.on('connect_error', (err) => {
      console.error('[OrderTrackPage] socket connect_error:', err.message);
    });

    // Driver location updates
    socket.on('driver_location', (payload: { orderId: string; lat: number; lng: number }) => {
      console.log('[OrderTrackPage] driver_location received', payload);
      if (!payload || payload.orderId !== orderId) return;
      // set static restaurant location on first tick to help fit bounds between ends
      if (!restaurantLocation) {
        setRestaurantLocation({ latitude: payload.lat, longitude: payload.lng, name: 'Restaurant' });
      }
      setLiveDriverLocation({ latitude: payload.lat, longitude: payload.lng, name: 'Driver' });
      if (customerLocation) {
        // Approximate distance for display
        const R = 6371000; // m
        const toRad = (d: number) => (d * Math.PI) / 180;
        const dLat = toRad(payload.lat - customerLocation.latitude);
        const dLng = toRad(payload.lng - customerLocation.longitude);
        const a = Math.sin(dLat/2)**2 + Math.cos(toRad(customerLocation.latitude)) * Math.cos(toRad(payload.lat)) * Math.sin(dLng/2)**2;
        const d = 2 * R * Math.asin(Math.sqrt(a));
        setDistanceRemaining(`${(d / 1000).toFixed(2)} km`);
      }
    });

    // Order status updates
    socket.on('status:update', (next: OrderStatus) => {
      setStatus(next);
    });

    // Driver info updates
    socket.on('driver:update', (info: DriverInfo) => {
      setDriver(info);
    });

    return () => {
      console.log('[OrderTrackPage] leaving order room', orderId);
      socket.emit('leave_order', { orderId });
      socket.disconnect();
    };
  }, [orderId, restaurantLocation, customerLocation]);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar */}
      <header className="MACH-header">
        <div className="MACH-header-inner">
          <div className="MACH-brand">
            <span className="MACH-brand-badge">+</span>
            <span>FoodieExpress</span>
          </div>
          <div className="MACH-header-actions">
            <a href="#" className="MACH-link-muted">Help</a>
            <button className="MACH-btn-primary">New Order</button>
          </div>
        </div>
      </header>
      <main className="MACH-container">

        <h2 className="MACH-page-title">Track Your Order</h2>
        <p className="MACH-page-subtitle">Order #{orderId || 'ORD-2024-001'} from Bella Italia</p>

        {/* Two-column layout */}
        <div className="MACH-grid">
          {/* LEFT COLUMN */}
          <section>
            {/* Order Status Card */}
            <div className="MACH-card mb-6">
              <div className="MACH-card-header">
                <h3 className="MACH-card-title">Order Status</h3>
                <div className="MACH-card-subtle">Estimated delivery <strong className="text-emerald-600">{status.stage === 'DELIVERED' ? 'Delivered!' : status.etaText || '02:30 PM'}</strong></div>
              </div>
              <div className="MACH-timeline">
                <span className="MACH-timeline-rail" />
                {[
                  { label: 'Order Placed', desc: "You'll order has been confirmed" },
                  { label: 'Cooking', desc: 'Restaurant is preparing your food' },
                  { label: 'Out for Delivery', desc: "You'll order is on the way" },
                  { label: 'Delivered', desc: 'Enjoy your meal!' },
                ].map((s, idx) => (
                  <div key={s.label} className="MACH-timeline-item">
                    <span className="MACH-timeline-icon">{idx === 0 ? '🧾' : idx === 1 ? '👨‍🍳' : idx === 2 ? '🚗' : '✅'}</span>
                    <div className="flex-1">
                      <strong className="MACH-timeline-label block">{s.label}</strong>
                      <span className="MACH-timeline-desc">{s.desc}</span>
                    </div>
                    <span className="MACH-timeline-time">{idx === 0 ? '2:30 PM' : idx === 1 ? '2:35 PM' : '01:22 AM'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Driver Card */}
            <div className="MACH-card mb-6">
              <div className="MACH-card-header">
                <h3 className="MACH-card-title">Delivery Driver</h3>
                <a className="MACH-card-subtle" href="#">View Details</a>
              </div>
              <div className="MACH-driver-row">
                <div className="MACH-avatar">MJ</div>
                <div className="flex-1">
                  <div className="font-semibold">{driver?.name || 'Mike Johnson'}</div>
                  <div className="driver-meta">★ 4.9 • {driver?.vehicle || 'Motorcycle'}</div>
                </div>
                <a className="btn-circle" href="tel:+10000000000">📞</a>
              </div>
            </div>

            {/* Live Tracking Card */}
            <div className="MACH-card">
              <div className="MACH-card-header">
                <h3 className="MACH-card-title">Live Tracking</h3>
                <a className="MACH-card-subtle" href="#">Hide Map</a>
              </div>
              <div className="MACH-map-card">
                <div className="MACH-map-tags">
                  <span className="MACH-tag">Driver Location</span>
                  <span className="MACH-tag">Your Location</span>
                </div>
                <div className="MACH-map-wrap" style={{ height: 320 }}>
                  <LiveNavigationMap
                    driverLocation={liveDriverLocation}
                    restaurantLocation={restaurantLocation}
                    customerLocation={customerLocation}
                    orderStatus={status.stage === 'OUT_FOR_DELIVERY' ? 'OUT_FOR_DELIVERY' : status.stage === 'DELIVERED' ? 'DELIVERED' : 'PREPARING'}
                  />
                </div>
              </div>
              <div className="MACH-track-stats">
                <div><div className="MACH-label">Distance remaining</div><div>{distanceRemaining}</div></div>
                <div><div className="MACH-label">Estimated arrival</div><div>{status.stage === 'DELIVERED' ? 'Delivered!' : status.etaText || '02:30 PM'}</div></div>
              </div>
            </div>

            {/* Spacing below left column */}
            <div className="mt-6" />
          </section>

          {/* RIGHT COLUMN (SIDEBAR) */}
          <aside>
            <div className="MACH-card">
              <h3 className="MACH-card-title">Order Summary</h3>

              <div className="MACH-summary-store">
                <div className="MACH-store-badge">BI</div>
                <div>
                  <div className="font-semibold">Bella Italia</div>
                  <div className="MACH-card-subtle">456 Restaurant Ave, New York, NY</div>
                  <a href="#">Call Restaurant</a>
                </div>
              </div>

              <div className="MACH-summary-items">
                <div className="MACH-summary-row">
                  <div className="MACH-summary-left"><span className="MACH-pill MACH-pill-pizza">Pizza</span> Margherita Pizza (x2)</div>
                  <div className="MACH-price">$33.98</div>
                </div>
                <div className="MACH-summary-row">
                  <div className="MACH-summary-left"><span className="MACH-pill MACH-pill-salad">Salad</span> Caesar Salad (x1)</div>
                  <div className="MACH-price">$12.99</div>
                </div>
                <div className="MACH-summary-row">
                  <div className="MACH-summary-left"><span className="MACH-pill MACH-pill-dessert">Dessert</span> Tiramisu (x1)</div>
                  <div className="MACH-price">$7.99</div>
                </div>
              </div>

              <div className="MACH-summary-row MACH-total-row">
                <div>Total</div>
                <div className="MACH-price">$54.97</div>
              </div>
              <div className="MACH-card-subtle">Ordered at {status.etaText || '02:30 PM'}</div>

              <div className="mt-3" />
              <button className="MACH-btn MACH-btn-muted">Report an Issue</button>
              <div className="mt-2" />
              <button className="MACH-btn MACH-btn-prim">Reorder Items</button>

              <div className="mt-6 callout">
                <div className="flex items-center"><div className="icon">✅</div> <div><strong>Order Delivered!</strong><div className="card-subtle">Hope you enjoyed your meal!</div></div></div>
                <button className="rate-btn">Rate Your Experience</button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default OrderTrackPage;
