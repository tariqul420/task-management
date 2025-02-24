import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css';
import Root from './Layouts/Root.jsx';
import Login_Register from './Pages/Auth/Login_Register.jsx';
import AddTask from './Pages/Dashboard/AddTask/AddTask.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import ManageTask from './Pages/Dashboard/ManageTask/ManageTask.jsx';
import Error from './Pages/Error/Error.jsx';
import Home from './Pages/Home';
import AuthProvider from './Provider/AuthProvider.jsx';
import ThemeProvider from './Provider/ThemeProvider.jsx';
import ProtectedRoute from './Router/ProtectedRoute.jsx';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Root />}>
                <Route path='*' element={<Error />} />
                <Route index element={<Home />} />
                <Route path='login' element={<Login_Register />} />

                {/* Protect Dashboard Routes */}
                <Route path="dashboard" element={<ProtectedRoute />}>
                  <Route element={<Dashboard />}> 
                  <Route path='add-task' element={<AddTask />} />
                    <Route index element={<ManageTask />} />
                    <Route path="manage-task" element={<ManageTask />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
            <Toaster position='top-right' reverseOrder={false} />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
