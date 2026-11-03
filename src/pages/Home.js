
import React, { useMemo, useState } from "react";

const categories = [
  { name: "Music", icon: "bi-music-note-beamed", count: 24 },
  { name: "Technology", icon: "bi-laptop", count: 18 },
  { name: "Sports", icon: "bi-trophy", count: 12 },
  { name: "Art & Culture", icon: "bi-palette", count: 15 },
  { name: "Food & Drink", icon: "bi-cup-hot", count: 20 },
  { name: "Business", icon: "bi-briefcase", count: 10 },
];

const events = [
  {
    id: 1,
    title: "Colombo Music Festival 2026",
    category: "Music",
    date: "November 15, 2026",
    time: "06:00 PM",
    location: "Colombo",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
    featured: true,
  },
  {
    id: 2,
    title: "Technology Innovation Summit",
    category: "Technology",
    date: "November 20, 2026",
    time: "09:00 AM",
    location: "Kandy",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    featured: true,
  },
  {
    id: 3,
    title: "Food & Culture Festival",
    category: "Food & Drink",
    date: "November 25, 2026",
    time: "04:00 PM",
    location: "Galle",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
    featured: false,
  },
  {
    id: 4,
    title: "Modern Art Exhibition",
    category: "Art & Culture",
    date: "December 02, 2026",
    time: "10:00 AM",
    location: "Colombo",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800",
    featured: false,
  },
  {
    id: 5,
    title: "Champions Sports Meetup",
    category: "Sports",
    date: "December 08, 2026",
    time: "03:00 PM",
    location: "Kandy",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
    featured: false,
  },
  {
    id: 6,
    title: "Business Networking Event",
    category: "Business",
    date: "December 12, 2026",
    time: "05:00 PM",
    location: "Colombo",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
    featured: false,
  },
];

const formatPrice = (price) =>
  price === 0 ? "Free" : `Rs. ${price.toLocaleString("en-LK")}`;

function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filteredEvents = useMemo(() => {
    let result = events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        event.category === selectedCategory;

      const matchesLocation =
        selectedLocation === "All" ||
        event.location === selectedLocation;

      const eventDate = new Date(event.date);
      const matchesDate =
        !selectedDate ||
        eventDate.toISOString().slice(0, 10) === selectedDate;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesDate
      );
    });

    if (sortBy === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    search,
    selectedCategory,
    selectedLocation,
    selectedDate,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedLocation("All");
    setSelectedDate("");
    setSortBy("default");
  };

  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="home-hero">
        <div className="container">
          <div className="home-hero__content">
            <span className="home-hero__badge">
              <i className="bi bi-stars"></i>
              Discover Something Amazing
            </span>

            <h1>
              Find Your Next
              <span> Unforgettable Experience.</span>
            </h1>

            <p>
              Discover exciting events, connect with amazing people,
              and create memories that last forever.
            </p>

            <div className="home-hero__actions">
              <a href="#events" className="btn btn-primary-custom">
                Explore Events
                <i className="bi bi-arrow-right"></i>
              </a>

              <a href="#categories" className="btn btn-outline-custom">
                Explore Categories
              </a>
            </div>

            <div className="home-hero__stats">
              <div>
                <h3>100+</h3>
                <span>Events</span>
              </div>
              <div>
                <h3>20+</h3>
                <span>Categories</span>
              </div>
              <div>
                <h3>5K+</h3>
                <span>Visitors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Categories */}
      <section className="home-categories" id="categories">
        <div className="container">

          <div className="home-section-heading">
            <div>
              <span className="section-label">BROWSE BY INTEREST</span>
              <h2>Explore Categories</h2>
              <p>Find experiences that match your interests.</p>
            </div>

            <button
              className="view-all-btn"
              onClick={() => setSelectedCategory("All")}
            >
              View All <i className="bi bi-arrow-right"></i>
            </button>
          </div>

          <div className="row g-3">
            {categories.map((item) => (
              <div className="col-6 col-md-4 col-lg-2" key={item.name}>
                <button
                  className={`category-card ${
                    selectedCategory === item.name ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedCategory(item.name);
                    document.getElementById("events")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  <div className="category-card__icon">
                    <i className={`bi ${item.icon}`}></i>
                  </div>

                  <h5>{item.name}</h5>
                  <span>{item.count} Events</span>
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Events Section */}
      <section className="home-events" id="events">
        <div className="container">

          <div className="home-section-heading">
            <div>
              <span className="section-label">DON'T MISS OUT</span>
              <h2>Discover Events</h2>
              <p>Find and explore the best upcoming events.</p>
            </div>

            <span className="event-count">
              {filteredEvents.length} Events Found
            </span>
          </div>

          {/* Filter Section */}
          <div className="event-filters">

            <div className="event-filters__header">
              <h5>
                <i className="bi bi-sliders"></i>
                Filter Events
              </h5>

              <button onClick={resetFilters}>
                <i className="bi bi-arrow-counterclockwise"></i>
                Reset Filters
              </button>
            </div>

            <div className="row g-3">

              <div className="col-12 col-md-6 col-lg-4">
                <label>Search Events</label>
                <div className="filter-input">
                  <i className="bi bi-search"></i>
                  <input
                    type="text"
                    placeholder="Search by event name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <label>Category</label>
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  {categories.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-6 col-lg-2">
                <label>Location</label>
                <select
                  className="form-select"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="All">All Locations</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Galle">Galle</option>
                </select>
              </div>

              <div className="col-12 col-md-6 col-lg-2">
                <label>Event Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div className="col-12 col-md-6 col-lg-1">
                <label>Sort</label>
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="name">Name</option>
                  <option value="price-low">Price ↑</option>
                  <option value="price-high">Price ↓</option>
                </select>
              </div>

            </div>
          </div>

          {/* Event Cards */}
          <div className="row g-4 mt-2">

            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  className="col-12 col-md-6 col-lg-4"
                  key={event.id}
                >
                  <div className="event-card">

                    <div className="event-card__image">
                      <img src={event.image} alt={event.title} />

                      <span className="event-card__category">
                        {event.category}
                      </span>

                      {event.featured && (
                        <span className="event-card__featured">
                          <i className="bi bi-star-fill"></i>
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="event-card__body">
                      <h5>{event.title}</h5>

                      <div className="event-card__details">
                        <span>
                          <i className="bi bi-calendar3"></i>
                          {event.date}
                        </span>

                        <span>
                          <i className="bi bi-clock"></i>
                          {event.time}
                        </span>

                        <span>
                          <i className="bi bi-geo-alt"></i>
                          {event.location}
                        </span>
                      </div>

                      <div className="event-card__footer">
                        <div>
                          <small>Ticket Price</small>
                          <strong>{formatPrice(event.price)}</strong>
                        </div>

                        <button className="event-details-btn">
                          View Details
                          <i className="bi bi-arrow-up-right"></i>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="no-events">
                <i className="bi bi-calendar-x"></i>
                <h4>No Events Found</h4>
                <p>Try changing your filters or search keywords.</p>
                <button onClick={resetFilters}>Clear Filters</button>
              </div>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;
