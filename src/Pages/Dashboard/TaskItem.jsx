import PropTypes from "prop-types";
import { FaEdit, FaTrash } from "react-icons/fa";

const TaskItem = ({ task, handelDeleteTask, updateTask }) => {
// console.log(updateTask)
    return (
        <div className="flex justify-between w-full items-center shadow-md p-4 bg-white rounded-lg">
        <div>
            <h3 className="font-semibold">{task?.title} <span className="font-normal text-base">({task?.category})</span></h3>
            <p className="text-sm text-gray-600">{task.description}</p>
        </div>
        <div className="flex gap-3">
            <button className="text-yellow-500 hover:text-yellow-600">
                <FaEdit />
            </button>

            <button
             onClick={()=> handelDeleteTask(task?._id)} className="text-red-500 hover:text-red-600 cursor-pointer">
                <FaTrash />
            </button>
        </div>
    </div>
    );
};

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    handelDeleteTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
};

export default TaskItem;