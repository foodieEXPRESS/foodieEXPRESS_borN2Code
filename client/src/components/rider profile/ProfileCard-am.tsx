import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRider } from '../../hooks/riderHooks-am/useRider';
import { updateFullName, updatePhoneNumber, updateVehicleInfo } from '../../store/riderThunks-am';
import type { AppDispatch } from '../../store';
import UserAvatar from './UserAvatar-am';
import ProfileField from './ProfileField-am';

const ProfileCard: React.FC = () => {
  const { driver, user, loading, error } = useRider();
  const dispatch = useDispatch<AppDispatch>();
  const [updateStatus, setUpdateStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleEdit = async (fieldKey: string, value: string) => {
    try {
      setUpdateStatus({ type: null, message: '' });
      
      switch (fieldKey) {
        case 'fullName':
          await dispatch(updateFullName(value)).unwrap();
          setUpdateStatus({ type: 'success', message: 'Full name updated successfully!' });
          break;
        case 'phoneNumber':
          await dispatch(updatePhoneNumber(value)).unwrap();
          setUpdateStatus({ type: 'success', message: 'Phone number updated successfully!' });
          break;
        case 'vehicleInfo':
          await dispatch(updateVehicleInfo(value)).unwrap();
          setUpdateStatus({ type: 'success', message: 'Vehicle information updated successfully!' });
          break;
        default:
          console.warn('Unknown field key:', fieldKey);
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setUpdateStatus({ type: null, message: '' });
      }, 3000);
    } catch (error) {
      console.error('Failed to update field:', error);
      setUpdateStatus({ 
        type: 'error', 
        message: `Failed to update ${fieldKey}. Please try again.` 
      });
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setUpdateStatus({ type: null, message: '' });
      }, 5000);
    }
  };

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

        {/* Status message */}
        {updateStatus.type && (
          <div className={`mb-4 p-3 rounded-md ${
            updateStatus.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {updateStatus.message}
          </div>
        )}

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
            onEdit={handleEdit}
            fieldKey="fullName"
          />
          <ProfileField 
            label="Phone Number" 
            value={user.phoneNumber || 'Not provided'}
            customValueColor="#1A1A1A"
            onEdit={handleEdit}
            fieldKey="phoneNumber"
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
            onEdit={handleEdit}
            fieldKey="vehicleInfo"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
