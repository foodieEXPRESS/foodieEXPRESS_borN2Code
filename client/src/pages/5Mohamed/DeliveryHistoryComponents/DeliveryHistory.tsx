import React, { useState, useEffect } from 'react';
import SummaryCard from './SummaryCard';
import FilterSort from './FilterSort';
import DeliveryTable from './DeliveryTable';
import '../styles.css';

interface Order {
  orderId: string;
  customer: string;
  items: number;
  restaurant: string;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'COMPLETED' | 'CANCELLED';
  earnings: string;
  tip: string;
}

interface Summary {
  totalEarnings: { icon: string; label: string; value: string; color: string };
  completedOrders: { icon: string; label: string; value: string; color: string };
  canceledOrders: { icon: string; label: string; value: string; color: string };
  avgPerOrder: { icon: string; label: string; value: string; color: string };
}

const DeliveryHistory: React.FC = () => {
  const [records, setRecords] = useState<Order[]>([]);
  const [filtered, setFiltered] = useState<Order[]>([]);
  const [summary, setSummary] = useState<Summary>({
    totalEarnings: { icon: '✔️', label: 'Total Earnings', value: '$0.00', color: '#22c55e' },
    completedOrders: { icon: '⭐', label: 'Completed Orders', value: '0', color: '#6366f1' },
    canceledOrders: { icon: '⛔', label: 'Canceled Orders', value: '0', color: '#f43f5e' },
    avgPerOrder: { icon: '⏰', label: 'Avg. Per Order', value: '$0.00', color: '#fbbf24' }
  });
  const [loading, setLoading] = useState(true);

  const normalizeData = (data: any[]): Order[] => {
    return data.map(item => ({
      orderId: item.orderId || 'N/A',
      customer: item.customer || 'Unknown',
      items: item.items || 0,
      restaurant: item.restaurant || '—',
      date: item.date || 'N/A',
      time: item.time || 'N/A',
      status: item.status || 'PENDING',
      earnings: item.earnings || '0',
      tip: item.tip || '0'
    }));
  };

  const computeSummary = (orders: Order[]) => {
    const completed = orders.filter(o => o.status === 'COMPLETED');
    const canceled = orders.filter(o => o.status === 'CANCELLED');
    const totalEarnings = orders.reduce((sum, o) => sum + parseFloat(o.earnings), 0);
    const avgPerOrder = completed.length > 0 ? totalEarnings / completed.length : 0;

    setSummary({
      totalEarnings: { icon: '✔️', label: 'Total Earnings', value: `$${totalEarnings.toFixed(2)}`, color: '#22c55e' },
      completedOrders: { icon: '⭐', label: 'Completed Orders', value: completed.length.toString(), color: '#6366f1' },
      canceledOrders: { icon: '⛔', label: 'Canceled Orders', value: canceled.length.toString(), color: '#f43f5e' },
      avgPerOrder: { icon: '⏰', label: 'Avg. Per Order', value: `$${avgPerOrder.toFixed(2)}`, color: '#fbbf24' }
    });
  };

  const applyFilters = (filters: { dateRange: string; status: string }) => {
    let filtered = [...records];
    
    if (filters.dateRange !== 'all') {
      const today = new Date();
      const cutoff = new Date();
      cutoff.setDate(today.getDate() - (filters.dateRange === 'last7days' ? 7 : 30));
      
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate >= cutoff;
      });
    }
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(order => order.status === filters.status);
    }
    
    setFiltered(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/deliveries/driver/driver-123');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            const normalized = normalizeData(data.data);
            setRecords(normalized);
            setFiltered(normalized);
            computeSummary(normalized);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  return (
    <div className="MA__delivery-history-container">
      <div className="MA__header-bar">
        <div className="MA__header-logo">
          <div className="MA__header-logo-icon">+</div>
          FoodieExpress
        </div>
        <div className="MA__header-title">Delivery History</div>
      </div>

      <div className="MA__page-title-section">
        <div className="MA__page-title-main">Delivery History</div>
        <div className="MA__page-title-desc">Track your past deliveries and earnings</div>
      </div>

      <div className="MA__summary-cards-row">
        <SummaryCard {...summary.totalEarnings} />
        <SummaryCard {...summary.completedOrders} />
        <SummaryCard {...summary.canceledOrders} />
        <SummaryCard {...summary.avgPerOrder} />
      </div>

      <FilterSort onFilterChange={applyFilters} />
      <DeliveryTable records={filtered} />
    </div>
  );
};

export default DeliveryHistory; 