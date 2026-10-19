import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <div className="footer-logo">ADCET</div>
          <h3>
            Annasaheb Dange College of Engineering
            <br />
            and Technology, Ashta
          </h3>
          <p>Sant Dnyaneshwar Shikshan Sanstha's</p>
          <p>Ashta, Dist. Sangli, Maharashtra – 416 301</p>
        </div>

        <div className="footer-col">
          <h4>Useful Links</h4>
          <Link to="/about">About ADCET</Link>
          <Link to="/admissions">Admissions</Link>
          <Link to="/courses">Departments</Link>
          <Link to="/faculty">Faculty</Link>
          <Link to="/notices">Notices</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        <div className="footer-col">
          <h4>Important Links</h4>
          <a href="#">DTE Maharashtra</a>
          <a href="#">Shivaji University</a>
          <a href="#">MahaDBT</a>
          <a href="#">National Scholarship Portal</a>
          <a href="#">NPTEL</a>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>Ashta, Dist. Sangli, Maharashtra – 416301</p>
          <p>
            <a href="tel:+918600600700">+91-8600600700</a>
          </p>
          <p>
            <a href="mailto:director@adcet.in">director@adcet.in</a>
          </p>
          <p>
            <a href="#">
              www.adcet.ac.in
            </a>
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Twitter">t</a>
            <a href="#" aria-label="YouTube">y</a>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Instagram">ig</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2026 Annasaheb Dange College of Engineering and Technology (ADCET),
          Ashta. All Rights Reserved.
        </p>
        <span>Designed &amp; Developed for Annasaheb Dange College of Engineering and Technology, Ashta</span>
      </div>
    </footer>
  );
}

export default Footer;
