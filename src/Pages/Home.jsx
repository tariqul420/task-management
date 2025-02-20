import { useNavigate } from "react-router";
import useAuth from "../Hook/useAuth";
import Login_Register from "./Auth/Login_Register";

const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    if(!user) {
        return <p className="text-center">Loading.....</p>
    }

    return (
        user ? (
            navigate('/dashboard/todo')
        ) : (
            <Login_Register/>
        )
    );
};

export default Home;