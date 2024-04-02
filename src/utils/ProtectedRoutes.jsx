import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth';

const ProtectedRoutes = ({  children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoutes;