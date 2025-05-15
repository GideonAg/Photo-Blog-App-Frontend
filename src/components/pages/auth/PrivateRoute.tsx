import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

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
				const decoded = jwtDecode(token);
				const currentTime = Date.now() / 1000;
				if(decoded.exp && decoded.exp > currentTime) {
					setIsAuthenticated(true);
				}
				else {
					setIsAuthenticated(false);
					sessionStorage.removeItem("idToken");
				}
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