import toast from "react-hot-toast";
import TaskItem from "../TaskItem";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";
import LoadingSkeleton from "../../../Loading/LoadingSkelton";
import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

const InProgress = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);

    const { data: taskData, refetch, isLoading } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/tasks/${user.email}?category=inProgress`);
            return data;
        },
    });

    useEffect(() => {
        if (taskData) {
            setTasks(taskData);
        }
    }, [taskData]);

    // Delete Task
    const handelDeleteTask = async (id) => {
        console.log("Deleting task with ID:", id);

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
        <div className="p-4 sm:p-6 shadow-lg rounded-xl min-h-[72vh]">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">In Progress Tasks</h2>

            {/* Task List */}
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

export default InProgress;