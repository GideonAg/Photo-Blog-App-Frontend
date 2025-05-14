import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const location = useLocation();

    useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
        try {
        // Use fetchAuthSession to check if user is authenticated
        const session = await fetchAuthSession();
        if (mounted) {
            // Check if session is valid and user is authenticated
            setIsAuthenticated(!!session.tokens?.accessToken);
        }
        } catch (error) {
        console.error('Auth check failed:', error);
        if (mounted) {
            setIsAuthenticated(false);
        }
        }
    };

    checkAuth();

    return () => {
        mounted = false;
    };
  }, []);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Replace with your loading component
  }

  // Redirect to login if not authenticated, preserving the intended destination
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;