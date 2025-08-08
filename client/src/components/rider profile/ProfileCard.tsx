import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import UserAvatar from './UserAvatar';
import ProfileField from './ProfileField';

const ProfileCard: React.FC = () => {
  const { driver, user, loading, error } = useSelector((state: RootState) => state.rider);

  if (loading) {
    return (
      <div className="lg:col-span-3">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center text-gray-600">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (error || !driver || !user) {
    return (
      <div className="lg:col-span-3">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center text-red-600">{error || 'Driver not found'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-sans">
          Profile Information
        </h2>

        <UserAvatar 
          name={user.fullName}
          email={user.email}
          imageUrl={user.media?.[0]?.url}
          isActive={driver.isAvailable}
        />

        <div className="space-y-6 font-sans">
          <ProfileField 
            label="Full Name" 
            value={user.fullName}
            customValueColor="#1A1A1A"
          />
          <ProfileField 
            label="Phone Number" 
            value={user.phoneNumber || 'Not provided'}
            customValueColor="#1A1A1A"
          />
          <ProfileField 
            label="Email Address" 
            value={user.email} 
            showEdit={false}
            showNote="Contact support to change"
            customValueColor="#666666"
          />
          <ProfileField 
            label="Delivery Vehicle" 
            value={driver.vehicleInfo || 'Not specified'}
            customValueColor="#1A1A1A"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
