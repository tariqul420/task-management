import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa'

function UpdateModal({isOpen, setIsOpen, data}) {
        const { register, handleSubmit, reset, formState: { errors } } = useForm();

        const onSubmit = (data) => {
            console.log(data)
        }

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold text-center text-xl">Update Todo</DialogTitle>

            <Description>
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
            </Description>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

UpdateModal.PropTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    data: PropTypes.object
}

export default UpdateModal