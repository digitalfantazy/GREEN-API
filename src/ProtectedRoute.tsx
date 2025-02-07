import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { userData, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!userData) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
