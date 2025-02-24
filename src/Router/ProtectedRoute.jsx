import { ImSpinner6 } from "react-icons/im";
import "react-loading-skeleton/dist/skeleton.css";
import { Navigate, Outlet } from "react-router";
import useAuth from "../Hook/useAuth";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <ImSpinner6 size={40} className="animate-spin" />
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
