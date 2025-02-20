import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskItem from "./TaskItem";

const ToDo = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Sample Task 1", description: "This is a sample task", category: "To-Do", timestamp: new Date().toLocaleString() },
        { id: 2, title: "Sample Task 2", description: "Another task", category: "To-Do", timestamp: new Date().toLocaleString() },
    ]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Add New Task
    const onSubmit = (data) => {
        const newTask = {
            id: Date.now(),
            title: data.title,
            description: data.description,
            category: data.category,
            timestamp: new Date().toLocaleString(),
        };
        setTasks([...tasks, newTask]);
        reset();
    };

    // Delete Task
    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    // Update Task
    const updateTask = (id, newTitle, newDescription) => {
        setTasks(tasks.map(task => (task.id === id ? { ...task, title: newTitle, description: newDescription } : task)));
    };

    // Handle Drag End
    const onDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = tasks.findIndex(task => task.id === active.id);
            const newIndex = tasks.findIndex(task => task.id === over.id);
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
                <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                    <div className="mt-4 space-y-2">
                        {tasks.map(task => (
                            <TaskItem key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default ToDo;
