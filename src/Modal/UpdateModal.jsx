import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { CgCloseR } from "react-icons/cg";
import { FaPen } from 'react-icons/fa';
import useAxiosSecure from '../Hook/useAxiosSecure';
import { useQueryClient } from '@tanstack/react-query';

function UpdateModal({ isOpen, setIsOpen, task }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const onSubmit = (data) => {
        const updatedTask = { ...data, date: new Date() };

        axiosSecure.put(`/tasks/${task?._id}`, updatedTask)
            .then(() => {
                setIsOpen(false);
                queryClient.invalidateQueries('tasks');
            })
            .catch((error) => {
                console.error('Failed to update task:', error);
            });
    };

    return (
        <>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg dark:border-gray-700">
                        <div className='flex justify-end cursor-pointer'>
                            <button
                                onClick={() => setIsOpen(false)}>
                                <CgCloseR size={24} className="text-gray-800 dark:text-gray-200" />
                            </button>
                        </div>
                        <DialogTitle className="font-bold text-center text-xl dark:text-gray-200">
                            <p>Update Task</p>
                        </DialogTitle>

                        <Description>
                            <form onSubmit={handleSubmit(onSubmit)} className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Title Input */}
                                    <div className="flex flex-col">
                                        <label className="text-gray-600 dark:text-gray-300 font-medium">Title:</label>
                                        <input
                                            defaultValue={task?.title}
                                            {...register("title", { required: "Title is required", maxLength: 50 })}
                                            type="text"
                                            className="mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition dark:bg-gray-700 dark:text-gray-200"
                                            placeholder="Enter task title"
                                        />
                                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                                    </div>

                                    {/* Category Select */}
                                    <div className="flex flex-col">
                                        <label className="text-gray-600 dark:text-gray-300 font-medium">Category:</label>
                                        <select
                                            defaultValue={task?.category}
                                            {...register("category")}
                                            className="mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition dark:text-gray-200"
                                        >
                                            <option value="To-Do">To-Do</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Done">Done</option>
                                        </select>
                                    </div>

                                    {/* Description Input */}
                                    <div className="md:col-span-2 flex flex-col">
                                        <label className="text-gray-600 dark:text-gray-300 font-medium">Description:</label>
                                        <textarea
                                            defaultValue={task?.description}
                                            {...register("description", { maxLength: 200 })}
                                            className="mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none dark:bg-gray-700 dark:text-gray-200"
                                            placeholder="Enter description (optional)"
                                            rows="3"
                                        ></textarea>
                                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="mt-6 w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all flex items-center justify-center gap-2 cursor-pointer dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                    <FaPen /> Update
                                </button>
                            </form>
                        </Description>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}

// Proper prop validation
UpdateModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
};

export default UpdateModal;