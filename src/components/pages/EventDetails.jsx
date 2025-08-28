import React, { useEffect, useState, useContext } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import API from "../../services/api";
import "../../assets/EventDetails.css";

const EventDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [booking, setBooking] = useState({
    name: "",
    email: user ? user.email : "",
    phone: "",
    seats: 1,
    description: ""
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await API.get(`/eventDisplay/${id}`);
        setEvent(res.data.data);
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [id]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      const modal = new window.bootstrap.Modal(document.getElementById("loginModal"));
      modal.show();
      return;
    }

    try {
      await API.post("/bookEvent", {
        eventId: id,
        ...booking,
      });
      alert("🎉 Booking successful!");
      setBooking({
        name: "",
        email: user?.email || "",
        phone: "",
        seats: 1,
        description: ""
      });
    } catch (err) {
      console.error("Booking error:", err);
      alert("Booking failed. Please try again.");
    }
  };
  const handleLogin = () => {
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    modal.hide(); // close modal manually
    navigate("/login"); // navigate to login
  };
  const handleRegister = () => {
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    modal.hide();
    navigate("/register");
  };

  if (loading) return <div className="text-center mt-5">Loading Event...</div>;
  if (!event) return <div className="text-danger text-center mt-5">Event not found.</div>;

  // Static gallery fallback if none exists
  event.gallery = event.gallery?.length
    ? event.gallery
    : [
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    ];

  return (
    <div className="event-details">
      {/* Hero */}
      <div className="hero-img-wrapper">
        <img
          src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1600&q=80"
          className="hero-img"
          alt="Event"
        />
        <div className="hero-overlay text-white text-center">
          <h1 className="display-5 fw-bold">{event.title}</h1>
          <p><i className="bi bi-geo-alt-fill me-2"></i>{event.location}</p>
        </div>
      </div>

      {/* Main */}
      <div className="container py-5">
        <div className="row g-5">
          {/* Left */}
          <div className="col-lg-8">
            <h3 className="section-heading">Event Overview</h3>
            <div className="row g-4 align-items-start">
              <div className="col-md-6">
                <p className="event-description">{event.description}</p>
                <ul className="mt-4">
                  <li><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</li>
                  <li><strong>Time:</strong> {event.time}</li>
                  <li><strong>Price:</strong> ₹{event.price}</li>
                  <li><strong>Seats:</strong> {event.totalSeats - event.bookedSeats} available</li>
                </ul>
              </div>
              <div className="col-md-6 dynamic-img-wrapper">
                <img src={event.image?.url} alt="Event" className="img-fluid rounded shadow" />
              </div>
            </div>

            {/* Gallery */}
            <h4 className="section-heading mt-5">Gallery</h4>
            <div className="row gallery">
              {event.gallery.map((img, index) => (
                <div className="col-md-4" key={index}>
                  <img src={img} alt={`gallery-${index}`} className="img-fluid mb-3 rounded shadow" />
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="map-wrapper mt-5">
              <h4 className="section-heading">Location</h4>
              <iframe
                title="Event Location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Right */}
          <div className="col-lg-4">
            <div className="event-booking-form">
              <h4>Book This Event</h4>
              <form onSubmit={handleBookingSubmit}>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Your Name"
                  value={booking.name}
                  onChange={handleBookingChange}
                  required
                />

                {/* Show email only if logged in */}
                {user && (
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={booking.email}
                    onChange={handleBookingChange}
                    required
                    disabled
                  />
                )}

                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Phone"
                  value={booking.phone}
                  onChange={handleBookingChange}
                  required
                />

                <input
                  type="number"
                  name="seats"
                  className="form-control"
                  placeholder="Number of Seats"
                  value={booking.seats}
                  onChange={handleBookingChange}
                  min="1"
                  max={event.totalSeats - event.bookedSeats}
                  required
                />

                <textarea
                  name="description"
                  className="form-control"
                  placeholder="Booking Description (optional)"
                  value={booking.description}
                  onChange={handleBookingChange}
                  rows={3}
                  required
                ></textarea>

                <button type="submit" className="btn btn-primary w-100 mt-3">
                  Confirm Booking
                </button>
              </form>
            </div>
            {/* Social Icons */}
            <div className="mt-4 social-icons">
              <h5 className="mb-3">Share This Event</h5>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-facebook"></i>
              </a>

              <a
                href={`https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram"></i>
              </a>

              <a
                href={`https://wa.me/?text=${encodeURIComponent("Check out this event: " + window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-whatsapp"></i>
              </a>

              <a
                href={`mailto:?subject=${encodeURIComponent("Check out this event")}&body=${encodeURIComponent("I thought you might be interested in this event: " + window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-envelope-fill"></i>
              </a>
            </div>


            {/* Login/Register Prompt */}
            {!user && (
              <div className="text-center mt-4">
                <p className="text-muted mb-2">Already have an account?</p>
                <NavLink to="/login" className="btn btn-outline-primary btn-sm me-2">Login</NavLink>
                <NavLink to="/register" className="btn btn-outline-success btn-sm">Register</NavLink>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Login Modal */}
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">Login Required</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <p className="text-muted mb-3">Please login or register to book this event.</p>
              <button className="btn btn-primary me-2" onClick={handleLogin}>
                Login
              </button>
              <button className="btn btn-success" onClick={handleRegister}>
                Register
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventDetails;
