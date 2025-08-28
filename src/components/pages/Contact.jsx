import React from 'react';
import '../../assets/contact.css'; // Optional custom styling

const ContactUs = () => {
  return (
    <>
      {/* Top Title Section */}
      <div
        className="contact-section d-flex align-items-center justify-content-center"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1661929519129-7a76946c1d38?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "scroll",
          minHeight: "300px",
          position: "relative",
          color: "#fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "-20%",
            width: "120%",
            height: "120%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        ></div>

        <div className="container text-center" style={{ zIndex: 2 }}>
          <h2 className="display-4 fw-bold">
            <span className="text-primary">Event </span>Enquiry
          </h2>
          <p className="lead text-white">Reach out to us for any event-related queries or bookings</p>
        </div>
      </div>

      {/* Contact Form + Map */}
      <div className="contact-section py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row g-4 align-items-stretch">
            {/* Form */}
            <div className="col-md-6">
              <form className="p-4 h-100 main_form">
                <div className='row'>
                  <div className="col-md-12 mb-3">
                    <input type="text" className="contactus" placeholder="Full Name" name="Name" required />
                  </div>
                  <div className="col-md-12 mb-3">
                    <input type="email" className="contactus" placeholder="Email Address" name="Email" required />
                  </div>
                  <div className="col-md-12 mb-3">
                    <input type="tel" className="contactus" placeholder="Phone Number" name="Phone" required />
                  </div>
                  <div className="col-md-12 mb-3">
                    <select className="contactus" name="EventType">
                      <option value="">Select Event Type</option>
                      <option value="conference">Conference</option>
                      <option value="concert">Concert</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-12 mb-3">
                    <textarea className="textarea" placeholder="Your Message or Event Details" rows="4" name="Message" required></textarea>
                  </div>
                  <div className='col-md-12'>
                    <button type="submit" className="send_btn">Submit Enquiry</button>
                  </div>
                </div>
              </form>
            </div>

            {/* Map */}
            <div className="col-md-6">
              <div className="height-pos overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Convention+Center+New+York"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  style={{ border: 0, minHeight: '400px' }}
                  title="Event Venue Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
