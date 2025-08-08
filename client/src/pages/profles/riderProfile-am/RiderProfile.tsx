import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store';
import { fetchDriverProfile } from '../../../store/riderThunks';
import Header from '../../../components/rider profile/Header';
import PageTitle from '../../../components/rider profile/PageTitle';
import Sidebar from '../../../components/rider profile/Sidebar';
import ProfileCard from '../../../components/rider profile/ProfileCard';

const RiderProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch driver profile from real API
    dispatch(fetchDriverProfile());
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
