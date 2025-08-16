import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const ProtectedRoute = () => {
    const { user, isAuthLoading } = useAuth();

    // Dacă încă se verifică dacă user-ul e logat, nu afișăm nimic (sau un loader)
    if (isAuthLoading) {
        return null; // Sau <FullScreenLoader />
    }

    // Dacă verificarea s-a terminat și NU există user, redirecționăm la login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Dacă există user, afișăm componenta copil (ex: DashboardPage)
    return <Outlet />;
};

export default ProtectedRoute;