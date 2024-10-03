
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {

    const token = sessionStorage.getItem('token');
    return token ? <Outlet /> : <Navigate to='/signin' />;
}

export default ProtectedRoute

