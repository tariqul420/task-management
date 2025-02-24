import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import UpdateModal from "../../../Modal/UpdateModal";

const ManageTask = () => {
    const axiosSecure = useAxiosSecure()
    const [isOpen, setIsOpen] = useState(false);

    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks`);
            return res.data;
        },
    });

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (data.length) {
            setTasks(data);
        }
    }, [data]);

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/tasks/${id}`)

                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Your task has been deleted.", "success");
                    refetch();
                } else {
                    Swal.fire("Failed!", "Task deletion failed.", "error");
                }
            }
        } catch (error) {
            Swal.fire("Error!", "Something went wrong.", "error");
            console.error("Error deleting task:", error);
        }
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === destination.droppableId) {
            const updatedCategoryTasks = [...categorizedTasks[source.droppableId]];
            const [movedTask] = updatedCategoryTasks.splice(source.index, 1);
            updatedCategoryTasks.splice(destination.index, 0, movedTask);

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    updatedCategoryTasks.find((t) => t._id === task._id) || task
                )
            );
        } else {
            const sourceTasks = [...categorizedTasks[source.droppableId]];
            const destinationTasks = [...categorizedTasks[destination.droppableId]];

            const [movedTask] = sourceTasks.splice(source.index, 1);
            movedTask.category = destination.droppableId;
            destinationTasks.splice(destination.index, 0, movedTask);

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === movedTask._id ? movedTask : task
                )
            );
        }
    };

    const categorizedTasks = {
        "To-Do": tasks.filter((task) => task.category === "To-Do"),
        "In Progress": tasks.filter((task) => task.category === "In Progress"),
        Done: tasks.filter((task) => task.category === "Done"),
    };

    if (isLoading) return <p className="text-center">Loading...</p>;

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {["To-Do", "In Progress", "Done"].map((category) => (
                    <div key={category}>
                        <h2 className="text-xl font-bold mb-4 text-center text-black dark:text-white">{category}</h2>
                        <Droppable droppableId={category}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="p-4 rounded"
                                >
                                    {categorizedTasks[category].length > 0 ? (
                                        categorizedTasks[category].map((task, index) => (
                                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="flex justify-between w-full shadow-md p-3 sm:p-4 dark:bg-[#1f2a3e] rounded-lg cursor-move mb-4"
                                                    >
                                                        {/* Task Details */}
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-sm sm:text-base">
                                                                {task?.title}
                                                            </h3>
                                                            <p>{new Date(task?.date).toLocaleDateString("en-US", {
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric"
                                                            })}</p>
                                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                                                                {task.description}
                                                            </p>
                                                        </div>

                                                        {/* Action Buttons */}
                                                        <div className="flex flex-col gap-1 items-end">
                                                            <button className={`px-2 py-1 bg-[#2b7fff] rounded-md `}>{task?.category}</button>

                                                            <button
                                                                onClick={() => handleDelete(task?._id)}
                                                                className={`px-2 py-1 bg-red-500 rounded-md cursor-pointer`}>Delete</button>

                                                            <button
                                                                onClick={() => setIsOpen(true)}
                                                                className={`px-4 py-1 bg-yellow-500 rounded-md cursor-pointer`}>Edit</button>
                                                        </div>

                                                        {/* Edit Modal */}
                                                        <UpdateModal isOpen={isOpen} setIsOpen={setIsOpen} task={task} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500 dark:text-gray-300">No tasks available</p>
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>
    );
};

export default ManageTask;