import React, { useEffect, useState } from 'react';
import API from '../../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    time: '',
    date: '',
    price: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await API.get('/eventDisplay');
      setEvents(res.data.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await API.get('/allBookings');
      setBookings(res.data.data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchBookings();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddEvent = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      await API.post('/eventInsert', data);
      toast.success('Event added successfully!');
      document.getElementById('closeModalBtn')?.click();
      setFormData({
        title: '',
        description: '',
        location: '',
        time: '',
        date: '',
        price: '',
        image: ''
      });
      fetchEvents();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add event!');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await API.delete(`/eventDelete/${id}`);
        toast.success("Event deleted successfully!");
        setEvents(events.filter((e) => e._id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
        toast.error("Failed to delete event.");
      }
    }
  };

  return (
    <div className="container py-5">
      <ToastContainer />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <img src="https://pninfosys.com/assets/colorlogo-BagIKm6w.png" alt="Logo" style={{ height: '50px' }} />
      </div>

      {/* Events Section */}
      <div className="mb-5">
        <h4>Manage Events</h4>
        <button className="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#addEventModal">
          + Add New Event
        </button>

        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Image</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event._id}>
                <td>{index + 1}</td>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{event.location}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>{event.image && <img src={event.image.url} alt="" width="80" />}</td>
                <td>₹{event.price}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteEvent(event._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Event Modal */}
      <div className="modal fade" id="addEventModal" tabIndex="-1" aria-labelledby="addEventModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addEventModalLabel">Add New Event</h5>
              <button type="button" className="btn-close" id="closeModalBtn" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {["title", "description", "location", "date", "time", "price"].map((field) => (
                <div className="mb-2" key={field}>
                  <label className="form-label text-capitalize">{field}</label>
                  <input
                    type={field === "price" ? "number" : field === "date" ? "date" : "text"}
                    className="form-control"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="mb-2">
                <label>Image</label>
                <input type="file" className="form-control" name="image" onChange={handleChange} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleAddEvent} disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Adding...
                  </>
                ) : (
                  'Add Event'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Section */}
      <hr className="my-5" />
      <div>
        <h4>All Event Bookings</h4>
        <table className="table table-bordered table-striped">
          <thead className="table-info">
            <tr>
              <th>#</th>
              <th>Booking ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Seats</th>
              <th>Booked On</th>
              <th>Price</th>
              <th>Status</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking._id}</td>
                <td>{booking.name || booking.user?.name || 'N/A'}</td>
                <td>{booking.email || booking.user?.email || 'N/A'}</td>
                <td>{booking.phone || booking.user?.phone || 'N/A'}</td>
                <td>{booking.location || booking.user?.location || 'N/A'}</td>
                <td>{booking.seats}</td>
                <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                <td>₹{booking.event?.price || booking.price || 'N/A'}</td>
                <td>{booking.status || 'Pending'}</td>
                <td>{booking.description || booking.user?.description || 'N/A'}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default AdminDashboard;
