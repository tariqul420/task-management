import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
// import { useQueryClient } from "@tanstack/react-query";

const AddTask = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    // const queryClient = useQueryClient()

        // Add New Task
        const onSubmit = async (data) => {
            try {
                const newTask = { ...data, user: user.email, date: new Date() };
    
                await axiosSecure.post("/tasks", newTask);
                toast.success("Task added successfully ❤️");
    
                reset();
            } catch (error) {
                console.error("Failed to add task:", error);
                toast.error("Failed to add task");
            }
        };
    
    return (
        <div className="p-4 sm:p-6 shadow-lg rounded-xl">
                    <h2 className="text-xl sm:text-2xl text-center font-bold mb-6">Add Task</h2>
        
                    {/* Add Task Form */}
                   <form onSubmit={handleSubmit(onSubmit)} className="mb-6 p-4 sm:p-6 rounded-lg shadow-md border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            {/* Title Input */}
                            <div className="flex flex-col">
                                <label className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">Title:</label>
                                <input
                                    {...register("title", { required: "Title is required", maxLength: 50 })}
                                    type="text"
                                    className="mt-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                    placeholder="Enter task title"
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                            </div>
        
                            {/* Category Select */}
                            <div className="flex flex-col">
                                <label className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">Category:</label>
                                <select
                                    {...register("category")}
                                    className="mt-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition dark:bg-[#121b27]"
                                >
                                    <option value="To-Do">To-Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
        
                            {/* Description Input */}
                            <div className="md:col-span-2 flex flex-col">
                                <label className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">Description:</label>
                                <textarea
                                    {...register("description", { maxLength: 200 })}
                                    className="mt-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none"
                                    placeholder="Enter description (optional)"
                                    rows="3"
                                ></textarea>
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                            </div>
                        </div>
        
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="mt-6 w-full bg-blue-500 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <FaPlus /> Add Task
                        </button>
                    </form>
        </div>
    );
};

export default AddTask;