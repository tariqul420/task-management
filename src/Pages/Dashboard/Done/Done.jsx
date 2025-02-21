import toast from "react-hot-toast";
import TaskItem from "../TaskItem";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";
import LoadingSkeleton from "../../../Loading/LoadingSkelton";

const InProgress = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {data: tasks = [], refetch, isLoading} = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const {data} = await axiosSecure.get(`/tasks/${user.email}?category=done`);
            return data;
        },
    }) 

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

    if(isLoading) <LoadingSkeleton />

    return (
       <div className="p-6 bg-white shadow-lg rounded-xl min-h-[72vh]">
                   <h2 className="text-2xl font-bold mb-4">Done Task</h2>
       
                   <div className="mt-4 grid grid-cols-2 gap-2">
                               {tasks?.map((task) => (
                                   <TaskItem key={task._id} task={task} handelDeleteTask={handelDeleteTask} updateTask={updateTask} />
                               ))}
                           </div>
               </div>
    );
};

export default InProgress;