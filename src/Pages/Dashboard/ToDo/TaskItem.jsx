import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { useState } from "react";
import PropTypes from "prop-types";

const TaskItem = ({ task, deleteTask, updateTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    // Make the task draggable
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

    // Apply drag styles
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    // Save edited task
    const saveTask = () => {
        updateTask(task.id, title, description);
        setIsEditing(false);
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className="p-4 bg-gray-100 rounded-lg flex justify-between items-center shadow cursor-grab"
        >
            {isEditing ? (
                <div className="flex flex-col gap-2 w-full">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={50}
                        className="p-2 rounded border border-gray-300"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={200}
                        className="p-2 rounded border border-gray-300"
                    />
                    <button onClick={saveTask} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                        <FaSave /> Save
                    </button>
                </div>
            ) : (
                <div className="flex justify-between w-full items-center">
                    <div>
                        <h3 className="font-semibold">{task?.title} <span className="font-normal text-base">({task?.category})</span></h3>
                        <p className="text-sm text-gray-600">{task.description}</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setIsEditing(true)} className="text-yellow-500 hover:text-yellow-600">
                            <FaEdit />
                        </button>
                        <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-600">
                            <FaTrash />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
}

export default TaskItem;
