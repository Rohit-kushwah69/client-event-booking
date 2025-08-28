import React, { useEffect, useState } from "react";
import "../../assets/custom.css";
import { Link } from 'react-router-dom';
import API from "../../services/api";

const Home = () => {

    const [EventData, setEventData] = useState([])

    const fetchingEvent = async () => {
        try {
            const res = await API.get('/eventdisplay')
            setEventData(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchingEvent()
    }, [])

    return (
        <div className="main-layout bg-white">
            {/* 🌟 Hero Auto-Sliding Carousel */}

            <section
                id="heroCarousel"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
                data-bs-interval="4000" // Auto-slide every 4 seconds
            >
                <div className="carousel-inner">

                    {/* Slide 1 */}
                    <div className="carousel-item active">
                        <div className="zoom-wrapper">
                            <img
                                src="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg"
                                className="d-block w-100 zooming-image"
                                alt="Wedding Event"
                            />
                        </div>
                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center h-100">
                            <h1 className="display-4 fw-bold text-white text-shadow">
                                Welcome to <span className="text-primary">BlueStay Events</span>
                            </h1>
                            <p className="lead text-white">Where Every Wedding Shines in Style</p>
                            <a href="#events" className="btn btn-primary mt-3 px-4 py-2 rounded-pill shadow-lg">
                                Book Your Event
                            </a>
                        </div>
                    </div>

                    {/* Slide 2 */}
                    <div className="carousel-item">
                        <div className="zoom-wrapper">
                            <img
                                src="https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg"
                                className="d-block w-100 zooming-image"
                                alt="Party Crowd"
                            />
                        </div>
                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center h-100">
                            <h1 className="display-4 fw-bold text-white text-shadow">
                                Experience <span className="text-primary">Unforgettable Parties</span>
                            </h1>
                            <p className="lead text-white">Let’s make your party the talk of the town!</p>
                            <a href="#events" className="btn btn-primary mt-3 px-4 py-2 rounded-pill shadow-lg">
                                Explore Now
                            </a>
                        </div>
                    </div>

                    {/* Slide 3 */}
                    <div className="carousel-item">
                        <div className="zoom-wrapper">
                            <img
                                src="https://images.pexels.com/photos/265987/pexels-photo-265987.jpeg"
                                className="d-block w-100 zooming-image"
                                alt="Corporate Conference"
                            />
                        </div>
                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center h-100">
                            <h1 className="display-4 fw-bold text-white text-shadow">
                                <span className="text-primary">Corporate Excellence</span> Delivered
                            </h1>
                            <p className="lead text-white">From conferences to product launches – we do it all.</p>
                            <a href="#events" className="btn btn-primary mt-3 px-4 py-2 rounded-pill shadow-lg">
                                Discover Events
                            </a>
                        </div>
                    </div>
                </div>

                {/* Carousel Controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </section>

            {/* 👋 About */}
            {/* 👋 Enhanced About Section */}
            <section className="py-5 bg-light" id="about">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right">
                            <img
                                src="https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg"
                                className="img-fluid rounded-4 shadow-lg"
                                alt="BlueStay Events"
                            />
                        </div>
                        <div className="col-lg-6" data-aos="fade-left">
                            <h2 className="fw-bold display-5 text-primary mb-3">
                                Experience Events Like Never Before
                            </h2>
                            <p className="text-muted fs-5">
                                At <span className="fw-semibold text-dark">BlueStay Events</span>, we turn your dreams into experiences. Whether it’s a glamorous wedding,
                                a vibrant music festival, or a sophisticated corporate evening — we ensure every detail is unforgettable.
                            </p>
                            <ul className="list-unstyled mt-4">
                                <li className="mb-2">
                                    ✅ Customized Themes & Décor
                                </li>
                                <li className="mb-2">
                                    ✅ World-Class Entertainment & Catering
                                </li>
                                <li className="mb-2">
                                    ✅ Venue Management & Full Logistics
                                </li>
                            </ul>
                            <a href="#services" className="btn btn-primary rounded-pill mt-3 px-4 py-2 shadow">
                                Explore Our Services
                            </a>
                        </div>
                    </div>
                </div>
            </section>


            {/* 🎯 Why Choose Us */}
            <section className="py-5 bg-white text-center">
                <div className="container">
                    <h2 className="mb-4 fw-bold text-dark">Why Choose BlueStay?</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <i className="bi bi-calendar2-check-fill text-primary fs-2"></i>
                            <h5 className="fw-semibold mt-3">Instant Online Booking</h5>
                            <p className="text-muted">Real-time availability, secure checkout, instant confirmation.</p>
                        </div>
                        <div className="col-md-4">
                            <i className="bi bi-gem text-primary fs-2"></i>
                            <h5 className="fw-semibold mt-3">Premium Events</h5>
                            <p className="text-muted">Only the best curated events in luxury, tech, music, and more.</p>
                        </div>
                        <div className="col-md-4">
                            <i className="bi bi-people-fill text-primary fs-2"></i>
                            <h5 className="fw-semibold mt-3">Trusted by Thousands</h5>
                            <p className="text-muted">Loved by event planners and attendees across India.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🌟 VIP Featured Events */}
            <section className="py-5 bg-dark text-light" id="events">
                <div className="container">
                    <h2 className="text-center fw-bold mb-5 display-4 text-white">
                        <i className="bi bi-stars me-2 text-warning"></i> Featured <span className="text-primary">Events</span>
                    </h2>
                    <div className="row g-5">
                        {EventData.map((event, i) => (
                            <div className="col-lg-4 col-md-6" key={i}>
                                <div className="vip-event-card glass-effect border-0 position-relative">
                                    {/* Badges */}
                                    <div className="position-absolute top-0 start-0 m-3">
                                        <span className="badge bg-gradient-primary px-3 py-2 fw-bold text-white">{event.category}</span>
                                    </div>
                                    <div className="position-absolute top-0 end-0 m-3">
                                        <span className={`badge px-3 py-2 fw-bold text-white bg-${event.status === "Upcoming" ? "success" : "secondary"}`}>
                                            {event.status}
                                        </span>
                                    </div>

                                    {/* Image */}
                                    <div className="overflow-hidden rounded-top">
                                        <img
                                            src={event.image.url}
                                            className="w-100 vip-event-img"
                                            alt={event.title}
                                            style={{ height: "230px", objectFit: "cover" }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <h5 className="fw-bold mb-2 text-primary">{event.title}</h5>
                                        <p className="text-light small">{event.description}</p>
                                        <ul className="list-unstyled text-light small mb-3">
                                            <li><i className="bi bi-geo-alt-fill me-2 text-danger"></i>{event.location}</li>
                                            <li><i className="bi bi-calendar-event-fill me-2 text-info"></i>{new Date(event.date).toLocaleDateString()}</li>
                                            <li><i className="bi bi-clock-fill me-2 text-warning"></i>{event.time}</li>
                                            <li><i className="bi bi-currency-rupee me-2 text-success"></i>{event.price}</li>
                                            <li><i className="bi bi-person-fill-check me-2 text-primary"></i>{event.bookedSeats}/{event.totalSeats} Seats Booked</li>
                                        </ul>
                                        <Link to={`/eventDetails/${event._id}`} className="btn btn-outline-primary w-100 rounded-pill glow-button">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* 📢 Testimonials */}
            <section className="py-5 bg-white">
                <div className="container">
                    <h2 className="text-center fw-bold mb-5">What Our Clients Say</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="p-4 border rounded shadow-sm">
                                <p>"Absolutely stunning wedding experience. BlueStay exceeded our expectations!"</p>
                                <h6 className="mt-3 mb-0">- Riya Mehta</h6>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4 border rounded shadow-sm">
                                <p>"The tech conference was seamless. Booking was simple and fast!"</p>
                                <h6 className="mt-3 mb-0">- Rajiv Kapoor</h6>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4 border rounded shadow-sm">
                                <p>"Amazing concert! Loved the music, venue, and the smooth entry process."</p>
                                <h6 className="mt-3 mb-0">- Anjali Rana</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🤝 Partners */}
            <section className="py-5 bg-light text-center">
                <div className="container">
                    <h2 className="fw-bold mb-4">Our Trusted Partners</h2>
                    <div className="d-flex justify-content-around flex-wrap">
                        {["airbnb", "amazon", "zoom", "microsoft", "swiggy"].map((logo, i) => (
                            <img
                                key={i}
                                src={`https://logo.clearbit.com/${logo}.com`}
                                alt={logo}
                                style={{ height: 40, margin: "10px 20px" }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* 📬 Newsletter */}
            <section className="py-5 bg-dark text-white text-center">
                <div className="container">
                    <h2 className="fw-bold">Stay Updated</h2>
                    <p>Subscribe to our newsletter for event updates and offers.</p>
                    <form className="row justify-content-center">
                        <div className="col-md-4">
                            <input type="email" className="form-control rounded-pill" placeholder="Enter your email" />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary rounded-pill px-4">Subscribe</button>
                        </div>
                    </form>
                </div>
            </section>

        </div>
    );
};

export default Home;
