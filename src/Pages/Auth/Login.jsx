import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";

const Login = () => {
    const navigate = useNavigate()
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const { setEmail, loginUser, loading, setLoading } = useAuth()

    const onSubmit = async (data) => {
        const { email, password } = data

        setLoading(true)

        // Login with email and password
        try {
            await loginUser(email, password)
            setEmail('')
            toast.success('Login Successfully ❤️')
            navigate('/dashboard/todo')
            reset()
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                toast.error('Invalid Email or Password')
                reset()

            } else {
                toast.error(error.code)
                reset()
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <section className="w-10/12 mx-auto h-auto flex flex-col-reverse max-sm:mb-8 lg:flex-row my-0 lg:my-12">

                {/* Login Form */}
                <div className="shadow-md backdrop-blur-3xl rounded-lg sm:py-6 sm:px-8 p-4 flex flex-col gap-5 flex-1 dark:bg-dark-lite">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
                        <h3 className="text-[1.8rem] font-[700] text-center">
                            Login
                        </h3>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="inputField"
                                {...register("email", { required: 'Email is required', onChange: (e) => setEmail(e.target.value) })}
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
                                    required: 'Password is required'
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

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-[1rem] text-color-primary2 font-[500]">Remember Me</span>
                            </label>
                            <p onClick={() => navigate('/login/forgot-password')} className="text-[1rem] text-color-primary2 font-[500] cursor-pointer">
                                Forget password
                            </p>
                        </div>


                        <div className="w-full flex items-center justify-center">
                            <button
                                disabled={loading}
                                type="submit"
                                className="inputButton disabled:cursor-not-allowed"
                            >
                                {
                                    loading ? 'Login...' : 'Login'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Login;