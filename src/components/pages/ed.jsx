// VIP Event Details Page for Event Booking System
// Theme: Blue / Black / White (Bootstrap 5 compatible)
// Features:
// - Hero banner with dynamic background from event image
// - Breadcrumb navigation
// - Event meta badges (category, status, date)
// - Seat availability + progress bar + dynamic color thresholds
// - Pricing panel with quantity selector + total price calc
// - Sticky booking sidebar (on lg+) / inline CTA (on sm)
// - Tabbed content: About, Schedule, Venue Map, FAQs, Cancellation Policy
// - Optional Gallery carousel (thumbnails -> modal lightbox)
// - Organizer / Host info card
// - Social share buttons
// - Related Events grid at bottom
// - Responsive + accessible
//
// NOTE: This file shows a self-contained demo. In production,
//   - Replace mock data with API data (fetch by id).
//   - Replace inline icon emoji with proper icon lib (ex: Bootstrap Icons, Lucide, FontAwesome).
//   - Replace Google Maps key & query.
//   - Wire up booking handler to backend.
//
// Usage:
// <Route path="/event/:id" element={<EventDetailsVIP />} />
// Requires Bootstrap 5 CSS/JS loaded globally.
// Be sure to include the CSS from the bottom of this file in `event-details.css`
// and import: import '../../assets/event-details.css';

import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../../assets/event-details.css';

/*******************************\
 * Mock Data (Replace w/ API)   *
\*******************************/
const EVENTS = [
  {
    id: 1,
    title: "Neon Night Party",
    description: "Join us for a dazzling night full of lights, music, and fun. Dance the night away with electrifying beats and vibrant colors.",
    longDescription: `Expect immersive lighting zones, live DJ sets, UV paint booths, and an after-midnight surprise act. Dress neon, glow harder!\n\n**Age:** 18+ | **Dress Code:** Neon / White / Glow-in-the-dark.`,
    location: "Mumbai, India",
    venueName: "GlowDome Arena",
    date: "2025-08-15",
    endDate: "2025-08-16",
    time: "8:00 PM",
    endTime: "2:00 AM",
    price: 999,
    currency: "INR",
    totalSeats: 100,
    bookedSeats: 75,
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80",
      "https://images.unsplash.com/photo-1550534791-2677533605a1?q=80",
      "https://images.unsplash.com/photo-1548438294-1ad5d5a2c6fd?q=80",
      "https://images.unsplash.com/photo-1529626491487-3f74d8032c61?q=80"
    ],
    category: "Party",
    tags: ["Nightlife", "DJ", "Glow", "Dance"],
    status: "Upcoming",
    organizer: {
      name: "GlowWave Entertainment",
      logo: "https://images.unsplash.com/photo-1535930749574-1399327ce78f?q=80",
      contactEmail: "bookings@glowwave.in",
      contactPhone: "+91-98765-43210",
      website: "https://glowwave.example.com"
    },
    schedule: [
      { time: "8:00 PM", title: "Doors Open & Registration" },
      { time: "9:00 PM", title: "Opening DJ Set" },
      { time: "11:30 PM", title: "UV Paint Party" },
      { time: "12:30 AM", title: "Special Guest Performance" },
      { time: "2:00 AM", title: "Event Close" }
    ],
    faqs: [
      { q: "Is re-entry allowed?", a: "Re-entry is not allowed once scanned in." },
      { q: "Age limit?", a: "18+ only. ID required." },
      { q: "Can I buy tickets at the door?", a: "Subject to availability; online booking recommended." }
    ],
    cancelPolicy: "Tickets are non-refundable but are transferable up to 48 hours before event start. Contact support for transfer.",
    mapQuery: "GlowDome+Arena+Mumbai",
  },
  {
    id: 2,
    title: "Tech Conference 2025",
    description: "Experience the future with talks from industry leaders. Network, learn, and grow in the biggest tech meetup of the year.",
    longDescription: `Two-day deep dive across AI, Cloud, DevOps, Security & Startups. Hands-on workshops, investor sessions & hiring lounges.`,
    location: "Bangalore, India",
    venueName: "Bangalore Convention Centre",
    date: "2025-09-10",
    endDate: "2025-09-11",
    time: "10:00 AM",
    endTime: "6:00 PM",
    price: 1499,
    currency: "INR",
    totalSeats: 200,
    bookedSeats: 130,
    image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde16?q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80",
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80"
    ],
    category: "Conference",
    tags: ["Tech", "AI", "Developers", "Networking"],
    status: "Upcoming",
    organizer: {
      name: "NextGen Tech Events",
      logo: "https://images.unsplash.com/photo-1521790945508-bf2a36314e85?q=80",
      contactEmail: "hello@nextgentech.events",
      contactPhone: "+91-99887-77665",
      website: "https://nextgentech.example.com"
    },
    schedule: [
      { time: "10:00 AM", title: "Keynote: Future of AI" },
      { time: "12:00 PM", title: "Cloud Native Panel" },
      { time: "2:00 PM", title: "DevOps Workshop" },
      { time: "4:00 PM", title: "Startup Pitch" },
      { time: "5:30 PM", title: "Networking Mixer" }
    ],
    faqs: [
      { q: "Are meals included?", a: "Lunch & tea breaks included in full pass." },
      { q: "Will sessions be recorded?", a: "Yes, recordings available to registered attendees." }
    ],
    cancelPolicy: "Full refund up to 7 days before event. 50% refund within 3 days. No refund <24h.",
    mapQuery: "Bangalore+Convention+Centre",
  },
  {
    id: 3,
    title: "Art & Music Fest",
    description: "A celebration of creativity through music and visual art. Discover local talents and immerse yourself in culture.",
    longDescription: `Outdoor art installations, indie bands, craft market, food pop-ups & live mural sessions. Family friendly!`,
    location: "Delhi, India",
    venueName: "ArtGrounds Park",
    date: "2025-10-05",
    endDate: "2025-10-05",
    time: "5:00 PM",
    endTime: "11:00 PM",
    price: 799,
    currency: "INR",
    totalSeats: 150,
    bookedSeats: 90,
    image: "https://images.unsplash.com/photo-1515169067865-5387f0c92d13?q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80",
      "https://images.unsplash.com/photo-1514302240736-b1fee5985889?q=80",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80"
    ],
    category: "Festival",
    tags: ["Art", "Music", "Outdoor", "Family"],
    status: "Upcoming",
    organizer: {
      name: "Culture Collective",
      logo: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80",
      contactEmail: "contact@culturecollective.in",
      contactPhone: "+91-90909-11122",
      website: "https://culturecollective.example.com"
    },
    schedule: [
      { time: "5:00 PM", title: "Gates Open" },
      { time: "6:00 PM", title: "Folk Fusion Band" },
      { time: "7:30 PM", title: "Live Art Battle" },
      { time: "9:00 PM", title: "Indie Rock Headliner" },
      { time: "10:30 PM", title: "Closing Fire Art Show" }
    ],
    faqs: [
      { q: "Are kids allowed?", a: "Yes! Under 12 enter free with adult." },
      { q: "Is outside food allowed?", a: "No outside food; vendors on-site." }
    ],
    cancelPolicy: "Rain or shine; no refunds unless event cancelled by organizer.",
    mapQuery: "ArtGrounds+Park+Delhi",
  }
];

/*************************************************\
 * Helper Components                              *
 *************************************************/

const Breadcrumb = ({ event }) => (
  <nav className="vip-breadcrumb" aria-label="breadcrumb">
    <ol className="breadcrumb mb-0">
      <li className="breadcrumb-item"><Link to="/">Home</Link></li>
      <li className="breadcrumb-item"><Link to="/events">Events</Link></li>
      <li className="breadcrumb-item active" aria-current="page">{event.title}</li>
    </ol>
  </nav>
);

const MetaBadges = ({ category, status, date }) => (
  <div className="vip-meta-badges d-flex flex-wrap gap-2 mt-3">
    <span className="badge bg-primary">{category}</span>
    <span className={`badge ${status === 'Upcoming' ? 'bg-success' : 'bg-secondary'}`}>{status}</span>
    <span className="badge bg-dark">{new Date(date).toLocaleDateString()}</span>
  </div>
);

const SeatProgress = ({ booked, total }) => {
  const pct = Math.round((booked / total) * 100);
  let barClass = 'bg-primary';
  if (pct >= 90) barClass = 'bg-danger';
  else if (pct >= 70) barClass = 'bg-warning text-dark';
  return (
    <div className="vip-seat-progress">
      <div className="d-flex justify-content-between small mb-1">
        <span>Booked: {booked}</span>
        <span>Available: {total - booked}</span>
      </div>
      <div className="progress" style={{ height: '20px' }}>
        <div className={`progress-bar ${barClass}`} style={{ width: `${pct}%` }}>{pct}%</div>
      </div>
    </div>
  );
};

const OrganizerCard = ({ organizer }) => (
  <div className="vip-organizer-card card shadow-sm border-0 mt-4">
    <div className="card-body d-flex align-items-center gap-3">
      {organizer.logo && (
        <img src={organizer.logo} alt={organizer.name} className="vip-organizer-logo rounded" />
      )}
      <div>
        <h6 className="mb-1">Organized by</h6>
        <h5 className="mb-2 text-primary">{organizer.name}</h5>
        {organizer.contactEmail && (
          <p className="mb-1 small"><strong>Email:</strong> {organizer.contactEmail}</p>
        )}
        {organizer.contactPhone && (
          <p className="mb-0 small"><strong>Phone:</strong> {organizer.contactPhone}</p>
        )}
      </div>
    </div>
    {organizer.website && (
      <div className="card-footer bg-white border-0 text-end">
        <a href={organizer.website} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">Visit Website</a>
      </div>
    )}
  </div>
);

const ScheduleList = ({ schedule }) => (
  <ul className="vip-schedule list-group list-group-flush">
    {schedule.map((item, i) => (
      <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
        <span>{item.title}</span>
        <span className="badge bg-primary rounded-pill">{item.time}</span>
      </li>
    ))}
  </ul>
);

const FAQsAccordion = ({ faqs, idBase = 'faq' }) => (
  <div className="accordion" id={`${idBase}-accordion`}>
    {faqs.map((f, i) => {
      const headingId = `${idBase}-heading-${i}`;
      const collapseId = `${idBase}-collapse-${i}`;
      return (
        <div className="accordion-item" key={i}>
          <h2 className="accordion-header" id={headingId}>
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${collapseId}`} aria-expanded="false" aria-controls={collapseId}>
              {f.q}
            </button>
          </h2>
          <div id={collapseId} className="accordion-collapse collapse" aria-labelledby={headingId} data-bs-parent={`#${idBase}-accordion`}>
            <div className="accordion-body">{f.a}</div>
          </div>
        </div>
      );
    })}
  </div>
);

const GalleryGrid = ({ images, onOpen }) => (
  <div className="row g-3 vip-gallery-grid">
    {images.map((src, i) => (
      <div key={i} className="col-6 col-md-3">
        <button type="button" className="vip-gallery-thumb-btn" onClick={() => onOpen(i)}>
          <img src={src} alt={`Gallery ${i + 1}`} className="img-fluid rounded" />
        </button>
      </div>
    ))}
  </div>
);

const GalleryLightbox = ({ images, startIndex, onClose }) => {
  const [index, setIndex] = useState(startIndex);
  const prev = () => setIndex(i => (i - 1 + images.length) % images.length);
  const next = () => setIndex(i => (i + 1) % images.length);
  if (index < 0) return null;
  return (
    <div className="vip-lightbox-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="vip-lightbox-content" onClick={e => e.stopPropagation()}>
        <img src={images[index]} alt="Gallery Large" className="img-fluid" />
        <button type="button" className="vip-lightbox-close" onClick={onClose}>×</button>
        <button type="button" className="vip-lightbox-prev" onClick={prev}>‹</button>
        <button type="button" className="vip-lightbox-next" onClick={next}>›</button>
      </div>
    </div>
  );
};

const VenueMap = ({ query }) => (
  <div className="vip-map-wrapper ratio ratio-16x9">
    <iframe
      title="Venue Map"
      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=${encodeURIComponent(query)}`}
      allowFullScreen
      loading="lazy"
    />
  </div>
);

/*************************************************\
 * Main Component                                 *
 *************************************************/

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = useMemo(() => EVENTS.find(e => e.id === Number(id)), [id]);

  const [qty, setQty] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  if (!event) {
    return (
      <div className="container py-5 text-center">
        <p className="mb-4">Event not found.</p>
        <button className="btn btn-primary" onClick={() => navigate('/events')}>Back to Events</button>
      </div>
    );
  }

  const remainingSeats = event.totalSeats - event.bookedSeats;
  const canBook = remainingSeats > 0;
  const subtotal = qty * event.price;

  const handleBook = () => {
    // TODO: Replace with actual booking logic, e.g., navigate(`/book/${event.id}?qty=${qty}`) or API call.
    navigate(`/bookings?event=${event.id}&qty=${qty}`);
  };

  const handleQtyChange = (e) => {
    const val = Number(e.target.value);
    if (val >= 1 && val <= remainingSeats) setQty(val);
  };

  return (
    <div className="event-details-vip-page">
      {/* Hero */}
      <div
        className="vip-event-hero d-flex align-items-center text-white"
        style={{ backgroundImage: `url(${event.image})` }}
      >
        <div className="vip-event-hero-overlay"></div>
        <div className="container position-relative">
          <Breadcrumb event={event} />
          <h1 className="vip-event-title display-5 fw-bold mt-3">{event.title}</h1>
          <p className="lead vip-event-subtitle">{event.description}</p>
          <MetaBadges category={event.category} status={event.status} date={event.date} />
        </div>
      </div>

      {/* Content */}
      <div className="container py-5">
        <div className="row g-5">
          {/* Main Col */}
          <div className="col-lg-8">
            {/* About */}
            <div id="section-about" className="vip-section-card card mb-5 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="mb-3">About this Event</h3>
                <div className="vip-markdown" dangerouslySetInnerHTML={{ __html: mdToHtml(event.longDescription) }} />
              </div>
            </div>

            {/* Schedule */}
            {event.schedule?.length > 0 && (
              <div id="section-schedule" className="vip-section-card card mb-5 border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="mb-3">Event Schedule</h3>
                  <ScheduleList schedule={event.schedule} />
                </div>
              </div>
            )}

            {/* Venue */}
            <div id="section-venue" className="vip-section-card card mb-5 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="mb-3">Venue & Location</h3>
                <p className="mb-2"><strong>Venue:</strong> {event.venueName || 'TBA'}</p>
                <p className="mb-4"><strong>Address:</strong> {event.location}</p>
                <VenueMap query={event.mapQuery || event.location} />
              </div>
            </div>

            {/* Gallery */}
            {event.gallery?.length > 0 && (
              <div id="section-gallery" className="vip-section-card card mb-5 border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="mb-3">Gallery</h3>
                  <GalleryGrid images={event.gallery} onOpen={setLightboxIndex} />
                </div>
              </div>
            )}

            {/* FAQs */}
            {event.faqs?.length > 0 && (
              <div id="section-faqs" className="vip-section-card card mb-5 border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="mb-3">FAQs</h3>
                  <FAQsAccordion faqs={event.faqs} idBase={`faq-${event.id}`} />
                </div>
              </div>
            )}

            {/* Cancellation Policy */}
            {event.cancelPolicy && (
              <div id="section-cancel" className="vip-section-card card mb-5 border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="mb-3">Cancellation & Refund Policy</h3>
                  <p className="mb-0">{event.cancelPolicy}</p>
                </div>
              </div>
            )}

            {/* Organizer */}
            {event.organizer && (
              <div id="section-organizer" className="vip-section-card card mb-5 border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="mb-3">Organizer</h3>
                  <OrganizerCard organizer={event.organizer} />
                </div>
              </div>
            )}

            {/* Share */}
            <div id="section-share" className="vip-section-card card mb-5 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="mb-3">Share this Event</h3>
                <div className="d-flex gap-2 flex-wrap">
                  <ShareButton label="WhatsApp" url={window.location.href} network="whatsapp" />
                  <ShareButton label="Facebook" url={window.location.href} network="facebook" />
                  <ShareButton label="Twitter" url={window.location.href} network="twitter" />
                  <ShareButton label="LinkedIn" url={window.location.href} network="linkedin" />
                  <ShareButton label="Copy Link" url={window.location.href} network="copy" />
                </div>
              </div>
            </div>

            {/* Related Events */}
            <RelatedEvents currentId={event.id} />
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="vip-sticky-sidebar">
              <div className="vip-book-card card shadow border-0">
                <div className="card-body">
                  <h4 className="mb-3">Book Tickets</h4>
                  <p className="mb-1"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()} {event.endDate && event.endDate !== event.date ? `- ${new Date(event.endDate).toLocaleDateString()}` : ''}</p>
                  <p className="mb-1"><strong>Time:</strong> {event.time}{event.endTime ? ` – ${event.endTime}` : ''}</p>
                  <p className="mb-1"><strong>Price:</strong> ₹{event.price} / Seat</p>
                  <SeatProgress booked={event.bookedSeats} total={event.totalSeats} />

                  {/* Qty Selector */}
                  <div className="mt-4">
                    <label htmlFor="qty" className="form-label">Select Quantity</label>
                    <input
                      id="qty"
                      type="number"
                      min="1"
                      max={remainingSeats}
                      value={qty}
                      onChange={handleQtyChange}
                      className="form-control"
                      disabled={!canBook}
                    />
                    <small className="text-muted">{remainingSeats} seat{remainingSeats !== 1 ? 's' : ''} left.</small>
                  </div>

                  {/* Subtotal */}
                  <div className="d-flex justify-content-between align-items-center mt-3 fw-semibold">
                    <span>Total:</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary w-100 mt-3"
                    disabled={!canBook}
                    onClick={handleBook}
                  >
                    {canBook ? 'Proceed to Book' : 'Sold Out'}
                  </button>
                </div>
              </div>

              {/* Quick Nav */}
              <nav className="vip-section-nav card mt-4 shadow-sm border-0 d-none d-lg-block">
                <div className="card-body p-2">
                  <ul className="nav flex-column small">
                    <li className="nav-item"><a className="nav-link" href="#section-about">About</a></li>
                    {event.schedule?.length > 0 && <li className="nav-item"><a className="nav-link" href="#section-schedule">Schedule</a></li>}
                    <li className="nav-item"><a className="nav-link" href="#section-venue">Venue</a></li>
                    {event.gallery?.length > 0 && <li className="nav-item"><a className="nav-link" href="#section-gallery">Gallery</a></li>}
                    {event.faqs?.length > 0 && <li className="nav-item"><a className="nav-link" href="#section-faqs">FAQs</a></li>}
                    {event.cancelPolicy && <li className="nav-item"><a className="nav-link" href="#section-cancel">Cancellation</a></li>}
                    {event.organizer && <li className="nav-item"><a className="nav-link" href="#section-organizer">Organizer</a></li>}
                    <li className="nav-item"><a className="nav-link" href="#section-share">Share</a></li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex >= 0 && (
        <GalleryLightbox
          images={event.gallery}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
        />
      )}
    </div>
  );
};

/*************************************************\
 * Share Button Utility                           *
 *************************************************/
const ShareButton = ({ label, url, network }) => {
  const share = () => {
    let shareUrl = url;
    const encoded = encodeURIComponent(url);
    switch (network) {
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encoded}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encoded}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`;
        break;
      case 'copy':
        navigator.clipboard?.writeText(url);
        alert('Link copied!');
        return;
      default:
        break;
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };
  return (
    <button type="button" onClick={share} className="btn btn-outline-primary btn-sm">
      {label}
    </button>
  );
};

/*************************************************\
 * Related Events                                 *
 *************************************************/
const RelatedEvents = ({ currentId }) => {
  const related = EVENTS.filter(e => e.id !== currentId).slice(0, 3);
  if (related.length === 0) return null;
  return (
    <div className="vip-related-events mt-5">
      <h3 className="mb-4">You Might Also Like</h3>
      <div className="row g-4">
        {related.map(ev => (
          <div key={ev.id} className="col-md-4">
            <div className="card h-100 border-0 shadow-sm vip-related-card">
              <img src={ev.image} alt={ev.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title text-primary">{ev.title}</h5>
                <p className="card-text small text-muted">{ev.location}</p>
                <p className="card-text small mb-2"><strong>Date:</strong> {new Date(ev.date).toLocaleDateString()}</p>
              </div>
              <div className="card-footer bg-white border-0 text-center">
                <Link to={`/event/${ev.id}`} className="btn btn-outline-primary btn-sm w-100">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/*************************************************\
 * Minimal Markdown -> HTML helper (VERY basic)   *
 *************************************************/
function mdToHtml(md = '') {
  // Minimal conversion: line breaks, **bold**, *italics*, inline code `code`
  let html = md
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>');
  return html;
}
export default EventDetails;



//////////////////////////////////////////////////////////////////////////////////////////
import React from "react";
import "../../assets/eventDetails.css"; // Include the matching CSS below
import API from "../../services/api";

const event = {
  title: "Tech Conference 2025",
  description:
    "Join us for an immersive tech experience featuring leading speakers, live demos, and workshops on AI, blockchain, and cloud computing.",
  date: "2025-08-15",
  time: "10:00 AM",
  location: "Grand Hall, Bangalore",
  price: 999,
  totalSeats: 300,
  bookedSeats: 125,
  heroImage:
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
  image: {
    url: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1600&q=80",
  },
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=800&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=800&q=80",
    },
  ],
  organizer: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+91-9876543210",
  },
  faqs: [
    {
      question: "Is parking available?",
      answer: "Yes, ample parking is available at the venue.",
    },
    {
      question: "Are meals included?",
      answer: "Lunch and refreshments will be provided during the event.",
    },
  ],
  mapLocation: "Grand Hall, Bangalore",
};

const EventDetails = () => {




  return (
    <div className="event-details-page bg-black text-white">
      {/* Hero Section */}
      <div className="hero-section position-relative text-white text-center">
        <img
          src={event.heroImage}
          className="w-100 hero-img"
          alt="Event Hero"
        />
        <div className="hero-overlay position-absolute top-50 start-50 translate-middle">
          <h1 className="display-4 fw-bold">{event.title}</h1>
          <p className="lead">{event.location}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        <div className="row g-5">
          {/* Left Column */}
          <div className="col-md-8">
            {/* Main Image */}
            <img
              src={event.image.url}
              alt="Event Detail"
              className="img-fluid rounded mb-4 detail-img"
            />

            <h3 className="text-primary">{event.title}</h3>
            <p>{event.description}</p>
            <ul className="list-unstyled fs-5 mb-4">
              <li><i className="bi bi-calendar-event text-warning me-2" /> {new Date(event.date).toDateString()}</li>
              <li><i className="bi bi-clock text-info me-2" /> {event.time}</li>
              <li><i className="bi bi-geo-alt text-danger me-2" /> {event.location}</li>
              <li><i className="bi bi-currency-rupee text-success me-2" /> ₹{event.price}</li>
              <li><i className="bi bi-people-fill text-secondary me-2" /> {event.bookedSeats}/{event.totalSeats} Seats Booked</li>
            </ul>

            {/* Gallery */}
            <h4 className="text-primary mb-3">Event Gallery</h4>
            <div className="row g-3 mb-5">
              {event.gallery.map((img, i) => (
                <div className="col-md-4" key={i}>
                  <img
                    src={img.url}
                    alt={`Gallery ${i + 1}`}
                    className="img-fluid rounded gallery-img"
                  />
                </div>
              ))}
            </div>

            {/* FAQs */}
            {event.faqs.length > 0 && (
              <>
                <h4 className="text-primary mb-3">FAQs</h4>
                <div className="accordion accordion-flush" id="faqAccordion">
                  {event.faqs.map((faq, i) => (
                    <div className="accordion-item bg-dark text-white" key={i}>
                      <h2 className="accordion-header" id={`heading${i}`}>
                        <button
                          className="accordion-button collapsed bg-dark text-white"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#faq${i}`}
                          aria-expanded="false"
                          aria-controls={`faq${i}`}
                        >
                          {faq.question}
                        </button>
                      </h2>
                      <div
                        id={`faq${i}`}
                        className="accordion-collapse collapse"
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body">{faq.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Map Embed */}
            {event.mapLocation && (
              <div className="mt-5">
                <h4 className="text-primary mb-3">Event Location</h4>
                <div className="ratio ratio-16x9">
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      event.mapLocation
                    )}&output=embed`}
                    title="Google Maps"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-md-4">
            <div className="booking-box bg-dark p-4 rounded border border-secondary">
              <h4 className="mb-3">Book Your Seat</h4>
              <p><strong>Price:</strong> ₹{event.price}</p>
              <p><strong>Available:</strong> {event.totalSeats - event.bookedSeats} Seats</p>

              {/* ✅ Button enabled and functional */}
              <button
                className="btn btn-primary w-100"
                onClick={() => alert("Booking successful! (Demo)")}
              >
                Book Now
              </button>

              <hr className="text-secondary my-4" />
              <h5>Organizer Info</h5>
              <p className="mb-1"><strong>Name:</strong> {event.organizer.name}</p>
              <p className="mb-1"><strong>Email:</strong> {event.organizer.email}</p>
              <p><strong>Phone:</strong> {event.organizer.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;










 {/* const [EventData, setEventData] = useState([])

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
    }, []) */}















    import React, { useEffect, useState } from "react";
import API from "../../../services/api";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [allBookings, setAllBookings] = useState([]);

  // Fetch Events
  const fetchEvents = async () => {
    try {
      const res = await API.get("/eventDisplay");
      setEvents(res.data.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  // Fetch All Bookings
  const fetchAllBookings = async () => {
    try {
      const res = await API.get("/allBookings");
      setAllBookings(res.data.data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  // Delete Event
  const handleDelete = async (id) => {
    try {
      await API.delete(`/eventDelete/${id}`);
      fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchAllBookings();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Manage Events</h3>
      <button className="btn btn-success mb-3">+ Add New Event</button>

      <table className="table table-bordered table-striped">
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
              <td>{new Date(event.date).toISOString().split("T")[0]}</td>
              <td>{event.time}</td>
              <td>
                <img src={event.image} alt="" height="60" />
              </td>
              <td>₹{event.price}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(event._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr className="my-4" />

      <h4>All Event Bookings</h4>
      <table className="table table-bordered table-striped mt-3">
        <thead className="table-info">
          <tr>
            <th>#</th>
            <th>Event</th>
            <th>User</th>
            <th>Email</th>
            <th>Seats</th>
            <th>Booked On</th>
            <th>Price</th>
            <th>Status</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {allBookings.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center">No bookings found.</td>
            </tr>
          ) : (
            allBookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.eventTitle}</td>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.seats}</td>
                <td>{new Date(booking.bookedOn).toLocaleDateString()}</td>
                <td>₹{booking.price}</td>
                <td>{booking.status}</td>
                <td>{booking.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
