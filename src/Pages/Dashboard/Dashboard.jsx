import { FaCheckCircle, FaListUl, FaPlus, FaSpinner, FaUserCircle } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
import { MdDarkMode, MdLogout } from "react-icons/md";
import { NavLink, Outlet, useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";
import useTheme from "../../Hook/useTheme";

const Dashboard = () => {
    const { logOutUser } = useAuth();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const handelLogout = async () => {
        await logOutUser();
        navigate('/login')
    }

    return (
        <section className="grid grid-cols-12 min-h-screen gap-4">
            {/* Sidebar - Fixed */}
            <aside className="col-span-3  dark:bg-[#121b27] shadow-lg p-6 rounded-xl h-screen sticky top-0">
                <h2 className="text-2xl font-bold mb-6">Task Manager</h2>
                <nav className="flex flex-col space-y-4">
                    <NavLink
                        to="/dashboard/todo"
                        className={({ isActive }) =>
                            `flex items-center space-x-3 p-3 rounded-lg text-lg font-medium transition
                            ${isActive ? "bg-blue-500 text-white" : "text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-[#1f2a3e]"}`
                        }
                    >
                        <FaListUl />
                        <span>To-Do</span>
                    </NavLink>

                    <NavLink
                        to="/dashboard/inprogress"
                        className={({ isActive }) =>
                            `flex items-center space-x-3 p-3 rounded-lg text-lg font-medium transition 
                            ${isActive ? "bg-yellow-500 text-white" : "text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-[#1f2a3e]"}`
                        }
                    >
                        <FaSpinner />
                        <span>In Progress</span>
                    </NavLink>

                    <NavLink
                        to="/dashboard/done"
                        className={({ isActive }) =>
                            `flex items-center space-x-3 p-3 rounded-lg text-lg font-medium transition 
                            ${isActive ? "bg-green-500 text-white" : "text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-[#1f2a3e]"}`
                        }
                    >
                        <FaCheckCircle />
                        <span>Done</span>
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content - Scrollable */}
            <main className="col-span-9 flex flex-col h-screen overflow-hidden">
                {/* Sticky Navbar */}
                <nav className="flex items-center justify-between  dark:bg-[#121b27] p-4 shadow-lg rounded-lg sticky top-0 z-50">
                    {/* Search Field */}
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="p-2 w-2/4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex items-center gap-6">
                        {/* theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full  dark:bg-gray-700"
                        >
                            {theme === "dark" ? (
                                <IoMdSunny size={30} color="#2b7fff" />
                            ) : (
                                <MdDarkMode size={30} color="#1E1E1E" />
                            )}
                        </button>

                        {/* Add Task Button */}
                        <button className="items-center gap-2 bg-blue-500  px-4 py-2 rounded-lg hover:bg-blue-600 transition inline-flex cursor-pointer text-white">
                            <FaPlus />
                            <span>Add Task</span>
                        </button>

                        <button
                            onClick={handelLogout}
                            className="items-center gap-2 bg-blue-500  px-4 py-2 rounded-lg hover:bg-blue-600 transition inline-flex cursor-pointer text-white">
                            <MdLogout />
                            <span>Logout</span>
                        </button>

                        {/* Profile Icon */}
                        <div className="text-gray-700 text-4xl cursor-pointer dark:text-white">
                            <FaUserCircle />
                        </div>
                    </div>
                </nav>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6  dark:bg-[#121b27] shadow-lg rounded-xl scrollbar-hide">
                    <Outlet />
                </div>

                {/* Footer */}
                <footer className="text-center py-4  shadow-lg dark:bg-[#121b27] rounded-lg">
                    <p className="text-gray-600">&copy; 2025 Task Manager. All rights reserved.</p>
                </footer>
            </main>
        </section>
    );
};

export default Dashboard;
