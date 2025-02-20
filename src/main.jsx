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

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <AuthProvider>
 <BrowserRouter>
 <Routes>
    <Route path="/" element={<Root />}>
    <Route index element={<Home />} />
    <Route path="dashboard/*" element={<Dashboard />} >
    <Route path='todo' element={<ToDo />} />
    </Route>
  </Route>
</Routes>
<Toaster position='top-right' reverseOrder={false} />
  </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
