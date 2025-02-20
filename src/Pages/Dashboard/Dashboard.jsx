import { FaListUl, FaSpinner, FaCheckCircle, FaPlus, FaUserCircle } from "react-icons/fa";
import { NavLink, Outlet } from "react-router";

const Dashboard = () => {
    return (
        <section className="grid grid-cols-12 gap-4 min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="col-span-3 bg-white shadow-lg p-6 rounded-xl h-full">
                <h2 className="text-2xl font-bold mb-6">Task Manager</h2>
                <nav className="flex flex-col space-y-4">
                    <NavLink 
                        to="/dashboard/todo" 
                        className={({ isActive }) => 
                            `flex items-center space-x-3 p-3 rounded-lg text-lg font-medium transition 
                            ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`
                        }
                    >
                        <FaListUl />
                        <span>To-Do</span>
                    </NavLink>

                    <NavLink 
                        to="/dashboard/inprogress" 
                        className={({ isActive }) => 
                            `flex items-center space-x-3 p-3 rounded-lg text-lg font-medium transition 
                            ${isActive ? "bg-yellow-500 text-white" : "text-gray-700 hover:bg-gray-200"}`
                        }
                    >
                        <FaSpinner />
                        <span>In Progress</span>
                    </NavLink>

                    <NavLink 
                        to="/dashboard/done" 
                        className={({ isActive }) => 
                            `flex items-center space-x-3 p-3 rounded-lg text-lg font-medium transition 
                            ${isActive ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-200"}`
                        }
                    >
                        <FaCheckCircle />
                        <span>Done</span>
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="col-span-9 bg-white shadow-lg p-6 rounded-xl">
                {/* Navbar */}
                <nav className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg mb-4 gap-6">
                    {/* Search Field */}
                    <input 
                        type="text" 
                        placeholder="Search tasks..." 
                        className="p-2 w-3/4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex items-center gap-6">
                        {/* Add Task Button */}
                    <button className="items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition inline-flex">
                        <FaPlus />
                        <span>Add Task</span>
                    </button>

                    {/* Profile Logo */}
                    <div className="text-gray-700 text-4xl cursor-pointer">
                        <FaUserCircle />
                    </div>
                    </div>
                </nav>

                {/* Page Content */}
                <div className="min-h-[calc(100vh-220px)]">
                <Outlet />
                </div>

                {/* Footer */}
                <footer className="text-center py-4 mt-4 bg-white shadow-lg rounded-lg">
                    <p className="text-gray-600">&copy; 2025 Task Manager. All rights reserved.</p>
                </footer>
            </main>
        </section>
    );
};

export default Dashboard;
