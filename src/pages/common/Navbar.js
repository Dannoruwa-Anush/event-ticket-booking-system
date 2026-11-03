import { Navbar as BsNavbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router';

import { useAuth } from '../../context/AuthContext';

function Navbar() {

  const { user, isAuthenticated, logout } = useAuth();

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

            {/* Authentication */}
            {isAuthenticated ? (

              <div className="app-navbar__profile">

                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                  />
                ) : (
                  <div className="app-navbar__avatar">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}

                <span>{user.name}</span>

                <Button
                  variant="link"
                  className="app-navbar__icon-btn"
                  title="Logout"
                  onClick={logout}
                >
                  <i className="bi bi-box-arrow-right"></i>
                </Button>

              </div>

            ) : (

              <Button
                as={Link}
                to="/login"
                className="app-navbar__login-btn"
              >
                <i className="bi bi-person-circle"></i>
                Login
              </Button>

            )}

          </Nav>

        </BsNavbar.Collapse>

      </Container>
    </BsNavbar>
  );
}

export default Navbar;
