import PropTypes from "prop-types";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateModal from "../../Modal/UpdateModal";

const TaskItem = ({ task, handelDeleteTask }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="flex justify-between w-full items-center shadow-md p-3 sm:p-4 dark:bg-[#1f2a3e] rounded-lg">
                {/* Task Details */}
                <div className="flex-1">
                    <h3 className="font-semibold text-sm sm:text-base">
                        {task?.title}{" "}
                        <span className="font-normal text-xs sm:text-sm">({task?.category})</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        {task.description}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="text-yellow-500 hover:text-yellow-600 transition cursor-pointer"
                    >
                        <FaEdit className="text-sm sm:text-base" />
                    </button>

                    <button
                        onClick={() => handelDeleteTask(task?._id)}
                        className="text-red-500 hover:text-red-600 transition cursor-pointer"
                    >
                        <FaTrash className="text-sm sm:text-base" />
                    </button>
                </div>
            </div>

            {/* Update Modal */}
            <UpdateModal isOpen={isOpen} setIsOpen={setIsOpen} task={task} />
        </>
    );
};

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    handelDeleteTask: PropTypes.func.isRequired,
};

export default TaskItem;