import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store';
import { 
  login, 
  register, 
  logout,  
  changePassword,
  clearError 
} from '../../../store/authSlice';
import type { LoginCredentials, RegisterData, ChangePasswordData } from '../../../types/auth';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  return {
    // State
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,

    // Actions
    login: (credentials: LoginCredentials) => dispatch(login(credentials)),
    register: (data: RegisterData) => dispatch(register(data)),
    logout: () => dispatch(logout()),
    changePassword: (data: ChangePasswordData) => dispatch(changePassword(data)),
    clearError: () => dispatch(clearError()),
  };
}; 