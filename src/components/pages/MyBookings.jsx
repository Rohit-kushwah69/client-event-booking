import React, { useEffect, useState } from "react";
import API from "../../services/api";
import {
  BsCalendarDate,
  BsGeoAlt,
  BsCurrencyRupee,
  BsPersonCheck,
  BsEnvelope,
  BsTelephone,
  BsBookmarkStarFill,
  BsClockHistory,
} from "react-icons/bs";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) return;

      try {
        const res = await API.get(`/myBookings?email=${email}`);
        if (res.data.success) {
          setBookings(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateStr) => {
    return dateStr
      ? new Date(dateStr).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "N/A";
  };

  const getStatusBadge = (status) => {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return <span className="badge bg-warning text-dark">⏳ Pending</span>;
      case "confirmed":
        return <span className="badge bg-success">✅ Confirmed</span>;
      case "cancelled":
        return <span className="badge bg-danger">❌ Cancelled</span>;
      default:
        return <span className="badge bg-secondary">Unknown</span>;
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-primary fw-bold mb-4 d-flex align-items-center border-bottom pb-2">
        <BsBookmarkStarFill className="me-2" />
        My Event Bookings
      </h2>

      {bookings.length === 0 ? (
        <div className="alert alert-info">
          No bookings found for your account.
        </div>
      ) : (
        <div className="row">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="col-md-6 col-lg-4 mb-4 d-flex align-items-stretch"
            >
              <div
                className="card shadow border-0 w-100"
                style={{
                  background: "linear-gradient(135deg, #fdfdfd, #f0f8ff)",
                  borderRadius: "1rem",
                  transition: "0.3s ease",
                }}
              >
                <div className="card-body">
                  <h5 className="card-title text-dark fw-semibold mb-3">
                    🎫 {booking.eventTitle || "Untitled Event"}
                  </h5>

                  <ul className="list-unstyled text-muted small">
                    <li className="mb-2">
                      <BsCalendarDate className="me-2 text-primary" />
                      <strong>Date:</strong> {formatDate(booking.date)}
                    </li>
                    <li className="mb-2">
                      <BsGeoAlt className="me-2 text-danger" />
                      <strong>Location:</strong> {booking.location || "N/A"}
                    </li>
                    <li className="mb-2">
                      <BsCurrencyRupee className="me-2 text-success" />
                      <strong>Price:</strong> ₹{booking.price || 0}
                    </li>
                    <li className="mb-2">
                      <BsPersonCheck className="me-2 text-info" />
                      <strong>Seats:</strong> {booking.seats || 1}
                    </li>
                    <hr />

                    <li className="mb-2">
                      <strong>Name:</strong> {booking.name || "N/A"}
                    </li>
                    <li className="mb-2">
                      <BsEnvelope className="me-2 text-dark" />
                      <strong>Email:</strong> {booking.email}
                    </li>
                    <li className="mb-2">
                      <BsTelephone className="me-2 text-secondary" />
                      <strong>Phone:</strong> {booking.phone || "N/A"}
                    </li>
                    <li className="mb-2">
                      <BsClockHistory className="me-2 text-warning" />
                      <strong>Booked On:</strong>{" "}
                      {formatDate(booking.bookedOn)}
                    </li>
                  </ul>

                  <div className="mt-3">{getStatusBadge(booking.status)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
