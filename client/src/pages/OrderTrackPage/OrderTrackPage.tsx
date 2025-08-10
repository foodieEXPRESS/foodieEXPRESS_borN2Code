import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import L, { Map as LeafletMap, Marker as LeafletMarker, Polyline as LeafletPolyline } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './OrderTrackPage.css';

// Make sure Leaflet CSS is included in index.html or imported globally
// import 'leaflet/dist/leaflet.css';

// Types
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

interface LocationPayload {
  lat: number;
  lng: number;
}

const socketBaseUrl = 'http://localhost:8080'; // keep in sync with server

const OrderTrackPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [driver, setDriver] = useState<DriverInfo | null>(null);
  const [status, setStatus] = useState<OrderStatus>({ stage: 'PLACED', etaText: undefined });
  const [distanceRemaining, setDistanceRemaining] = useState<string>('-');

  const mapRef = useRef<LeafletMap | null>(null);
  const driverMarkerRef = useRef<LeafletMarker | null>(null);
  const userMarkerRef = useRef<LeafletMarker | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const routeRef = useRef<LeafletPolyline | null>(null);
  const geoWatchIdRef = useRef<number | null>(null);

  // Default positions just to initialize map
  const defaultCenter = useMemo(() => ({ lat: 40.7128, lng: -74.0060 }), []); // NYC fallback

  useEffect(() => {
    // Init map
    if (!mapRef.current) {
      mapRef.current = L.map('live-map', { zoomControl: true }).setView([defaultCenter.lat, defaultCenter.lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }

    // Add initial user marker; will be updated by Geolocation below
    if (!userMarkerRef.current && mapRef.current) {
      userMarkerRef.current = L.marker([defaultCenter.lat + 0.01, defaultCenter.lng + 0.01], {
        title: 'Your Location',
      }).addTo(mapRef.current);
    }

    // Create route line between driver and user
    if (!routeRef.current && mapRef.current) {
      routeRef.current = L.polyline([], { color: '#10b981', weight: 4, opacity: 0.7 }).addTo(mapRef.current);
    }

    // Watch user's real location
    if ('geolocation' in navigator) {
      geoWatchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng([latitude, longitude]);
          }
          if (mapRef.current && driverMarkerRef.current) {
            const bounds: L.LatLngExpression[] = [
              [latitude, longitude],
              driverMarkerRef.current.getLatLng(),
            ];
            mapRef.current.fitBounds(bounds as any, { padding: [40, 40] });
            // update distance
            const d = mapRef.current.distance(L.latLng(latitude, longitude), driverMarkerRef.current.getLatLng());
            setDistanceRemaining(`${(d / 1000).toFixed(2)} km`);
          }
          // update route
          if (routeRef.current && driverMarkerRef.current) {
            routeRef.current.setLatLngs([
              driverMarkerRef.current.getLatLng(),
              L.latLng(latitude, longitude),
            ]);
          }
        },
        () => {
          // ignore errors, fallback location kept
        },
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
      );
    }

    return () => {
      if (geoWatchIdRef.current !== null && 'geolocation' in navigator) {
        navigator.geolocation.clearWatch(geoWatchIdRef.current);
      }
      // keep map instance to avoid flicker
    };
  }, [defaultCenter]);

  useEffect(() => {
    if (!orderId) return;
    // Connect socket.io
    const socket = io(socketBaseUrl + '/tracking', { transports: ['websocket'] });
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('join', { orderId });
    });

    // Driver location updates
    socket.on('location:update', (payload: LocationPayload) => {
      if (!mapRef.current) return;
      const { lat, lng } = payload;

      if (!driverMarkerRef.current) {
        driverMarkerRef.current = L.marker([lat, lng], { title: 'Driver Location' }).addTo(mapRef.current);
      } else {
        driverMarkerRef.current.setLatLng([lat, lng]);
      }

      // Fit bounds if we have both markers
      const bounds: L.LatLngExpression[] = [];
      if (userMarkerRef.current) bounds.push(userMarkerRef.current.getLatLng());
      if (driverMarkerRef.current) bounds.push(driverMarkerRef.current.getLatLng());
      if (bounds.length >= 2) {
        mapRef.current.fitBounds(bounds as any, { padding: [40, 40] });
      }

      // Optionally compute a simple distance remaining
      if (userMarkerRef.current) {
        const d = mapRef.current.distance(userMarkerRef.current.getLatLng(), L.latLng(lat, lng));
        const km = (d / 1000).toFixed(2);
        setDistanceRemaining(`${km} km`);
      }

      // Update route line
      if (routeRef.current && userMarkerRef.current) {
        routeRef.current.setLatLngs([
          [lat, lng],
          userMarkerRef.current.getLatLng(),
        ]);
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
      socket.emit('leave', { orderId });
      socket.disconnect();
    };
  }, [orderId]);

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
                <div className="MACH-map-wrap">
                  <div id="live-map" />
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

              <div className="summary-store">
                <div className="store-badge">BI</div>
                <div>
                  <div className="font-semibold">Bella Italia</div>
                  <div className="MACH-card-subtle">456 Restaurant Ave, New York, NY</div>
                  <a href="#">Call Restaurant</a>
                </div>
              </div>

              <div className="summary-items">
                <div className="summary-row">
                  <div className="summary-left"><span className="pill pill-pizza">Pizza</span> Margherita Pizza (x2)</div>
                  <div className="price">$33.98</div>
                </div>
                <div className="summary-row">
                  <div className="summary-left"><span className="pill pill-salad">Salad</span> Caesar Salad (x1)</div>
                  <div className="price">$12.99</div>
                </div>
                <div className="summary-row">
                  <div className="summary-left"><span className="pill pill-dessert">Dessert</span> Tiramisu (x1)</div>
                  <div className="price">$7.99</div>
                </div>
              </div>

              <div className="summary-row total-row">
                <div>Total</div>
                <div className="price">$54.97</div>
              </div>
              <div className="MACH-card-subtle">Ordered at {status.etaText || '02:30 PM'}</div>

              <div className="mt-3" />
              <button className="btn btn-muted">Report an Issue</button>
              <div className="mt-2" />
              <button className="btn btn-prim">Reorder Items</button>

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
