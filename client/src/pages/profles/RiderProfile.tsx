import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDriver, setLoading, setError } from '../../store/riderSlice';
import Header from '../../components/rider profile/Header';
import PageTitle from '../../components/rider profile/PageTitle';
import Sidebar from '../../components/rider profile/Sidebar';
import ProfileCard from '../../components/rider profile/ProfileCard';

const RiderProfile: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        dispatch(setLoading(true));
        
        // Simulate API call - replace with actual API call
        const mockDriver = {
          id: '1',
          vehicleInfo: 'Car',
          isAvailable: true,
          userId: '1',
          user: {
            id: '1',
            fullName: 'Alex Johnson',
            email: 'alex.johnson@email.com',
            password: 'hashed',
            role: 'DRIVER' as const,
            phoneNumber: '+1 (555) 123-4567',
            address: '123 Main St',
            media: [
              {
                id: '1',
                url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
                type: 'image',
                uploadedAt: new Date().toISOString(),
                userId: '1'
              }
            ]
          },
          orders: [],
          notifications: [],
          media: []
        };

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        dispatch(setDriver(mockDriver));
        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setError('Failed to fetch driver data'));
        dispatch(setLoading(false));
      }
    };

    fetchDriverData();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageTitle 
          title="Profile & Settings"
          subtitle="Manage your profile information and delivery preferences"
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Sidebar activeItem="profile" />
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default RiderProfile;
