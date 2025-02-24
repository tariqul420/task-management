import { useNavigate } from "react-router";
import useAuth from "../Hook/useAuth";

const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        user ? (
            navigate('/dashboard/manage-task')
        ) : (
            navigate('/login')
        )
    );
};

export default Home;