
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";
import saveUser from "../../api/saveUser";


const Register = () => {
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [isEyeOpenRe, setIsEyeOpenRe] = useState(false);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm()
    const { createUser, updateUserProfile, loading, setLoading } = useAuth()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        const { fullName, email, password } = data;

        setLoading(true)

        // Register with email and password
        try {
            const result = await createUser(email, password)
            await updateUserProfile(fullName)
            await saveUser({ ...result?.user, displayName: fullName })
            toast.success("Registration successfully ❤️")
            navigate('/dashboard/todo')
            reset()
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error('User already exists!')
                reset()
            } else {
                toast.error(error.code)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <section className="w-11/12 md:w-10/12 mx-auto h-auto flex flex-col-reverse max-sm:mb-8 lg:flex-row my-0 lg:my-4">
                {/* Register Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
                        <h3 className="text-[1.8rem] font-[700] text-center">
                            Register
                        </h3>

                        <div>
                            {/* Full Name */}
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full  name"
                                className="inputField"
                                {...register("fullName", { required: 'Name is required', minLength: { value: 5, message: 'Name must be at least 5 characters long.' } })}
                            />
                            {errors.fullName && <p className="flex text-red-500 gap-1 items-center"><MdError /> {errors.fullName.message} </p>}
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="inputField"
                                {...register("email", { required: 'Email is required' })}
                            />
                            {errors.email && <p className="flex text-red-500 gap-1 items-center"><MdError /> {errors.email.message} </p>}
                        </div>

                        {/* Password */}
                        <div className="w-full relative">
                            <input
                                type={isEyeOpen ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className="inputField"
                                {...register("password", {
                                    required: 'Password is required',
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                                        message: 'Password must be 6+ chars with uppercase, lowercase, and a number.'
                                    }
                                })}
                            />

                            {errors.password && <p className="flex text-red-500 gap-1 items-center"><MdError /> {errors.password.message} </p>}

                            {isEyeOpen ? (
                                <BsEyeSlash
                                    className="absolute top-4 right-4 text-[1.2rem] text-[#777777] cursor-pointer"
                                    onClick={() => setIsEyeOpen(false)}
                                />
                            ) : (
                                <BsEye
                                    className="absolute top-4 right-4 text-[1.2rem] text-[#777777] cursor-pointer"
                                    onClick={() => setIsEyeOpen(true)}
                                />
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="w-full relative">
                            <input
                                type={isEyeOpenRe ? "text" : "password"}
                                name="password"
                                placeholder="Confirm Password"
                                className="inputField"
                                {...register("confirmPassword", {
                                    required: 'Confirm Password is required',
                                    validate: value => value === watch('password') || 'Passwords do not match'
                                })}
                            />

                            {errors.confirmPassword && <p className="flex text-red-500 gap-1 items-center"><MdError /> {errors.confirmPassword.message} </p>}

                            {isEyeOpenRe ? (
                                <BsEyeSlash
                                    className="absolute top-4 right-4 text-[1.2rem] text-[#777777] cursor-pointer"
                                    onClick={() => setIsEyeOpenRe(false)}
                                />
                            ) : (
                                <BsEye
                                    className="absolute top-4 right-4 text-[1.2rem] text-[#777777] cursor-pointer"
                                    onClick={() => setIsEyeOpenRe(true)}
                                />
                            )}
                        </div>

                        {/* Register button */}
                        <div className="w-full flex items-center justify-center">
                            <button
                                disabled={loading}
                                type="submit"
                                className="inputButton disabled:cursor-not-allowed"
                            >
                                {
                                    loading ? 'Registering...' : 'Register'
                                }
                            </button>
                        </div>
                    </form>
            </section>
        </>
    );
};

export default Register;
