import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Register from './Register';
import Login from './Login';

function Login_Register() {
    return (
        <TabGroup className="mx-auto pt-10 min-h-screen flex items-center justify-center flex-col gap-8">
            <TabList className="flex gap-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-full shadow-inner">
                <Tab
                    className={({ selected }) =>
                        `px-6 py-3 rounded-full transition-all duration-300 ${
                            selected
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`
                    }
                >
                    Login
                </Tab>
                <Tab
                    className={({ selected }) =>
                        `px-6 py-3 rounded-full transition-all duration-300 ${
                            selected
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`
                    }
                >
                    Register
                </Tab>
            </TabList>
            <TabPanels className="w-full max-w-md">
                <TabPanel>
                    <Login />
                </TabPanel>
                <TabPanel>
                    <Register />
                </TabPanel>
            </TabPanels>
        </TabGroup>
    );
}

export default Login_Register;