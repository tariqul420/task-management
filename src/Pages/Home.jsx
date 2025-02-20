import useAuth from "../Hook/useAuth";
import Login_Register from "./Auth/Login_Register";

const Dashboard = () => {

    const { user } = useAuth();

    return (
        user ? (
            <Dashboard/>
        ) : (
            <Login_Register/>
        )
    );
};

export default Dashboard;