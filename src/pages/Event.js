import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { events } from '../data/EventData';

const ROWS = ['A', 'B', 'C', 'D', 'E'];
const COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8];

const DEFAULT_OCCUPIED_SEATS = [
  'A3', 'B2', 'B3', 'C4', 'D5', 'E2'
];

const formatPrice = (price) =>
  new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    maximumFractionDigits: 0,
  }).format(price);

function Event({ event: eventProp, onBookNow, onBack }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const activeEvent = useMemo(
    () =>
      eventProp ||
      events.find((item) => item.id === Number(id)),
    [eventProp, id]
  );

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketTier, setTicketTier] = useState('GA');
  const [quantity, setQuantity] = useState(1);
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');

  const occupiedSeats =
    activeEvent?.occupiedSeats || DEFAULT_OCCUPIED_SEATS;

  const gaPrice = Number(
    activeEvent?.priceGA ?? activeEvent?.price ?? 2500
  );

  const vipPrice = Number(
    activeEvent?.priceVIP ?? Math.round(gaPrice * 1.5)
  );

  const price = ticketTier === 'GA' ? gaPrice : vipPrice;

  const subtotal = price * selectedSeats.length;
  const fee = selectedSeats.length > 0
    ? Math.round(subtotal * 0.05)
    : 0;

  const total = subtotal + fee;

  useEffect(() => {
    setSelectedSeats([]);
    setTicketTier('GA');
    setQuantity(1);
    setBookingMessage('');
    setBookingStatus('');
  }, [id]);

  const changeQuantity = (value) => {
    const newQuantity = Math.max(1, Math.min(6, value));

    setQuantity(newQuantity);
    setSelectedSeats((previous) =>
      previous.slice(0, newQuantity)
    );
    setBookingMessage('');
    setBookingStatus('');
  };

  const toggleSeat = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;

    setSelectedSeats((previous) => {
      if (previous.includes(seatId)) {
        return previous.filter((seat) => seat !== seatId);
      }

      if (previous.length >= quantity) {
        setBookingMessage(
          `You can select a maximum of ${quantity} seat(s).`
        );
        setBookingStatus('error');
        return previous;
      }

      return [...previous, seatId];
    });

    setBookingMessage('');
    setBookingStatus('');
  };

  const getSeatStatus = (seatId) => {
    if (occupiedSeats.includes(seatId)) return 'occupied';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleBookNow = () => {
    if (selectedSeats.length !== quantity) {
      setBookingMessage(
        `Please select all ${quantity} seat(s) to continue.`
      );
      setBookingStatus('error');
      return;
    }

    const bookingDetails = {
      eventId: activeEvent.id,
      eventTitle: activeEvent.title,
      ticketTier,
      quantity: selectedSeats.length,
      selectedSeats,
      pricePerTicket: price,
      subtotal,
      fee,
      total,
    };

    if (onBookNow) {
      onBookNow(bookingDetails);
    } else {
      console.log('Booking details:', bookingDetails);
      setBookingMessage(
        'Your seats have been selected successfully!'
      );
      setBookingStatus('success');
    }
  };

  if (!activeEvent) {
    return (
      <div className="event-not-found">
        <div className="event-not-found__icon">
          <i className="bi bi-calendar-x"></i>
        </div>

        <h2>Event Not Found</h2>
        <p>
          We couldn't find the event you're looking for.
        </p>

        <Link to="/" className="event-primary-btn">
          <i className="bi bi-arrow-left"></i>
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="event-detail-page">

      {/* Back navigation */}
      <div className="event-detail-page__top">
        <div className="container">
          <button
            type="button"
            className="event-back-btn"
            onClick={handleBack}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Events
          </button>
        </div>
      </div>

      <main className="container event-detail-page__container">

        {/* Event information */}
        <section className="event-overview">

          <div className="event-overview__image">
            <img
              src={activeEvent.image}
              alt={activeEvent.title}
            />

            {activeEvent.featured && (
              <span className="event-featured-label">
                <i className="bi bi-star-fill"></i>
                Featured Event
              </span>
            )}
          </div>

          <div className="event-overview__content">

            <span className="event-category-label">
              {activeEvent.category}
            </span>

            <h1>{activeEvent.title}</h1>

            <p className="event-overview__description">
              {activeEvent.description ||
                'Join us for an unforgettable experience. Explore the event details and reserve your seats today.'}
            </p>

            <div className="event-meta-list">

              <div className="event-meta-item">
                <span className="event-meta-item__icon">
                  <i className="bi bi-calendar-event"></i>
                </span>
                <div>
                  <small>Date</small>
                  <strong>
                    {activeEvent.dateDisplay || activeEvent.date}
                  </strong>
                </div>
              </div>

              <div className="event-meta-item">
                <span className="event-meta-item__icon">
                  <i className="bi bi-clock"></i>
                </span>
                <div>
                  <small>Time</small>
                  <strong>{activeEvent.time}</strong>
                </div>
              </div>

              <div className="event-meta-item">
                <span className="event-meta-item__icon">
                  <i className="bi bi-geo-alt"></i>
                </span>
                <div>
                  <small>Venue</small>
                  <strong>
                    {activeEvent.venue || activeEvent.location}
                    {activeEvent.venue && activeEvent.location
                      ? `, ${activeEvent.location}`
                      : ''}
                  </strong>
                </div>
              </div>

              <div className="event-meta-item">
                <span className="event-meta-item__icon">
                  <i className="bi bi-ticket-perforated"></i>
                </span>
                <div>
                  <small>Starting from</small>
                  <strong className="event-meta-item__price">
                    {formatPrice(gaPrice)}
                  </strong>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Booking section */}
        <section className="event-booking">

          <div className="event-section-heading">
            <div>
              <span className="event-section-heading__label">
                RESERVE YOUR PLACE
              </span>
              <h2>Select Your Seats</h2>
              <p>
                Choose your ticket type and select your preferred seats.
              </p>
            </div>
          </div>

          {/* Ticket type */}
          <div className="ticket-tier-selection">

            <button
              type="button"
              className={`ticket-tier ${
                ticketTier === 'GA' ? 'ticket-tier--active' : ''
              }`}
              onClick={() => {
                setTicketTier('GA');
                setBookingMessage('');
              }}
            >
              <span className="ticket-tier__radio">
                <span />
              </span>

              <span className="ticket-tier__details">
                <strong>General Admission</strong>
                <small>Standard event access</small>
              </span>

              <strong className="ticket-tier__price">
                {formatPrice(gaPrice)}
              </strong>
            </button>

            <button
              type="button"
              className={`ticket-tier ${
                ticketTier === 'VIP' ? 'ticket-tier--active' : ''
              }`}
              onClick={() => {
                setTicketTier('VIP');
                setBookingMessage('');
              }}
            >
              <span className="ticket-tier__radio">
                <span />
              </span>

              <span className="ticket-tier__details">
                <strong>VIP</strong>
                <small>Premium event access</small>
              </span>

              <strong className="ticket-tier__price">
                {formatPrice(vipPrice)}
              </strong>
            </button>

          </div>

          {/* Quantity */}
          <div className="ticket-quantity">
            <div>
              <strong>Number of Tickets</strong>
              <small>Select between 1 and 6 tickets</small>
            </div>

            <div className="quantity-control">
              <button
                type="button"
                aria-label="Decrease ticket quantity"
                disabled={quantity <= 1}
                onClick={() => changeQuantity(quantity - 1)}
              >
                <i className="bi bi-dash"></i>
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                aria-label="Increase ticket quantity"
                disabled={quantity >= 6}
                onClick={() => changeQuantity(quantity + 1)}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>

          {/* Seat map */}
          <div className="seat-selection">

            <div className="seat-selection__heading">
              <div>
                <h3>Choose Your Seats</h3>
                <p>
                  Select {quantity} seat(s) from the seating map.
                </p>
              </div>

              <span className="seat-selection__counter">
                {selectedSeats.length} / {quantity} selected
              </span>
            </div>

            <div className="seat-map">

              <div className="seat-map__stage">
                <div className="seat-map__stage-line"></div>
                <span>
                  <i className="bi bi-display"></i>
                  STAGE
                </span>
              </div>

              <div className="seat-map__grid">

                {ROWS.map((row) => (
                  <div className="seat-row" key={row}>

                    <span className="seat-row__label">
                      {row}
                    </span>

                    {COLUMNS.map((column) => {
                      const seatId = `${row}${column}`;
                      const status = getSeatStatus(seatId);

                      return (
                        <button
                          type="button"
                          key={seatId}
                          disabled={status === 'occupied'}
                          className={`seat seat--${status}`}
                          onClick={() => toggleSeat(seatId)}
                          aria-label={`Seat ${seatId}: ${status}`}
                          aria-pressed={status === 'selected'}
                          title={`${seatId} - ${status}`}
                        >
                          {column}
                        </button>
                      );
                    })}

                    <span className="seat-row__label">
                      {row}
                    </span>

                  </div>
                ))}

              </div>

              <div className="seat-map__legend">
                <span>
                  <i className="seat-legend seat-legend--available"></i>
                  Available
                </span>
                <span>
                  <i className="seat-legend seat-legend--selected"></i>
                  Selected
                </span>
                <span>
                  <i className="seat-legend seat-legend--occupied"></i>
                  Occupied
                </span>
              </div>

            </div>
          </div>

          {/* Booking summary */}
          <div className="booking-summary">

            <div className="booking-summary__details">

              <div className="booking-summary__heading">
                <span className="event-section-heading__label">
                  YOUR ORDER
                </span>
                <h3>Booking Summary</h3>
              </div>

              <div className="summary-row">
                <span>Ticket Type</span>
                <strong>
                  {ticketTier === 'GA'
                    ? 'General Admission'
                    : 'VIP'}
                </strong>
              </div>

              <div className="summary-row">
                <span>Selected Seats</span>
                <strong>
                  {selectedSeats.length
                    ? selectedSeats.join(', ')
                    : 'None'}
                </strong>
              </div>

              <div className="summary-row">
                <span>Tickets</span>
                <strong>{selectedSeats.length}</strong>
              </div>

              <div className="summary-row">
                <span>Ticket Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>

              <div className="summary-row">
                <span>Service Fee (5%)</span>
                <strong>{formatPrice(fee)}</strong>
              </div>

              <div className="summary-total">
                <span>Total Amount</span>
                <strong>{formatPrice(total)}</strong>
              </div>

            </div>

            <div className="booking-summary__action">

              <div className="booking-summary__notice">
                <i className="bi bi-shield-check"></i>
                <span>
                  Your selected seats will be confirmed during booking.
                </span>
              </div>

              {bookingMessage && (
                <div
                  className={`booking-message booking-message--${bookingStatus}`}
                  role="status"
                >
                  <i className={`bi ${
                    bookingStatus === 'success'
                      ? 'bi-check-circle-fill'
                      : 'bi-exclamation-circle-fill'
                  }`}></i>
                  {bookingMessage}
                </div>
              )}

              <button
                type="button"
                className="event-primary-btn event-primary-btn--full"
                onClick={handleBookNow}
              >
                Continue to Booking
                <i className="bi bi-arrow-right"></i>
              </button>

              <p className="booking-summary__hint">
                Please select all {quantity} seat(s) before continuing.
              </p>

            </div>

          </div>

        </section>
      </main>
    </div>
  );
}

export default Event;