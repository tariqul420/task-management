import { Navigate, Outlet } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAuth from "../Hook/useAuth";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="w-full max-w-md p-6">
                    <Skeleton height={40} count={4} />
                </div>
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
