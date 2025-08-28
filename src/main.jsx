import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider } from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <App />
    <ToastContainer position="top-right" />
  </AuthProvider>

);