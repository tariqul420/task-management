import { useNavigate } from 'react-router';
import useAuth from '../../Hook/useAuth';

const Error = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-6">
            <div className="text-center space-y-6">
                {/* Error Icon */}
                <div className="text-8xl text-red-500 dark:text-red-400">
                    <span role="img" aria-label="Error">
                        😞
                    </span>
                </div>

                {/* Error Message */}
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                    Oops! Something went wrong.
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    The page you&apos;re looking for doesn&apos;t exist or an error occurred.
                </p>

                {/* Back to Home Button */}
                <button
                    onClick={() => navigate(user ? '/dashboard/manage-task' : '/login')}
                    className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Error;