import React from 'react';
import type {StatisticCardProps} from '../../types/mc_Types'
import Navbar from "./Restaurant_Navbar";
const StatisticCard: React.FC<StatisticCardProps> = ({ value, label, date, dateLabel }) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow flex-1 min-w-[200px] max-w-[300px] flex flex-col items-center text-center">
    <p
      className={`font-bold text-3xl mb-2 ${
        label === 'Total Orders' ? 'text-indigo-700' : 'text-green-600'
      }`}
    >
      {value}
    </p>
    <p className="text-gray-600 text-lg mb-2">{label}</p>
    <p className="text-gray-400 text-sm">{dateLabel}: {date}</p>
  </div>
);

const InfoBlock: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-gray-500 text-sm mb-1">{label}</p>
    <p className="font-semibold text-lg">{value}</p>
  </div>
);

const CustomerProfile = () => (
  <div>
    {/* Navbar on its own */}
    <Navbar />
  <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8 overflow-x-hidden">
    {/* Both Headings OUTSIDE Layout */}
    <div className="w-full max-w-7xl mb-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-1">My Profile</h1>
      <p className="text-gray-500 text-sm">Manage your account settings and preferences</p>
    </div>

    {/* Layout: Sidebar + Main Section */}
    <div className="w-full max-w-7xl flex flex-col md:flex-row flex-wrap gap-8">
      {/* Sidebar */}
      <aside className="flex-1 md:max-w-sm w-full bg-white rounded-lg p-8 shadow flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 bg-indigo-700 rounded-full flex items-center justify-center text-white text-7xl font-bold mb-4">
            JD
          </div>
          <h2 className="text-xl font-semibold mb-2">John Doe</h2>
          <p className="text-gray-500 text-sm">Member since March 2023</p>
        </div>

       <nav className="w-full space-y-3 mb-8">
  <button className="w-full px-6 py-3 rounded bg-indigo-700 text-white font-semibold hover:bg-indigo-700 text-lg flex items-center gap-3">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
    Personal Info
  </button>
  <button className="w-full px-6 py-3 rounded hover:bg-gray-100 text-lg flex items-center gap-3">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
    Order History
  </button>
  <button className="w-full px-6 py-3 rounded hover:bg-gray-100 text-lg flex items-center gap-3">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
    Saved Addresses
  </button>
  <button className="w-full px-6 py-3 rounded hover:bg-gray-100 text-lg flex items-center gap-3">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
    </svg>
    Payment Methods
  </button>
</nav>

       {/* Profile Stats */}
<div className="w-full flex flex-nowrap gap-4 justify-center">
  <div className="bg-gray-50 p-4 rounded-lg shadow flex-shrink-0  text-center">
    <p className="text-indigo-700 font-bold text-3xl mb-2">47</p>
    <p className="text-gray-600 text-lg">Total Orders</p>
  </div>
  <div className="bg-gray-50 p-4 rounded-lg shadow flex-shrink-0  text-center">
    <p className="text-green-600 font-bold text-3xl mb-2">4.9</p>
    <p className="text-gray-600 text-lg">Avg Rating</p>
  </div>
</div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 h-[600px] w-full bg-white rounded-lg p-8 shadow flex flex-col space-y-8">
        {/* Edit Button */}
        <div className="flex justify-end mb-4">
          <button className="flex items-center bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            Edit Profile
          </button>
        </div>

        {/* Personal Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <InfoBlock label="First Name" value="John" />
            <InfoBlock label="Last Name" value="Doe" />
            <InfoBlock label="Email Address" value="john.doe@email.com" />
            <InfoBlock label="Phone Number" value="+1 (555) 123-4567" />
          </div>
        </div>

        {/* Account Statistics */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Account Statistics</h3>
          <div className="flex flex-wrap gap-6 justify-center">
            <StatisticCard value="47" label="Total Orders" date="Oct 2023" dateLabel="Updated" />
            <StatisticCard value="Bella Italia" label="Favorite Restaurant" date="Oct 2023" dateLabel="Since" />
            <div className="bg-gray-50 p-6 rounded-lg shadow flex-1 min-w-[200px] max-w-[300px] flex flex-col items-center text-center">
              <p className="text-orange-600 font-semibold mb-2 text-xl">March 2023</p>
              <p className="text-gray-600 text-lg">Member Since</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  </div>
);

export default CustomerProfile;
