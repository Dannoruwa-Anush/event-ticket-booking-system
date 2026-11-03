import { Navbar as BsNavbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router';

function Navbar() {
  return (
    <BsNavbar
      expand="lg"
      className="app-navbar"
      sticky="top"
    >
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="app-navbar__brand">
          <div className="app-navbar__logo">
            <i className="bi bi-ticket-perforated"></i>
          </div>

          <div className="app-navbar__brand-text">
            <span>EventHorizon</span>
            <small>LIVE</small>
          </div>
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="main-navbar" />

        <BsNavbar.Collapse id="main-navbar">
          <div className="app-navbar__search">
            <Form.Control
              type="search"
              placeholder="Search events, artists, venues..."
            />
          </div>

          <Nav className="app-navbar__actions">
            <Nav.Link as={Link} to="/">
              Events
            </Nav.Link>

            <Button
              variant="link"
              className="app-navbar__icon-btn"
              title="Toggle theme"
            >
              <i className="bi bi-moon"></i>
            </Button>

            <Button
              variant="link"
              className="app-navbar__icon-btn"
              title="Saved events"
            >
              <i className="bi bi-heart"></i>
            </Button>

            <div className="app-navbar__profile">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Alex Morgan"
              />

              <span>Alex Morgan</span>
            </div>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
