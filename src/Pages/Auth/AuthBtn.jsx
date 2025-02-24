import { GoogleAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";

const AuthBtn = () => {
    const googleProvider = new GoogleAuthProvider();
    const { socialAuth } = useAuth();
    const navigate = useNavigate()

    const handelGoogle = async () => {
        try {
            await socialAuth(googleProvider)
            toast.success('Login Successfully! ❤️')
            navigate('/dashboard/manage-task')
        } catch (error) {
            toast.error(error.code)
        }
    };

    return (
        <div onClick={handelGoogle} className="flex items-center justify-center gap-2">
            <button
                className="cursor-pointer mx-auto border-solid dark:bg-[#364153] px-4 py-2 flex items-center justify-center rounded-lg shadow-md hover:shadow-lg transition duration-300 gap-2">
                <FaGoogle size={24} /> <span>Google</span>
            </button>
        </div>
    );
};

export default AuthBtn;