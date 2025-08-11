import React, { useState, useEffect } from 'react';
import SummaryCard from './SummaryCard';
import FilterSort from './FilterSort';
import DeliveryTable from './DeliveryTable';
import '../styles.css';

const DeliveryHistory: React.FC = () => {
  const [deliveryRecords, setDeliveryRecords] = useState<any[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<any[]>([]);
  const [deliverySummary, setDeliverySummary] = useState({
    
    totalEarnings: {
      icon: '✔️',
      label: 'Total Earnings',
      value: '$0.00',
      color: '#22c55e',
    },
    completedOrders: {
      icon: '⭐',
      label: 'Completed Orders',
      value: '0',
      color: '#6366f1',
    },
    canceledOrders: {
      icon: '⛔',
      label: 'Canceled Orders',
      value: '0',
      color: '#f43f5e',
    },
    avgPerOrder: {
      icon: '⏰',
      label: 'Avg. Per Order',
      value: '$0.00',
      color: '#fbbf24',
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  // تحديث filteredRecords عند تغيير deliveryRecords
  useEffect(() => {
    setFilteredRecords(deliveryRecords);
  }, [deliveryRecords]);

  // دالة تطبيق الفلاتر
  const applyFilters = (filters: any) => {
    let filtered = [...deliveryRecords];
    
    // فلترة حسب التاريخ (الفلاتر الأصلية)
    if (filters.dateRange !== 'all') {
      const today = new Date();
      
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.date + ' ' + order.time);
        
        switch (filters.dateRange) {
          case 'last7days':
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return orderDate >= weekAgo;
          case 'last30days':
            const monthAgo = new Date(today);
            monthAgo.setDate(monthAgo.getDate() - 30);
            return orderDate >= monthAgo;
          default:
            return true;
        }
      });
    }
    
    // فلترة حسب الحالة (الفلاتر الأصلية)
    if (filters.status !== 'all') {
      filtered = filtered.filter(order => order.status === filters.status);
    }
    
    setFilteredRecords(filtered);
  };

  // دالة الترتيب
  const applySorting = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    const sorted = [...filteredRecords].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date + ' ' + a.time);
          bValue = new Date(b.date + ' ' + b.time);
          break;
        case 'earnings':
          aValue = parseFloat(a.earnings);
          bValue = parseFloat(b.earnings);
          break;
        case 'customer':
          aValue = a.customer.toLowerCase();
          bValue = b.customer.toLowerCase();
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setFilteredRecords(sorted);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // استخدام API الموجود في الخادم (البيانات المزيفة)
      const driverId = 'driver-123'; // يمكنك تغيير هذا
      const apiUrl = `http://localhost:8080/api/deliveries/driver/${driverId}`;
      
      console.log('🚀 Fetching data from:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Raw API response:', data);
        
        if (data && Array.isArray(data) && data.length > 0) {
          setDeliveryRecords(data);
          
          // حساب الملخص من البيانات المجلوبة
          const completedOrders = data.filter((order: any) => order.status === 'DELIVERED');
          const canceledOrders = data.filter((order: any) => order.status === 'CANCELLED');
          const pendingOrders = data.filter((order: any) => order.status === 'PENDING');
          const confirmedOrders = data.filter((order: any) => order.status === 'CONFIRMED');
          const preparingOrders = data.filter((order: any) => order.status === 'PREPARING');
          const outForDeliveryOrders = data.filter((order: any) => order.status === 'OUT_FOR_DELIVERY');
          
          console.log('📈 Orders by status:', {
            completed: completedOrders.length,
            canceled: canceledOrders.length,
            pending: pendingOrders.length,
            confirmed: confirmedOrders.length,
            preparing: preparingOrders.length,
            outForDelivery: outForDeliveryOrders.length
          });
          
          const totalEarnings = data.reduce((sum: number, order: any) => {
            const earnings = parseFloat(order.earnings) || 0;
            return sum + earnings;
          }, 0);
          
          const avgPerOrder = completedOrders.length > 0 ? totalEarnings / completedOrders.length : 0;
          
          console.log('💰 Financial summary:', { totalEarnings, avgPerOrder });
          
          setDeliverySummary({
            totalEarnings: {
              icon: '✔️',
              label: 'Total Earnings',
              value: `$${totalEarnings.toFixed(2)}`,
              color: '#22c55e',
            },
            completedOrders: {
              icon: '⭐',
              label: 'Completed Orders',
              value: completedOrders.length.toString(),
              color: '#6366f1',
            },
            canceledOrders: {
              icon: '⛔',
              label: 'Canceled Orders',
              value: canceledOrders.length.toString(),
              color: '#f43f5e',
            },
            avgPerOrder: {
              icon: '⏰',
              label: 'Avg. Per Order',
              value: `$${avgPerOrder.toFixed(2)}`,
              color: '#fbbf24',
            },
          });
        } else {
          console.log('❌ No data or empty array received');
          setDeliveryRecords([]);
          
          // إعادة تعيين الملخص إلى القيم الافتراضية
          setDeliverySummary({
            totalEarnings: {
              icon: '✔️',
              label: 'Total Earnings',
              value: '$0.00',
              color: '#22c55e',
            },
            completedOrders: {
              icon: '⭐',
              label: 'Completed Orders',
              value: '0',
              color: '#6366f1',
            },
            canceledOrders: {
              icon: '⛔',
              label: 'Canceled Orders',
              value: '0',
              color: '#f43f5e',
            },
            avgPerOrder: {
              icon: '⏰',
              label: 'Avg. Per Order',
              value: '$0.00',
              color: '#fbbf24',
            },
          });
        }
      } else {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        setError(`API Error: ${response.status} - ${errorText}`);
      }
    } catch (error: any) {
      setError(`Failed to load data: ${error.message}`);
      console.error('❌ Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '50px', 
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '50px',
        color: '#f44336'
      }}>
        <div>Error: {error}</div>
        <button 
          onClick={fetchData}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  console.log('DeliveryHistory: Component loaded with data:', { deliverySummary, deliveryRecords });

  return (
    <div className="MA__delivery-history-container">
      
      
      {/* Header Bar */}
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
        <SummaryCard {...deliverySummary.totalEarnings} />
        <SummaryCard {...deliverySummary.completedOrders} />
        <SummaryCard {...deliverySummary.canceledOrders} />
        <SummaryCard {...deliverySummary.avgPerOrder} />
      </div>

      <FilterSort 
        onFilterChange={applyFilters}
      />
      
      <DeliveryTable records={filteredRecords} />
    </div>
  );
};

export default DeliveryHistory; 