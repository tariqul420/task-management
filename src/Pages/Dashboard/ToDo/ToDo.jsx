import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import LoadingSkeleton from "../../../Loading/LoadingSkelton";
import TaskItem from "../TaskItem";

const ToDo = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);

    const { data: taskData, refetch, isLoading } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/tasks/${user.email}?category=""`);
            return data;
        },
    });

    useEffect(() => {
        if (taskData) {
            setTasks(taskData);
        }
    }, [taskData]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Add New Task
    const onSubmit = async (data) => {
        try {
            const newTask = { ...data, user: user.email, date: new Date() };

            await axiosSecure.post("/tasks", newTask);
            toast.success("Task added successfully ❤️");

            refetch();
            reset();
        } catch (error) {
            console.error("Failed to add task:", error);
            toast.error("Failed to add task");
        }
    };

    // Delete Task
    const handelDeleteTask = async (id) => {
        try {
            await axiosSecure.delete(`/tasks/${id}`);
            refetch();
            toast.success("Task deleted successfully ❤️");
        } catch (error) {
            console.error("Failed to delete task:", error);
            toast.error("Failed to delete task");
        }
    };

    // Handle Drag-and-Drop Reorder
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = tasks.findIndex((task) => task._id === active.id);
        const newIndex = tasks.findIndex((task) => task._id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
            const updatedTasks = arrayMove(tasks, oldIndex, newIndex);
            setTasks(updatedTasks);
        }
    };

    if (isLoading) return <LoadingSkeleton />;

    return (
        <div className="p-4 sm:p-6 shadow-lg rounded-xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">To-Do Tasks</h2>

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

            {/* Task List with Drag-and-Drop */}
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={tasks.map(t => t._id)} strategy={verticalListSortingStrategy}>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tasks?.map((task) => (
                            <TaskItem key={task._id} task={task} handelDeleteTask={handelDeleteTask} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {/* Empty State */}
            {tasks.length === 0 && (
                <div className="mt-6 text-center text-gray-500 dark:text-gray-300">
                    No tasks found. Add a new task to get started!
                </div>
            )}
        </div>
    );
};

export default ToDo;
