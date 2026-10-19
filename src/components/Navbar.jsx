import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/adcet-logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const tickerItems = [
    "Admissions Open for Academic Year 2026–27",
    "ADCET Hackathon 2026 – Season 3 (Sustainable Development Goals)",
    "AICTE Scholarship / Fellowship Schemes available",
    "ADCET Alumni Database Update Form",
    "Fee Approval Proposal for Academic Year 2026–2027 released",
  ];

  return (
    <header>
      {/* Top Utility Links Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <span>DTE Code: 06283</span>
          <div className="top-links">
            <a href="#">Videos</a>
            <a href="#">Online Grievance</a>
            <a href="#">Achievements</a>
            <a href="#">Press Media</a>
            <a href="#">Incubation</a>
            <a href="#">Audit Report</a>
          </div>
        </div>
      </div>

      {/* Main Branding Header */}
      <div className="main-header">
        <div className="container header-content">
          <div className="brand">
            <img src={logo} alt="ADCET Logo" className="logo-img" />
            <div className="brand-text">
              <p>Sant Dnyaneshwar Shikshan Sanstha's</p>
              <h1>
                Annasaheb Dange College of Engineering
                <br />
                and Technology, Ashta
              </h1>
              <span>
                An Empowered Autonomous Institute • Affiliated to Shivaji
                University, Kolhapur
              </span>
            </div>
          </div>

          <div className="accreditation">
            <div>
              <strong>NAAC</strong>
              <span>A++ Grade</span>
            </div>
            <div>
              <strong>NBA</strong>
              <span>Accredited</span>
            </div>
            <div>
              <strong>AICTE</strong>
              <span>Approved</span>
            </div>
            <div>
              <strong>ISO</strong>
              <span>9001:2015</span>
            </div>
            <div>
              <strong>Autonomous</strong>
              <span>Institute</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <nav className="navbar">
        <div className="container nav-content">
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰ Menu
          </button>
          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <Link to="/">HOME</Link>
            <Link to="/about">ABOUT US</Link>
            <Link to="/admissions">ADMISSION</Link>
            <Link to="/courses">DEPARTMENTS</Link>
            <Link to="/faculty">FACULTY</Link>
            <Link to="/notices">NOTICES</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">CONTACT</Link>
          </div>
        </div>
      </nav>

      {/* Secondary Quick Links Bar */}
      <div className="sub-nav">
        <div className="container sub-nav-inner">
          <a href="#">All News</a>
          <a href="#">AICTE Approvals</a>
          <a href="#">NIRF</a>
          <a href="#">Accreditation Status</a>
          <a href="#">RTI</a>
          <a href="#">Alumni</a>
          <a href="#" className="erp">ERP Login</a>
        </div>
      </div>

      {/* Live News Ticker */}
      <div className="news-bar">
        <div className="container news-content">
          <div className="news-title">LATEST NEWS</div>
          <div className="news-items">
            <div className="news-track">
              {tickerItems.map((item, i) => (
                <span key={i}>● {item}</span>
              ))}
              {tickerItems.map((item, i) => (
                <span key={`r-${i}`}>● {item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
