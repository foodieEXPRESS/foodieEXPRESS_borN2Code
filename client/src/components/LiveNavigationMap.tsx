import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background-color: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Driver icon with vehicle
const createDriverIcon = () => {
  return L.divIcon({
    className: 'driver-marker',
    html: `
      <div style="
        width: 30px;
        height: 30px;
        background-color: #4318D1;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9ZM19 9H14V4H5V21H19V9Z"/>
        </svg>
        <div style="
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 8px solid #4318D1;
        "></div>
      </div>
    `,
    iconSize: [30, 38],
    iconAnchor: [15, 19],
  });
};

interface Location {
  latitude: number;
  longitude: number;
  name: string;
  type: 'driver' | 'restaurant' | 'customer';
}

interface LiveNavigationMapProps {
  driverLocation?: { latitude: number; longitude: number; name: string };
  restaurantLocation?: { latitude: number; longitude: number; name: string };
  customerLocation?: { latitude: number; longitude: number; name: string };
  orderStatus?: string;
}

// Component to handle map updates
const MapUpdater: React.FC<{ locations: Location[] }> = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map(loc => [loc.latitude, loc.longitude]));
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [locations, map]);

  return null;
};

const LiveNavigationMap: React.FC<LiveNavigationMapProps> = ({
  driverLocation,
  restaurantLocation,
  customerLocation,
  orderStatus = 'PREPARING'
}) => {
  const mapRef = useRef<L.Map>(null);

  // Create locations array for the map
  const locations: Location[] = [];
  
  if (driverLocation) {
    locations.push({
      ...driverLocation,
      type: 'driver'
    });
  }
  
  if (restaurantLocation) {
    locations.push({
      ...restaurantLocation,
      type: 'restaurant'
    });
  }
  
  if (customerLocation) {
    locations.push({
      ...customerLocation,
      type: 'customer'
    });
  }

  // Default center (New York City)
  const defaultCenter: [number, number] = [40.7128, -74.0060];

  // Determine route points based on order status
  const getRoutePoints = () => {
    const points: [number, number][] = [];
    
    if (orderStatus === 'PREPARING' && driverLocation && restaurantLocation) {
      // Driver to restaurant
      points.push([driverLocation.latitude, driverLocation.longitude]);
      points.push([restaurantLocation.latitude, restaurantLocation.longitude]);
    } else if (orderStatus === 'OUT_FOR_DELIVERY' && restaurantLocation && customerLocation) {
      // Restaurant to customer
      points.push([restaurantLocation.latitude, restaurantLocation.longitude]);
      points.push([customerLocation.latitude, customerLocation.longitude]);
    } else if (driverLocation && restaurantLocation && customerLocation) {
      // Full route: driver -> restaurant -> customer
      points.push([driverLocation.latitude, driverLocation.longitude]);
      points.push([restaurantLocation.latitude, restaurantLocation.longitude]);
      points.push([customerLocation.latitude, customerLocation.longitude]);
    }
    
    return points;
  };

  const routePoints = getRoutePoints();

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Driver Marker */}
        {driverLocation && (
          <Marker
            position={[driverLocation.latitude, driverLocation.longitude]}
            icon={createDriverIcon()}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-blue-600">{driverLocation.name}</h3>
                <p className="text-sm text-gray-600">Driver</p>
                <p className="text-xs text-gray-500">En route to pickup</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Restaurant Marker */}
        {restaurantLocation && (
          <Marker
            position={[restaurantLocation.latitude, restaurantLocation.longitude]}
            icon={createCustomIcon('#FF6B35')}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-orange-600">{restaurantLocation.name}</h3>
                <p className="text-sm text-gray-600">Restaurant</p>
                <p className="text-xs text-gray-500">Pickup location</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Customer Marker */}
        {customerLocation && (
          <Marker
            position={[customerLocation.latitude, customerLocation.longitude]}
            icon={createCustomIcon('#4CAF50')}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-green-600">{customerLocation.name}</h3>
                <p className="text-sm text-gray-600">Delivery Address</p>
                <p className="text-xs text-gray-500">Final destination</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Route Line */}
        {routePoints.length >= 2 && (
          <Polyline
            positions={routePoints}
            color="#4318D1"
            weight={4}
            opacity={0.8}
            dashArray="10, 5"
          />
        )}

        {/* Map Updater */}
        <MapUpdater locations={locations} />
      </MapContainer>

      {/* Status Overlay */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">
            {orderStatus === 'PREPARING' && 'Heading to restaurant'}
            {orderStatus === 'OUT_FOR_DELIVERY' && 'Out for delivery'}
            {orderStatus === 'DELIVERED' && 'Order delivered'}
            {!orderStatus && 'Live tracking'}
          </span>
        </div>
      </div>

      {/* ETA Badge */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg px-3 py-2">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium text-gray-700">ETA: 2 min</span>
        </div>
      </div>
    </div>
  );
};

export default LiveNavigationMap;
