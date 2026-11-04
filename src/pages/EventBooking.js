
import { useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

function EventBooking({ event, booking, user, onClose }) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [order, setOrder] = useState(null);

  // Booking information comes from the Event page.
  const ticketTier = booking?.ticketTier || 'GA';
  const quantity = Number(booking?.quantity) || 1;
  const selectedSeats = booking?.selectedSeats || [];

  const gaPrice = Number(event?.priceGA ?? event?.price ?? 0);
  const vipPrice = Number(
    event?.priceVIP ?? Math.round(gaPrice * 1.5)
  );

  const ticketPrice = ticketTier === 'VIP' ? vipPrice : gaPrice;
  const subtotal = ticketPrice * quantity;
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee;

  const formatPrice = (amount) =>
    new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0,
    }).format(amount);

  const eventDate = event?.dateDisplay || event?.date || 'Date to be announced';
  const eventLocation = event?.venue || event?.location || 'Venue to be announced';

  const seatLabels = selectedSeats.length
    ? selectedSeats.join(', ')
    : 'Not assigned';

  const orderId = useMemo(
    () => `EH-${Date.now().toString().slice(-8)}`,
    []
  );

  const handlePayment = (e) => {
    e.preventDefault();

    if (processing) return;

    setProcessing(true);

    // DEMO ONLY:
    // Replace this with your payment provider checkout.
    // Only move to confirmation after your backend verifies payment.
    setTimeout(() => {
      setOrder({
        id: orderId,
        eventName: event?.title || 'Event',
        ticketTier,
        quantity,
        seats: seatLabels,
        total,
        date: eventDate,
        location: eventLocation,
      });

      setProcessing(false);
      setStep(2);
    }, 1000);
  };

  const handleDownloadTicket = () => {
    // Opens the browser print dialog.
    // The user can select "Save as PDF".
    window.print();
  };

  if (!event || !booking) return null;

  return (
    <div
      className="event-booking-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && step === 1) {
          onClose();
        }
      }}
    >
      <div
        className="event-booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bookingModalTitle"
      >
        {/* Modal Header */}
        <div className="booking-modal-header">
          <div>
            <span className="booking-eyebrow">EVENTHORIZON CHECKOUT</span>
            <h2 id="bookingModalTitle">
              {step === 1 ? 'Complete Your Booking' : 'Booking Confirmed'}
            </h2>
          </div>

          {step === 1 && (
            <button
              type="button"
              className="booking-close-btn"
              onClick={onClose}
              aria-label="Close booking"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          )}
        </div>

        {/* Step Indicator */}
        <div className="booking-step-indicator">
          <div className={`booking-step ${step === 1 ? 'active' : 'completed'}`}>
            <span className="step-number">
              {step === 1 ? '1' : <i className="bi bi-check-lg"></i>}
            </span>
            <span>Payment</span>
          </div>

          <div className={`step-line ${step === 2 ? 'completed' : ''}`}></div>

          <div className={`booking-step ${step === 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span>Confirmation</span>
          </div>
        </div>

        <div className="booking-modal-body">
          {/* STEP 1: PAYMENT */}
          {step === 1 && (
            <div className="payment-step">
              <div className="payment-layout">

                {/* Payment Method */}
                <div className="payment-details">
                  <div className="booking-section-heading">
                    <span className="section-number">01</span>
                    <div>
                      <h3>Payment Method</h3>
                      <p>Select how you want to pay.</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`payment-method-card ${
                      paymentMethod === 'card' ? 'selected' : ''
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <span className="payment-method-icon">
                      <i className="bi bi-credit-card-2-front"></i>
                    </span>

                    <span className="payment-method-info">
                      <strong>Credit / Debit Card</strong>
                      <small>Visa, Mastercard and other supported cards</small>
                    </span>

                    <span className="payment-radio">
                      {paymentMethod === 'card' && (
                        <i className="bi bi-check-lg"></i>
                      )}
                    </span>
                  </button>

                  <div className="accepted-cards">
                    <span>Accepted payment methods</span>
                    <div>
                      <span className="card-brand visa">VISA</span>
                      <span className="card-brand mastercard">
                        <i className="bi bi-circle-fill"></i>
                        <i className="bi bi-circle-fill"></i>
                      </span>
                    </div>
                  </div>

                  <div className="secure-payment-note">
                    <i className="bi bi-shield-lock-fill"></i>
                    <div>
                      <strong>Secure payment</strong>
                      <p>
                        Your payment will be processed through a secure
                        payment provider.
                      </p>
                    </div>
                  </div>

                  <p className="payment-demo-note">
                    Demo mode: no actual card details or payment are collected.
                  </p>
                </div>

                {/* Order Summary */}
                <div className="checkout-summary">
                  <h3>Order Summary</h3>

                  <div className="summary-event">
                    <div className="summary-event-image">
                      {event.image ? (
                        <img src={event.image} alt={event.title} />
                      ) : (
                        <i className="bi bi-calendar-event"></i>
                      )}
                    </div>

                    <div>
                      <h4>{event.title}</h4>
                      <span>{eventLocation}</span>
                    </div>
                  </div>

                  <div className="summary-divider"></div>

                  <div className="checkout-summary-row">
                    <span>Event Date</span>
                    <strong>{eventDate}</strong>
                  </div>

                  <div className="checkout-summary-row">
                    <span>Ticket Type</span>
                    <strong>
                      {ticketTier === 'VIP' ? 'VIP' : 'General Admission'}
                    </strong>
                  </div>

                  <div className="checkout-summary-row">
                    <span>Quantity</span>
                    <strong>{quantity} ticket(s)</strong>
                  </div>

                  <div className="checkout-summary-row">
                    <span>Selected Seats</span>
                    <strong className="summary-seats">{seatLabels}</strong>
                  </div>

                  <div className="summary-divider"></div>

                  <div className="checkout-summary-row">
                    <span>Ticket Subtotal</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>

                  <div className="checkout-summary-row">
                    <span>Service Fee (5%)</span>
                    <strong>{formatPrice(serviceFee)}</strong>
                  </div>

                  <div className="summary-divider"></div>

                  <div className="checkout-total">
                    <span>Total Amount</span>
                    <strong>{formatPrice(total)}</strong>
                  </div>

                  <form onSubmit={handlePayment}>
                    <button
                      type="submit"
                      className="pay-now-btn"
                      disabled={processing || paymentMethod !== 'card'}
                    >
                      {processing ? (
                        <>
                          <span className="booking-spinner"></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-lock-fill"></i>
                          Pay Now
                          <i className="bi bi-arrow-right"></i>
                        </>
                      )}
                    </button>
                  </form>

                  <button
                    type="button"
                    className="back-to-event-btn"
                    onClick={onClose}
                    disabled={processing}
                  >
                    Back to Event
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CONFIRMATION */}
          {step === 2 && order && (
            <div className="confirmation-step">
              <div className="confirmation-success-icon">
                <i className="bi bi-check-lg"></i>
              </div>

              <h3>Booking Confirmed!</h3>

              <p className="confirmation-message">
                Your demo booking has been confirmed.
                {user?.email && (
                  <> Booking details are associated with {user.email}.</>
                )}
              </p>

              {/* E-Ticket */}
              <div className="event-e-ticket">
                <div className="e-ticket-header">
                  <div>
                    <span className="e-ticket-label">EVENTHORIZON E-TICKET</span>
                    <h4>{order.eventName}</h4>
                  </div>

                  <i className="bi bi-ticket-perforated e-ticket-icon"></i>
                </div>

                <div className="e-ticket-details">
                  <div>
                    <span>DATE</span>
                    <strong>{order.date}</strong>
                  </div>

                  <div>
                    <span>VENUE</span>
                    <strong>{order.location}</strong>
                  </div>

                  <div>
                    <span>TICKET TYPE</span>
                    <strong>{order.ticketTier}</strong>
                  </div>

                  <div>
                    <span>QUANTITY</span>
                    <strong>{order.quantity}</strong>
                  </div>

                  <div>
                    <span>SEATS</span>
                    <strong>{order.seats}</strong>
                  </div>

                  <div>
                    <span>ORDER REFERENCE</span>
                    <strong>{order.id}</strong>
                  </div>
                </div>

                <div className="e-ticket-qr">
                  <QRCodeSVG
                    value={JSON.stringify({
                      ticketId: order.id,
                      event: event.id,
                    })}
                    size={150}
                    level="H"
                    includeMargin
                  />
                  <span>Scan ticket QR code</span>
                </div>

                <div className="e-ticket-footer">
                  <span>Keep this ticket for event entry</span>
                  <strong>{formatPrice(order.total)}</strong>
                </div>
              </div>

              <div className="confirmation-actions">
                <button
                  type="button"
                  className="download-ticket-btn"
                  onClick={handleDownloadTicket}
                >
                  <i className="bi bi-download"></i>
                  Download E-Ticket
                </button>

                <button
                  type="button"
                  className="finish-booking-btn"
                  onClick={onClose}
                >
                  Done & Return
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>

              <p className="ticket-download-note">
                Download opens your browser's print window. Choose
                "Save as PDF" to save your e-ticket.
              </p>

              <p className="payment-demo-note">
                This is a demonstration ticket, not a valid entry pass.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventBooking;
