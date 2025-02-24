import { FaListUl, FaPlus, FaUserCircle } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
import { MdDarkMode, MdLogout } from "react-icons/md";
import { NavLink, Outlet, useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";
import useTheme from "../../Hook/useTheme";

const Dashboard = () => {
    const { logOutUser, user } = useAuth();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const handelLogout = async () => {
        await logOutUser();
        navigate('/login');
    };

    return (
        <section className="grid grid-cols-1 lg:grid-cols-12 min-h-screen gap-4">
            {/* Sidebar - Fixed */}
            <aside className="lg:col-span-2 dark:bg-[#121b27] shadow-lg p-4 lg:p-6 rounded-xl lg:h-screen lg:sticky lg:top-0">
                <h2 className="text-xl lg:text-2xl font-bold mb-6">Task Manager</h2>
                <nav className="flex flex-col space-y-2 lg:space-y-4">
                    <NavLink
                        to="/dashboard/add-task"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg text-base lg:text-lg font-medium transition
                            ${isActive ? "bg-blue-500 text-white" : "text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-[#1f2a3e]"}`
                        }
                    >
                        <FaPlus />
                        <span>Add Task</span>
                    </NavLink>

                    <NavLink
                        to="/dashboard/manage-task"
                        className={({ isActive }) =>
                            `flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg text-base lg:text-lg font-medium transition
                            ${isActive ? "bg-blue-500 text-white" : "text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-[#1f2a3e]"}`
                        }
                    >
                        <FaListUl />
                        <span>Manage Task</span>
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content - Scrollable */}
            <main className="lg:col-span-10 flex flex-col h-screen overflow-hidden">
                {/* Sticky Navbar */}
                <nav className="flex flex-col lg:flex-row items-center justify-between dark:bg-[#121b27] p-4 shadow-lg rounded-lg sticky top-0 z-50 gap-4 lg:gap-0">
                    {/* Search Field */}
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="p-2 w-full lg:w-2/4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex items-center gap-4 lg:gap-6">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full dark:bg-gray-700"
                        >
                            {theme === "dark" ? (
                                <IoMdSunny size={24} color="#2b7fff" />
                            ) : (
                                <MdDarkMode size={24} color="#1E1E1E" />
                            )}
                        </button>

                        {/* Add Task Button */}
                        <button
                            onClick={() => navigate('/dashboard/manage-task')}
                            className="flex items-center gap-2 bg-blue-500 px-3 lg:px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer text-white"
                        >
                            <FaPlus />
                            <span className="hidden lg:inline">Add Task</span>
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={handelLogout}
                            className="flex items-center gap-2 bg-blue-500 px-3 lg:px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer text-white"
                        >
                            <MdLogout />
                            <span className="hidden lg:inline">Logout</span>
                        </button>

                        {/* profile icon */}
                        <div className="flex flex-col items-center justify-center gap-0">
                            {
                                user?.photoURL ? (
                                    <img
                                        referrerPolicy="no-referrer"
                                        src={user.photoURL}
                                        alt="user-photo"
                                        className="w-10 h-10 rounded-full"
                                    />
                                ) : (
                                    <div className="text-gray-700 text-3xl lg:text-4xl cursor-pointer dark:text-white">
                                        <FaUserCircle />
                                    </div>
                                )
                            }
                        </div>

                    </div>
                </nav>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-6 dark:bg-[#121b27] shadow-lg rounded-xl scrollbar-hide">
                    <Outlet />
                </div>

                {/* Footer */}
                <footer className="text-center py-4 shadow-lg dark:bg-[#121b27] rounded-lg">
                    <p className="text-gray-600">&copy; 2025 Task Manager. All rights reserved.</p>
                </footer>
            </main>
        </section>
    );
};

export default Dashboard;