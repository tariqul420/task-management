import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css';
import Root from './Layouts/Root.jsx';
import Login_Register from './Pages/Auth/Login_Register.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import Done from './Pages/Dashboard/Done/Done.jsx';
import InProgress from './Pages/Dashboard/InProgress/InProgress.jsx';
import ToDo from './Pages/Dashboard/ToDo/ToDo.jsx';
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
                  <Route element={<Dashboard />}> {/* Keep layout */}
                    <Route index element={<ToDo />} />
                    <Route path="todo" element={<ToDo />} />
                    <Route path="inprogress" element={<InProgress />} />
                    <Route path="done" element={<Done />} />
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
