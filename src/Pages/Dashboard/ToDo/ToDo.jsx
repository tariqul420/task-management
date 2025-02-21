import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import TaskItem from "../TaskItem";
import LoadingSkeleton from "../../../Loading/LoadingSkelton";

const ToDo = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: tasks = [], refetch, isLoading } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/tasks/${user.email}`);
            return data;
        },
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Add New Task
    const onSubmit = async (data) => {
        try {
            const newTask = { ...data, user: user.email, date: new Date() };

            // Send the new task to the backend
            await axiosSecure.post("/tasks", newTask);

            // Show success toast
            toast.success("Task added successfully ❤️");

            // Optimistically update the UI (new task appears first)
            refetch(); // Ensure the database is updated

            reset();
        } catch (error) {
            console.error("Failed to add task:", error);
            toast.error("Failed to add task");
        }
    };


    // Delete Task
    // Delete Task
    const handelDeleteTask = async (id) => {
        console.log("Deleting task with ID:", id);

        try {
            await axiosSecure.delete(`/tasks/${id}`);
            refetch(); // Refresh the task list after deletion
            toast.success("Task deleted successfully ❤️");
        } catch (error) {
            console.error("Failed to delete task:", error);
            toast.error("Failed to delete task");
        }
    };


    // Update Task
    const updateTask = async (id, newTitle, newDescription) => {
        try {
            const response = await fetch(`http://localhost:8080/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Include cookies for authentication
                body: JSON.stringify({ title: newTitle, description: newDescription }),
            });

            if (!response.ok) {
                throw new Error("Failed to update task");
            }
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    // Handle Drag End
    // const onDragEnd = async (event) => {
    //     const { active, over } = event;
    //     if (!over || active.id === over.id) return;

    //     const oldIndex = tasks.findIndex(task => task._id === active.id);
    //     const newIndex = tasks.findIndex(task => task._id === over.id);
    //     const newOrder = arrayMove(tasks, oldIndex, newIndex);

    //     try {
    //         await axiosSecure.put("/tasks/reorder", { newOrder });
    //         queryClient.invalidateQueries(["tasks"]);
    //     } catch (error) {
    //         console.error("Failed to reorder tasks:", error);
    //     }
    // };    

    if (isLoading) <LoadingSkeleton />

    return (
        <div className="p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-4">To-Do Tasks</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="mb-6 p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Add New Task</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title Input */}
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">Title:</label>
                        <input
                            {...register("title", { required: "Title is required", maxLength: 50 })}
                            type="text"
                            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                            placeholder="Enter task title"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    {/* Category Select */}
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-medium">Category:</label>
                        <select
                            {...register("category")}
                            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        >
                            <option value="To-Do">To-Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>

                    {/* Description Input */}
                    <div className="md:col-span-2 flex flex-col">
                        <label className="text-gray-600 font-medium">Description:</label>
                        <textarea
                            {...register("description", { maxLength: 200 })}
                            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none"
                            placeholder="Enter description (optional)"
                            rows="3"
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-6 w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                    <FaPlus /> Add Task
                </button>
            </form>

            <div className="mt-4 grid grid-cols-2 gap-2">
                {tasks?.map((task) => (
                    <TaskItem key={task._id} task={task} handelDeleteTask={handelDeleteTask} updateTask={updateTask} />
                ))}
            </div>
        </div>
    );
};

export default ToDo;