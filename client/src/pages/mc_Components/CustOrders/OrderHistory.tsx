import React from 'react';
import SummaryCard from './SummaryCard';
import FilterSort from './FilterSort';
import OrderTable from './DeliveryTable';
import { orderSummary, orderRecords } from '../../../types/mc_Types';

const OrderHistory: React.FC = () => {
  console.log('OrderHistory: Component loaded with data:', { orderSummary, orderRecords });

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      {/* Header Bar */}
      <header className="bg-white h-14 flex items-center justify-between px-8 border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 font-bold text-2xl text-gray-900">
          <div className="bg-purple-700 text-white rounded-lg w-8 h-8 flex items-center justify-center text-2xl leading-none">+</div>
          FoodieExpress
        </div>
        <div className="text-gray-500 text-lg font-medium">Order History</div>
      </header>

      {/* Page Title Section */}
      <section className="pt-8 px-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order History</h1>
        <p className="text-gray-500 text-lg font-normal">Track your past orders and earnings</p>
      </section>

      {/* Summary Cards Row */}
<section className="mt-8 px-12">
  <div className="grid grid-cols-4 gap-8">
    <SummaryCard {...orderSummary.totalOrders} />
    <SummaryCard {...orderSummary.totalPrice} />
  </div>
</section>

      {/* Filter and Sort */}
      <section className="mt-8 px-12">
        <FilterSort />
      </section>

      {/* Order Table */}
      <section className="mt-8 px-12">
        <OrderTable records={orderRecords} />
      </section>
    </div>
  );
};

export default OrderHistory;
