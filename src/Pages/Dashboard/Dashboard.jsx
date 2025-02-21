import { FaCheckCircle, FaListUl, FaPlus, FaSpinner, FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { NavLink, Outlet, useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";

const Dashboard = () => {
const { logOutUser} = useAuth();
    const navigate = useNavigate();

    const handelLogout = async()=>{
        await logOutUser();
        navigate('/login')
    }

    return (
        <section className="grid grid-cols-12 min-h-screen bg-gray-100 gap-4">
            {/* Sidebar - Fixed */}
            <aside className="col-span-3 bg-white shadow-lg p-6 rounded-xl h-screen sticky top-0">
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

            {/* Main Content - Scrollable */}
            <main className="col-span-9 flex flex-col h-screen overflow-hidden">
                {/* Sticky Navbar */}
                <nav className="flex items-center justify-between bg-white p-4 shadow-lg rounded-lg sticky top-0 z-50">
                    {/* Search Field */}
                    <input 
                        type="text" 
                        placeholder="Search tasks..." 
                        className="p-2 w-2/4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex items-center gap-6">
                        {/* Add Task Button */}
                        <button className="items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition inline-flex cursor-pointer">
                            <FaPlus />
                            <span>Add Task</span>
                        </button>

                        <button
                        onClick={handelLogout}
                         className="items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition inline-flex cursor-pointer">
                        <MdLogout />
                            <span>Logout</span>
                        </button>

                        {/* Profile Icon */}
                        <div className="text-gray-700 text-4xl cursor-pointer">
                            <FaUserCircle />
                        </div>
                    </div>
                </nav>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-white shadow-lg rounded-xl scrollbar-hide">
                    <Outlet />
                </div>

                {/* Footer */}
                <footer className="text-center py-4 bg-white shadow-lg rounded-lg">
                    <p className="text-gray-600">&copy; 2025 Task Manager. All rights reserved.</p>
                </footer>
            </main>
        </section>
    );
};

export default Dashboard;
