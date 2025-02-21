import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import TaskItem from "./TaskItem";

const ToDo = () => {
    const [tasks, setTasks] = useState([]);
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    // Fetch tasks from the backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                axiosSecure.get("/tasks")
                .then((response) => {
                    setTasks(response.data);
                }
                );
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
        };

        fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // WebSocket connection for real-time updates
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);

            switch (message.type) {
                case "taskCreated":
                    setTasks((prevTasks) => [...prevTasks, message.data]);
                    break;
                case "taskUpdated":
                    setTasks((prevTasks) =>
                        prevTasks.map((task) =>
                            task._id === message.data._id ? message.data : task
                        )
                    );
                    break;
                case "taskDeleted":
                    setTasks((prevTasks) =>
                        prevTasks.filter((task) => task._id !== message.data._id)
                    );
                    break;
                default:
                    console.log("Unknown message type:", message.type);
            }
        };

        return () => ws.close();
    }, []);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Add New Task
    const onSubmit = async (data) => {
        try {
            await axiosSecure.post("/tasks", {...data, user: user.email});

            reset();
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    // Delete Task
    const deleteTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/tasks/${id}`, {
                method: "DELETE",
                credentials: "include", // Include cookies for authentication
            });

            if (!response.ok) {
                throw new Error("Failed to delete task");
            }
        } catch (error) {
            console.error("Failed to delete task:", error);
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
    const onDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = tasks.findIndex((task) => task._id === active.id);
            const newIndex = tasks.findIndex((task) => task._id === over.id);
            setTasks(arrayMove(tasks, oldIndex, newIndex));
        }
    };

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
                    className="mt-6 w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                >
                    <FaPlus /> Add Task
                </button>
            </form>

            {/* Drag-and-Drop Task List */}
            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
                    <div className="mt-4 space-y-2">
                        {tasks?.map((task) => (
                            <TaskItem key={task._id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default ToDo;