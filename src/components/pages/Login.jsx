import React, { useState, useContext } from 'react';
import { useNavigate,NavLink } from 'react-router-dom';
import API from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  // State to store form input values
  const [formData, setFormData] = useState({ email: '', password: '' });

  // State to manage loading spinner during login
  const [loading, setLoading] = useState(false);

  // React Router hook for navigation after login
  const navigate = useNavigate();

  // AuthContext to set logged-in user globally
  const { setUser } = useContext(AuthContext);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true);   // Show loading spinner

    try {
      // Send login request to backend API
      const res = await API.post('/login', formData);

      // Create user object for global context
      const userData = {
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
        isAuthenticated: true,
      };

      // ✅ Save email in localStorage for use elsewhere (e.g., auto-fill in booking form)
      localStorage.setItem("userEmail", res.data.email);

      // Set user in global auth context
      setUser(userData);

      // Show success toast
      toast.success('Login successful');

      // Redirect based on user role
      if (res.data.role === 'user') {
        navigate('/my-bookings'); // You might want to correct this logic later
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      // Show error toast if login fails
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      // Stop loading spinner
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3 form-group">
            <label className='form-label'>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3 form-group">
            <label className='form-label'>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="mt-3 text-center">
            Already have an account? <NavLink to="/register">Register here</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
