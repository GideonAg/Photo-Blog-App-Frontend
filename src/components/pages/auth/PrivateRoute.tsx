import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
	children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const location = useLocation();

    useEffect(() => {
		const checkAuth = async () => {
		try {
			const token = sessionStorage.getItem("idToken");
			if (token) {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}
		} catch (error) {
			console.error('Auth check failed:', error);
			setIsAuthenticated(false);
		}
		};

		checkAuth();
    }, []);

    if (isAuthenticated === null) {
		return <div>Loading...</div>;
    }

    return isAuthenticated ? (
		<>{children}</>
    ) : (
		<Navigate to="/login" state={{ from: location }} replace />
    );
};

export default PrivateRoute;