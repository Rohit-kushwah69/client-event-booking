// import React from 'react';
// import '../../assets/footer.css'; // Link to the CSS below
// import { NavLink } from 'react-router-dom';


// function Footer() {
//     return (
//         <footer>
//             <div className="footer">
//                 <div className="container">
//                     <div className="row">

//                         <div className="col-md-4">
//                             <h3>Our Address</h3>
//                             <ul className="conta">
//                                 <li><i className="fa fa-map-marker" aria-hidden="true"></i> 123 BlueStay Road, Cityville</li>
//                                 <li><i style={{ fontSize: "20px" }} className="fa fa-mobile" aria-hidden="true"></i> +01 1234569540</li>
//                                 <li><i className="fa fa-envelope" aria-hidden="true"></i> <a href="mailto:demo@gmail.com">demo@gmail.com</a></li>
//                             </ul>
//                         </div>

//                         <div className="col-md-4">
//                             <h3>Menu Link</h3>
//                             <ul className="link_menu">
//                                 <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
//                                 <li><NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink></li>
//                                 <li><NavLink to="/rooms" className={({ isActive }) => isActive ? "active" : ""}>Rooms</NavLink></li>
//                                 {/* <li><NavLink to="/gallery" className={({ isActive }) => isActive ? "active" : ""}>Gallery</NavLink></li> */}
//                                 <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact Us</NavLink></li>
//                             </ul>
//                         </div>

//                         <div className="col-md-4">
//                             <h3>Contact Us</h3>
//                             <ul className="social_icon mt-2 d-flex justify-content-center align-items-center">
//                                 <li><a href="#"><i className="fa fa-facebook"></i></a></li>
//                                 <li><a href="#"><i className="fa fa-twitter"></i></a></li>
//                                 <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
//                                 <li><a href="#"><i className="fa fa-youtube-play"></i></a></li>
//                             </ul>
//                         </div>

//                     </div>
//                 </div>

//                 <div className="copyright">
//                     <div className="container">
//                         <p className='py-0'>
//                             © 2025 BlueStay Hotel. Design by <a href="https://html.design/">Arpit Mittal</a><br />
//                             Distributed by <a href="https://themewagon.com/" target="_blank" rel="noreferrer">PNINFOSYS</a>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// }

// export default Footer;


import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className=" text-white pt-5 pb-4 mt-auto">
            <div className="container">
                <div className="row text-center text-md-start">
                    {/* Left - Logo and tagline */}
                    <div className="col-md-4 mb-4">
                        <img
                            src="https://pninfosys.com/assets/colorlogo-BagIKm6w.png"
                            alt="PNINFOSYS Logo"
                            style={{ height: '60px', backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}
                        />
                        <p className="mt-3">
                            PNINFOSYS - Learn | Practice | Grow
                        </p>
                    </div>

                    {/* Center - Navigation menu */}
                    <div className="col-md-4 mb-4">
                        <h5 className="fw-bold mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                            <li><Link to="/courses" className="text-white text-decoration-none">Courses</Link></li>
                            <li><Link to="/login" className="text-white text-decoration-none">Login</Link></li>
                            <li><Link to="/mybookings" className="text-white text-decoration-none">My Bookings</Link></li>
                        </ul>
                    </div>

                    {/* Right - Contact or Social */}
                    <div className="col-md-4 mb-4">
                        <h5 className="fw-bold mb-3">Contact Us</h5>
                        <p className="mb-1"><i className="bi bi-envelope-fill me-2"></i> info@pninfosys.com</p>
                        <p><i className="bi bi-telephone-fill me-2"></i> +91 7000846823</p>
                    </div>
                </div>

                <hr className="border-light" />
                <p className="text-center mb-0">&copy; 2025 PNINFOSYS. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;