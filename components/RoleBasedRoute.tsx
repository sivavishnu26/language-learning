// src/components/RoleBasedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

interface RoleBasedRouteProps {
    children: React.ReactNode;
    allowedRoles: string[];
    redirectTo?: string;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
    children,
    allowedRoles,
    redirectTo = '/unauthorized'
}) => {
    const { user, userData, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-slate-500">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-teal-600" />
                <p>Loading...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Default role is 'user' if not specified in userData
    const userRole = userData?.role || 'user';

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};

export default RoleBasedRoute;
