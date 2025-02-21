import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {  BrowserRouter, Routes, Route  } from "react-router";
import './index.css';
import Root from './Layouts/Root.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import Home from './Pages/Home';
import { Toaster } from 'react-hot-toast'
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import ToDo from './Pages/Dashboard/ToDo/ToDo.jsx';
import Done from './Pages/Dashboard/Done/Done.jsx';
import Login_Register from './Pages/Auth/Login_Register.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import InProgress from './Pages/Dashboard/InProgress/InProgress.jsx';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
<QueryClientProvider client={queryClient}>
<AuthProvider>
 <BrowserRouter>
 <Routes>
    <Route path="/" element={<Root />}>
    <Route index element={<Home />} />
    <Route path='login' element={<Login_Register/>}/>
    <Route path="dashboard/*" element={<Dashboard />} >
    <Route path='todo' element={<ToDo />} />
    <Route path='inprogress' element={<InProgress />} />
    <Route path='done' element={<Done />} />
    </Route>
  </Route>
</Routes>
<Toaster position='top-right' reverseOrder={false} />
  </BrowserRouter>
    </AuthProvider>
</QueryClientProvider>
  </StrictMode>,
)
