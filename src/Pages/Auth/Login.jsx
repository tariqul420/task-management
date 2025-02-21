import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { setEmail, loginUser, loading, setLoading } = useAuth();

    const onSubmit = async (data) => {
        const { email, password } = data;

        setLoading(true);

        try {
            await loginUser(email, password);
            setEmail('');
            toast.success('Login Successfully ❤️');
            navigate('/dashboard/todo');
            reset();
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                toast.error('Invalid Email or Password');
                reset();
            } else {
                toast.error(error.code);
                reset();
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                    Login
                </h3>

                {/* Email Input */}
                <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="mt-1 block w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition dark:bg-gray-700 dark:text-gray-200"
                        {...register("email", { required: 'Email is required', onChange: (e) => setEmail(e.target.value) })}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <MdError /> {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password Input */}
                <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <div className="relative">
                        <input
                            type={isEyeOpen ? "text" : "password"}
                            placeholder="Password"
                            className="mt-1 block w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition dark:bg-gray-700 dark:text-gray-200"
                            {...register("password", { required: 'Password is required' })}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
                            onClick={() => setIsEyeOpen(!isEyeOpen)}
                        >
                            {isEyeOpen ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <MdError /> {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        <input type="checkbox" className="mr-2" />
                        Remember Me
                    </label>
                    <button
                        type="button"
                        onClick={() => toast.error('This feature is not available yet.')}
                        className="text-sm sm:text-base text-blue-500 hover:underline"
                    >
                        Forgot Password?
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;