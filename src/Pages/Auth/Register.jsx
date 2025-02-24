import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";
import AuthBtn from "./AuthBtn";

const Register = () => {
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, loading, setLoading } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const { fullName, email, password } = data;
        setLoading(true);
        try {
            await createUser(email, password);
            await updateUserProfile(fullName);
            toast.success("Registration successful ❤️");
            navigate('/dashboard/manage-task');
            reset();
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/email-already-in-use') {
                toast.error('User already exists!');
                reset();
            } else {
                toast.error(error.code);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                    Register
                </h3>

                {/* Full Name Input */}
                <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="mt-1 block w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition dark:bg-gray-700 dark:text-gray-200"
                        {...register("fullName", { required: 'Name is required', minLength: { value: 5, message: 'Name must be at least 5 characters long.' } })}
                    />
                    {errors.fullName && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <MdError /> {errors.fullName.message}
                        </p>
                    )}
                </div>

                {/* Email Input */}
                <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="mt-1 block w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition dark:bg-gray-700 dark:text-gray-200"
                        {...register("email", { required: 'Email is required' })}
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
                            {...register("password", {
                                required: 'Password is required',
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                                    message: 'Password must be 6+ chars with uppercase, lowercase, and a number.'
                                }
                            })}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
                            onClick={() => setIsEyeOpen(!isEyeOpen)}
                            aria-label={isEyeOpen ? "Hide password" : "Show password"}
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

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 mt-2 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>

                {/* Google Login */}
                <div className="">
                    <AuthBtn />
                </div>
            </form>
        </div>
    );
};

export default Register;