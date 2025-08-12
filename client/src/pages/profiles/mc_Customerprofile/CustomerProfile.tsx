import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store';
import{  fetchUserById ,updateUserLocation } from '../../../store/restaurantListSlice';
import UpdateProfile from './UpdateProfile';
import { useNavigate } from 'react-router-dom';  


const InfoBlock: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-gray-500 text-sm mb-1">{label}</p>
    <p className="font-semibold text-lg">{value}</p>
  </div>
);

const CustomerProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); 
  const { user, loading, error } = useSelector((state: RootState) => state.restaurantList);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    dispatch(fetchUserById())

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
  // const image = user.image []
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
    <div className="w-50 h-50 rounded-full overflow-hidden mb-4">
  {user.profileImage ? (
    <img
      src={`http://localhost:8080${user.profileImage}`}
      alt={`${name}'s profile`}
      className="w-full h-full object-cover"
    />
  ) : (
    <div
      aria-label={`User initials avatar for ${name}`}
      role="img"
      className="w-50 h-50 bg-indigo-700 flex items-center justify-center text-white text-7xl font-bold select-none"
    >
      {initials}
    </div>
  )}
</div>

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
  {!editMode && (
    <>
      {/* Edit Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setEditMode(true)}
          className="bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-800"
        >
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
      <div className="flex flex-col md:flex-row gap-6 justify-center">
  {/* Total Orders Card */}
  <div className="bg-gray-50 p-6 rounded-lg shadow flex-1 min-w-[220px] max-w-[300px] flex flex-col items-center justify-center text-center">
    <p className="font-bold text-3xl leading-tight mb-1 text-indigo-700">
      {totalOrders}
    </p>
    <p className="text-gray-600 text-lg font-semibold mb-2">Total Orders</p>
    <p className="text-gray-400 text-sm">Updated: Oct 2023</p>
  </div>

  {/* Favorite Restaurant Card */}
  <div className="bg-gray-50 p-6 rounded-lg shadow flex-1 min-w-[220px] max-w-[300px] flex flex-col items-center justify-center text-center">
    <p className="font-bold text-3xl leading-tight mb-1 text-green-600">
      {cuisineType || 'N/A'}
    </p>
    <p className="text-gray-600 text-lg font-semibold mb-2">Favorite Restaurant</p>
    <p className="text-gray-400 text-sm">Since: Oct 2023</p>
  </div>

  {/* Member Since Card */}
  <div className="bg-gray-50 p-6 rounded-lg shadow flex-1 min-w-[220px] max-w-[300px] flex flex-col items-center justify-center text-center">
    <p className="text-orange-600 font-semibold mb-2 text-xl leading-tight">
      {memberSince || 'N/A'}
    </p>
    <p className="text-gray-600 text-lg">Member Since</p>
  </div>
   <div className="flex justify-center mt-6">
    <button
                  onClick={() => navigate('/OrderHistory')}  
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                  View Order History
                </button>
              </div>
</div>

    </>
  )}
{editMode && (
  <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-lg shadow overflow-auto max-h-[600px]">
    <UpdateProfile onCancel={() => setEditMode(false)} />
  </div>
)}
</section>
      </div>
    </div>
  );
};

export default CustomerProfile;
