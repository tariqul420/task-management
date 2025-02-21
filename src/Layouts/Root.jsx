import { Outlet } from "react-router";


const Root = () => {
    return (
        <div className="bg-gray-100 dark:bg-[#09101a] dark:text-white">
            <Outlet />
        </div>
    );
};

export default Root;