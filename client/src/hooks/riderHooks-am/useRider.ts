import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { 
  fetchDriverProfile, 
  updateAvailability, 
  updateFullName, 
  updatePhoneNumber 
} from '../../store/riderThunks';

export const useRider = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { driver, user, loading, error } = useSelector((state: RootState) => state.rider);

  const getDriverProfile = () => {
    dispatch(fetchDriverProfile());
  };

  const updateDriverAvailability = (isAvailable: boolean) => {
    dispatch(updateAvailability(isAvailable));
  };

  const updateDriverFullName = (fullName: string) => {
    dispatch(updateFullName(fullName));
  };

  const updateDriverPhoneNumber = (phoneNumber: string) => {
    dispatch(updatePhoneNumber(phoneNumber));
  };

  return {
    driver,
    user,
    loading,
    error,
    getDriverProfile,
    updateDriverAvailability,
    updateDriverFullName,
    updateDriverPhoneNumber,
  };
};
