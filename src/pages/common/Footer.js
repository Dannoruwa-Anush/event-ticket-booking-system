import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="app-footer">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <div className="app-footer__brand">
              <div className="app-footer__logo">
                <i className="bi bi-ticket-perforated"></i>
              </div>

              <div>
                <div className="app-footer__title">
                  EventHorizon
                </div>

                <div className="app-footer__copyright">
                  © 2026 EventHorizon. All rights reserved.
                </div>
              </div>
            </div>
          </Col>

          <Col md={6}>
            <nav className="app-footer__links">
              <Link to="/">Events</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
