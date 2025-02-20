import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {  BrowserRouter, Routes, Route  } from "react-router";
import './index.css';
import Root from './Layouts/Root.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import Home from './Pages/Home';

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <AuthProvider>
 <BrowserRouter>
 <Routes>
  <Route path="/" element={<Root />}>
    <Route index element={<Home />} />
  </Route>
</Routes>
  </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
