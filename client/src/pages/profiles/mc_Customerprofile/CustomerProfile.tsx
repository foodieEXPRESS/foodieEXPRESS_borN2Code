import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store';
import{ fetchUserPictureById,  fetchUserById ,updateUserLocation } from '../../../store/restaurantListSlice';
import type { StatisticCardProps } from '../../../types/mc_Types';
import type { CustomerProfileWithFetchProps } from '../../../types/mc_Types';
const StatisticCard: React.FC<StatisticCardProps & { className?: string }> = ({
  value,
  label,
  date,
  dateLabel,
  className = '',
}) => (
  <div
    className={`bg-gray-50 p-6 rounded-lg shadow flex-1 min-w-[220px] max-w-[300px] flex flex-col items-center justify-center text-center ${className}`}
  >
    <p
      className={`font-bold text-3xl leading-tight mb-1 ${
        label === 'Total Orders' ? 'text-indigo-700' : 'text-green-600'
      }`}
    >
      {value}
    </p>
    <p className="text-gray-600 text-lg font-semibold mb-2">{label}</p>
    <p className="text-gray-400 text-sm">
      {dateLabel}: {date}
    </p>
  </div>
);

const InfoBlock: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-gray-500 text-sm mb-1">{label}</p>
    <p className="font-semibold text-lg">{value}</p>
  </div>
);



const CustomerProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, userPictureUrl, loading, error } = useSelector((state: RootState) => state.restaurantList);
    console.log("user:", user);

  useEffect(() => {
    dispatch(fetchUserById())
    dispatch(fetchUserPictureById())

       if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          dispatch(updateUserLocation({ latitude, longitude }))
        },
        (error) => {
          console.error("Geolocation error:", error)
        }
      )
    }
  }, [dispatch]);

    
  

  if (loading) return <p className="text-center py-4">Loading profile...</p>;
  if (error) return <p className="text-red-500 text-center py-4">{error}</p>;
  if (!user) return <p className="text-center py-4">No user data found.</p>;

  //mc :  Extract user info safely
  const name = user.fullName || 'Anonymous';
  const email = user.email || 'N/A';
  const phone = user.phoneNumber || 'N/A';
  const address = user.address || 'N/A';
  const memberSince = 'N/A'; 
  const totalOrders = 0;
  const rating = 0; 
  const cuisineType = 'N/A'; 

  const initials = `${name[0] || ''}${name.split(' ')[1]?.[0] || ''}`.toUpperCase();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8 overflow-x-hidden">
      {/* Headings */}
      <div className="w-full max-w-7xl mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">My Profile</h1>
        <p className="text-gray-500 text-sm">Manage your account settings and preferences</p>
      </div>

      <div className="w-full max-w-7xl flex flex-col md:flex-row flex-wrap gap-8">
        {/* Sidebar */}
        <aside className="flex-1 md:max-w-sm w-full bg-white rounded-lg p-8 shadow flex flex-col items-center">
            <div className="flex flex-col items-center mb-6">
  {userPictureUrl ? (
    <img
      src={userPictureUrl}
      alt={`Profile picture of `}
      className="w-32 h-32 rounded-full object-cover mb-4"
      loading="lazy"
    />
  ) : (
    <div
      aria-label={`User initials avatar for ${name}`}
      role="img"
      className="w-32 h-32 bg-indigo-700 rounded-full flex items-center justify-center text-white text-7xl font-bold mb-4 select-none"
    >
      {initials}
    </div>
  )}
  <h2 className="text-xl font-semibold mb-2">{name}</h2>
  <p className="text-gray-500 text-sm">Member since {memberSince}</p>
</div>
          
          {/* Navigation */}
          <nav className="w-full space-y-3 mb-8">{/* ... */}</nav>

          {/* Profile Stats */}
          <div className="w-full flex flex-nowrap gap-4 justify-center">
            <div className="bg-gray-50 p-4 rounded-lg shadow flex-shrink-0 text-center min-w-[140px]">
              <p className="text-indigo-700 font-bold text-3xl mb-2">{totalOrders}</p>
              <p className="text-gray-600 text-lg">Total Orders</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow flex-shrink-0 text-center min-w-[140px]">
              <p className="text-green-600 font-bold text-3xl mb-2">{rating.toFixed(1)}</p>
              <p className="text-gray-600 text-lg">Avg Rating</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="rounded-xl flex-1 h-[600px] w-full bg-white rounded-lg p-8 shadow flex flex-col space-y-8">
          {/* Edit Button */}
          <div className="flex justify-end mb-4">
            <button className="flex items-center bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-800 text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              Edit Profile
            </button>
          </div>

          {/* Personal Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <InfoBlock label="Name" value={name} />
              <InfoBlock label="Email Address" value={email} />
              <InfoBlock label="Phone Number" value={phone} />
              <InfoBlock label="Address" value={address} />
            </div>
          </div>

          {/* Account Statistics */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Account Statistics</h3>
            <div className="flex flex-wrap gap-6 justify-center">
              <StatisticCard value={totalOrders} label="Total Orders" date="Oct 2023" dateLabel="Updated" />
              <StatisticCard value={cuisineType} label="Favorite Restaurant" date="Oct 2023" dateLabel="Since" />
              <div className="bg-gray-50 p-6 rounded-lg shadow flex-1 min-w-[220px] max-w-[300px] flex flex-col items-center justify-center text-center">
                <p className="text-orange-600 font-semibold mb-2 text-xl leading-tight">{memberSince}</p>
                <p className="text-gray-600 text-lg">Member Since</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomerProfile;
