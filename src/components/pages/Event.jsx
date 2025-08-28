import React, { useEffect, useState } from "react";
import "../../assets/event.css";
import { Link } from 'react-router-dom';
import API from "../../services/api";

const Event = () => {
  const [EventData, setEventData] = useState([]);

  const fetchingEvent = async () => {
    try {
      const res = await API.get('/eventDisplay');
      setEventData(res.data.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchingEvent();
  }, []);

  return (
    <div className="events-page bg-black text-white">

      {/* Hero Section with Direct Image */}
      <div className="hero-banner-direct position-relative text-white text-center">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1350&q=80"
          className="hero-img-direct"
          alt="Event Hero"
        />
        <div className="hero-overlay d-flex flex-column justify-content-center align-items-center text-center">
          <h1 className="display-3 fw-bold glow-text mb-3">Experience Top Events</h1>
          <p className="lead fs-4">Unforgettable moments, amazing vibes, and VIP experiences await.</p>
          <a href="#events" className="btn btn-lg btn-outline-light glow-button mt-3">Browse Events</a>
        </div>
      </div>

      {/* Events Section */}
      <section className="py-5 bg-black text-light" id="events">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 display-4 glow-text">Featured <span className="text-primary">Events</span></h2>
          <div className="row g-4">
            {EventData.map((event, i) => (
              <div className="col-lg-4 col-md-6" key={i}>
                <div className="vip-card border border-secondary shadow-sm h-100">
                  <div className="event-img-container">
                    <img
                      src={event.image.url}
                      className="event-img rounded-top"
                      alt={event.title}
                    />
                  </div>
                  <div className="p-3">
                    <h5 className="text-primary fw-bold">{event.title}</h5>
                    <p className="small text-light">{event.description.slice(0, 100)}...</p>
                    <ul className="list-unstyled small mb-3">
                      <li><i className="bi bi-geo-alt-fill text-danger me-2"></i>{event.location}</li>
                      <li><i className="bi bi-calendar-event text-warning me-2"></i>{new Date(event.date).toLocaleDateString()}</li>
                      <li><i className="bi bi-clock text-info me-2"></i>{event.time}</li>
                      <li><i className="bi bi-currency-rupee text-success me-2"></i>₹{event.price}</li>
                      <li><i className="bi bi-people-fill text-secondary me-2"></i>{event.bookedSeats}/{event.totalSeats} Booked</li>
                    </ul>
                    <Link to={`/eventDetails/${event._id}`} className="btn btn-outline-primary w-100 rounded-pill glow-button">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-5 bg-dark text-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold display-5">Why Choose <span className="text-primary">Our Events</span>?</h2>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-4 bg-gradient-dark border border-secondary rounded-4 shadow-sm">
                <i className="bi bi-stars display-4 text-warning mb-3"></i>
                <h5 className="fw-bold">VIP Access</h5>
                <p>Exclusive entry, backstage passes, and premium perks at every major event.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-gradient-dark border border-secondary rounded-4 shadow-sm">
                <i className="bi bi-shield-check display-4 text-success mb-3"></i>
                <h5 className="fw-bold">100% Secure Booking</h5>
                <p>Book with confidence using our secure and trusted booking platform.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-gradient-dark border border-secondary rounded-4 shadow-sm">
                <i className="bi bi-music-note-beamed display-4 text-info mb-3"></i>
                <h5 className="fw-bold">Ultimate Entertainment</h5>
                <p>From music to tech, experience diverse events curated for every passion.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-gradient-primary text-white text-center">
        <div className="container">
          <h2 className="display-4 fw-bold mb-3">Ready to Join the Excitement?</h2>
          <p className="lead">Explore upcoming events and reserve your spot now!</p>
          <a href="#events" className="btn btn-light btn-lg rounded-pill mt-3">Book Your Event</a>
        </div>
      </section>

    </div>
  );
};

export default Event;
