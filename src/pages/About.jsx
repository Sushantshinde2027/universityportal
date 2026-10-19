import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function About() {
  const salientFeatures = [
    "An Empowered Autonomous Institute",
    "NBA Accredited Programs",
    "NAAC 'A++' GRADE Institute",
    "Accredited by TCS, Mumbai",
    "Highest number of Faculty members in Shivaji University area",
    "Largest Infrastructure facilities with modern amenities",
    "Modern state-of-art laboratories",
    "Final year results above 95%",
    "College bus service for students",
    "Placement in Reputed Companies and MNC's",
    "Excellent Hostel Facility for Students",
    "Well qualified & experienced faculty members",
    "Huge playground, beautiful and healthy campus",
    "500 Mbps leased line internet connectivity",
    "On campus ATM Banking Facility",
    "All Classrooms with excellent modern facilities and CCTV Cameras",
    "Excellent connectivity from Islampur, Kolhapur & Sangli",
  ];

  const missions = [
    {
      number: "M1",
      text: "Imparting effective outcome based education.",
    },
    {
      number: "M2",
      text: "Preparing students through skill oriented courses to excel in their profession with ethical values.",
    },
    {
      number: "M3",
      text: "Promoting research to benefit the society.",
    },
    {
      number: "M4",
      text: "Strengthening relationship with all the stakeholders.",
    },
  ];

  return (
    <main className="about-page">
      {/* PAGE HERO */}
      <section className="about-hero">
        <div className="container about-hero-content">
          <div>
            <span className="page-tag">DISCOVER ADCET</span>

            <h1>
              About <span>ADCET</span>
            </h1>

            <p>
              Empowering future engineers through excellence, innovation,
              competence and compassion.
            </p>
          </div>

          <div className="breadcrumb">
            <span>Home</span>
            <span>/</span>
            <strong>About ADCET</strong>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="about-introduction">
        <div className="container about-intro-grid">
          <div className="about-intro-visual">
            <div className="about-building-card">
              <span className="building-small">ESTABLISHED</span>
              <strong>1999</strong>
              <p>Years of Academic Excellence</p>
            </div>

            <div className="about-shape about-shape-one"></div>
            <div className="about-shape about-shape-two"></div>
          </div>

          <div className="about-intro-content">
            <span className="section-tag">WHO WE ARE</span>

            <h2>Building Competent Engineers for a Better Future</h2>

            <p>
              The Annasaheb Dange College of Engineering and Technology
              (ADCET), Ashta is one of the iconic public institutions of higher
              technical education in Western Maharashtra, distinguished by its
              compassion to produce engineers with competence for improving the
              human condition and building the nation.
            </p>

            <p>
              Established in 1999, ADCET, Ashta is an Empowered Autonomous
              institute affiliated to Shivaji University, Kolhapur, Maharashtra
              and approved by AICTE, New Delhi.
            </p>

            <p>
              The institute is NAAC accredited with <strong>“A++” Grade</strong>,
              ISO 9001:2015 certified and runs programmes accredited by NBA,
              New Delhi.
            </p>

            <div className="about-highlights">
              <div>
                <strong>NAAC</strong>
                <span>A++ Grade</span>
              </div>

              <div>
                <strong>NBA</strong>
                <span>Accredited Programs</span>
              </div>

              <div>
                <strong>AICTE</strong>
                <span>Approved Institute</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR JOURNEY */}
      <section className="about-story">
        <div className="container">
          <div className="about-story-header">
            <span className="section-tag">OUR JOURNEY</span>
            <h2>Education Beyond the Classroom</h2>
          </div>

          <div className="about-story-grid">
            <div className="story-card">
              <div className="story-number">01</div>

              <h3>Academic Excellence</h3>

              <p>
                ADCET's campus is spread over 25 acres in the heart of the city
                of Ashta, Sangli, where more than 3000 undergraduate students
                build lifelong friendships and connections while enjoying their
                educational journey.
              </p>
            </div>

            <div className="story-card featured-story">
              <div className="story-number">02</div>

              <h3>Outcome Based Education</h3>

              <p>
                The college focuses on outcome based education by setting a
                clear and unambiguous framework for curriculum planning along
                with clear standards for observable and measurable outcomes.
              </p>
            </div>

            <div className="story-card">
              <div className="story-number">03</div>

              <h3>Student Centric Learning</h3>

              <p>
                ADCET continuously emphasizes restructuring curriculum,
                assessment and reporting practices while fostering close working
                relationships between faculty and students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING APPROACH */}
      <section className="learning-section">
        <div className="container learning-grid">
          <div className="learning-content">
            <span className="section-tag">THE ADCET EXPERIENCE</span>

            <h2>Learning Through Innovation & Collaboration</h2>

            <p>
              At ADCET, Ashta, students are encouraged to learn through
              conversation and collaboration, micro, mini and mega projects,
              community and social justice engagement, internships in industry,
              original research and experimentation.
            </p>

            <p>
              Our cooperative relationship with IITs, NITs and research
              organizations enlarges academic opportunities for students and
              their social community.
            </p>

            <p>
              Active ties with engineering and allied industries further extend
              employment opportunities available at ADCET.
            </p>
          </div>

          <div className="learning-points">
            <div className="learning-point">
              <span>01</span>
              <div>
                <h3>Projects</h3>
                <p>Micro, mini and mega projects for practical learning.</p>
              </div>
            </div>

            <div className="learning-point">
              <span>02</span>
              <div>
                <h3>Research</h3>
                <p>Original research and experimentation opportunities.</p>
              </div>
            </div>

            <div className="learning-point">
              <span>03</span>
              <div>
                <h3>Industry Exposure</h3>
                <p>Internships and strong connections with industries.</p>
              </div>
            </div>

            <div className="learning-point">
              <span>04</span>
              <div>
                <h3>Collaboration</h3>
                <p>Academic cooperation with leading institutions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INCLUSIVE EDUCATION */}
      <section className="inclusive-section">
        <div className="container inclusive-content">
          <span className="section-tag">OUR COMMUNITY</span>

          <h2>A Diverse Community With Equal Opportunity</h2>

          <p>
            ADCET community rich in diversity offers every member equal respect
            and equal opportunity for academic excellence and employment.
          </p>

          <p>
            We offer robust student scholarship support while protecting against
            excessive student debt because we believe quality higher education
            should be affordable to all.
          </p>

          <div className="inclusive-boxes">
            <div>
              <span>🎓</span>
              <h3>Scholarship Support</h3>
              <p>Supporting deserving students in their educational journey.</p>
            </div>

            <div>
              <span>🏦</span>
              <h3>Education Loan Support</h3>
              <p>
                100% support for availing educational loans through
                nationalized banks.
              </p>
            </div>

            <div>
              <span>🤝</span>
              <h3>Equal Opportunity</h3>
              <p>
                A learning environment built on diversity, equality and
                respect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 C'S */}
      <section className="four-c-section">
        <div className="container">
          <div className="four-c-header">
            <span className="section-tag light-tag">OUR CORE VALUES</span>

            <h2>The Four C's That Define ADCET</h2>

            <p>
              We prepare the next generation with values that go beyond
              academics.
            </p>
          </div>

          <div className="four-c-grid">
            <div className="c-card">
              <span>01</span>
              <h3>Competence</h3>
              <p>Developing professional knowledge and technical expertise.</p>
            </div>

            <div className="c-card">
              <span>02</span>
              <h3>Confidence</h3>
              <p>Preparing students to face challenges with self-belief.</p>
            </div>

            <div className="c-card">
              <span>03</span>
              <h3>Commitment</h3>
              <p>Encouraging dedication towards personal and social growth.</p>
            </div>

            <div className="c-card">
              <span>04</span>
              <h3>Compassion</h3>
              <p>Creating responsible engineers who care for society.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VISION AND MISSION */}
      <section className="vision-mission-section">
        <div className="container vision-mission-grid">
          <div className="vision-card">
            <span className="vm-label">VISION</span>

            <div className="vm-icon">👁</div>

            <h2>Our Vision</h2>

            <blockquote>
              “To be a Leader in producing professionally competent engineers.”
            </blockquote>
          </div>

          <div className="mission-card">
            <span className="vm-label">MISSION</span>

            <h2>Our Mission</h2>

            <p>
              We, Annasaheb Dange College of Engineering & Technology, Ashta,
              are committed to achieve our vision by:
            </p>

            <div className="mission-list">
              {missions.map((mission) => (
                <div className="mission-item" key={mission.number}>
                  <span>{mission.number}</span>
                  <p>{mission.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXPLORE ADCET ================= */}

      <section className="quick-section">
        <div className="container">
          <div className="section-heading">
            <span>EXPLORE ADCET</span>
            <h2>Everything You Need in One Place</h2>
            <p>
              Quickly access important information about academics, admissions,
              faculty and student services.
            </p>
          </div>

          <div className="quick-grid">
            <Link to="/about" className="quick-card">
              <div className="quick-icon">🏛️</div>
              <h3>About ADCET</h3>
              <span>Explore →</span>
            </Link>

            <Link to="/admissions" className="quick-card">
              <div className="quick-icon">🎓</div>
              <h3>Admissions</h3>
              <span>Explore →</span>
            </Link>

            <Link to="/courses" className="quick-card">
              <div className="quick-icon">📚</div>
              <h3>Courses</h3>
              <span>Explore →</span>
            </Link>

            <Link to="/faculty" className="quick-card">
              <div className="quick-icon">👨‍🏫</div>
              <h3>Faculty</h3>
              <span>Explore →</span>
            </Link>

            <Link to="/notices" className="quick-card">
              <div className="quick-icon">📢</div>
              <h3>Notices</h3>
              <span>Explore →</span>
            </Link>

            <Link to="/faq" className="quick-card">
              <div className="quick-icon">❓</div>
              <h3>FAQ</h3>
              <span>Explore →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* QUALITY POLICY */}
      <section className="quality-section">
        <div className="container quality-grid">
          <div>
            <span className="section-tag">OUR COMMITMENT</span>

            <h2>Quality Policy</h2>

            <p>
              We intend to continually enhance the performance of our institute
              through structured systems, responsibility and continuous
              improvement.
            </p>
          </div>

          <div className="quality-list">
            <div>
              <span>✓</span>
              <p>
                Functioning in a structured, organized and coordinated manner.
              </p>
            </div>

            <div>
              <span>✓</span>
              <p>
                Being conscious about our responsibilities and authorities at
                formal and informal levels.
              </p>
            </div>

            <div>
              <span>✓</span>
              <p>Taking every possible initiative in the role assigned.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SALIENT FEATURES */}
      <section className="features-section">
        <div className="container">
          <div className="section-heading">
            <span>WHY CHOOSE ADCET</span>
            <h2>Salient Features</h2>
            <p>
              A strong academic ecosystem supported by modern infrastructure
              and student-focused facilities.
            </p>
          </div>

          <div className="features-grid">
            {salientFeatures.map((feature, index) => (
              <div className="feature-item" key={index}>
                <span className="feature-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <span className="feature-check">✓</span>
                  <p>{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container about-cta-content">
          <div>
            <span>JOIN THE ADCET COMMUNITY</span>
            <h2>Start Your Engineering Journey With Us</h2>
            <p>
              Explore our programs, campus opportunities and admission process.
            </p>
          </div>

          <div className="about-cta-buttons">
            <a href="#admissions" className="white-btn">
              Explore Admissions →
            </a>

            <a href="#courses" className="outline-btn">
              View Courses
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;