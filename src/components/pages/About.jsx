import React from "react";
import "../../assets/about.css"; // Make sure this CSS file exists

const About = () => {
  return (
    <>
      {/* 🌟 Hero Section */}
      <section className="about-hero">
        <div className="overlay" />
        <div className="hero-content">
          <h1>Welcome to <span>BlueStay Events</span></h1>
          <p>Creating unforgettable experiences, one event at a time.</p>
        </div>
      </section>

      {/* 📝 About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-row">
            {/* Text Content */}
            <div className="about-text">
              <h2>Who We Are</h2>
              <p>
                <strong>BlueStay Events</strong> is your gateway to premium event experiences.
                From corporate meets and grand weddings to music festivals and private parties,
                we handle it all with creativity, precision, and flair.
              </p>
              <ul>
                <li>✔️ Over 1000+ events successfully executed</li>
                <li>✔️ Professional event designers and planners</li>
                <li>✔️ Hassle-free online booking system</li>
              </ul>
            </div>

            {/* Image */}
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=1200&auto=format&fit=crop"
                alt="Event celebration"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 💎 Why Choose Us */}
      <section className="about-features">
        <div className="container">
          <h2>Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h4>🎯 Tailored Experiences</h4>
              <p>Every event is customized to your vision with a creative touch.</p>
            </div>
            <div className="feature-card">
              <h4>🕒 On-Time Delivery</h4>
              <p>We’re known for precise planning and timely execution.</p>
            </div>
            <div className="feature-card">
              <h4>🌍 Global Reach</h4>
              <p>We manage both local and international scale events seamlessly.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
