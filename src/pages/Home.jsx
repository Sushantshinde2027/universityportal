import React, { useState } from "react";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const newsItems = [
    "Admissions Open for Academic Year 2026–27",
    "ADCET Hackathon 2026 – Season 3",
    "ADCET Alumni Database Update Form",
    "AICTE Scholarship and Fellowship Schemes",
  ];

  const notices = [
    {
      title: "FY B.Tech. Admission Notice 2026–27",
      date: "2026–27",
    },
    {
      title: "M.Tech Admission Information",
      date: "Admission",
    },
    {
      title: "Scholarship Application Notice",
      date: "Students",
    },
    {
      title: "Academic Calendar 2026–27",
      date: "Academic",
    },
    {
      title: "Placement Training Schedule",
      date: "Placement",
    },
  ];

  const stats = [
    { value: "1999", label: "Established" },
    { value: "25+", label: "Acres Campus" },
    { value: "3000+", label: "Students" },
    { value: "95%+", label: "Final Year Results" },
  ];

  const programs = [
    {
      icon: "💻",
      title: "Computer Science & Engineering",
      description:
        "Developing skilled professionals in computing, software development and emerging technologies.",
    },
    {
      icon: "🤖",
      title: "Artificial Intelligence & Data Science",
      description:
        "Preparing students for careers in AI, machine learning, data science and intelligent systems.",
    },
    {
      icon: "⚙️",
      title: "Mechanical Engineering",
      description:
        "Strong foundation in design, manufacturing, automation and modern engineering practices.",
    },
    {
      icon: "🏗️",
      title: "Civil Engineering",
      description:
        "Creating professionals capable of designing and developing sustainable infrastructure.",
    },
    {
      icon: "✈️",
      title: "Aeronautical Engineering",
      description:
        "Focused education in aircraft systems, aerodynamics, aerospace design and aviation technology.",
    },
    {
      icon: "⚡",
      title: "Electrical Engineering",
      description:
        "Building expertise in electrical systems, power systems, automation and modern technologies.",
    },
  ];

  const facilities = [
    {
      icon: "🔬",
      title: "Modern Laboratories",
      text: "State-of-the-art laboratories supporting practical learning, experimentation and research.",
    },
    {
      icon: "📚",
      title: "Learning Resources",
      text: "Well-equipped learning facilities designed to support academic excellence and student development.",
    },
    {
      icon: "🏠",
      title: "Hostel Facility",
      text: "Comfortable hostel facilities and student support services for campus residents.",
    },
    {
      icon: "🚌",
      title: "College Bus Service",
      text: "Transportation facilities connecting students with nearby cities and surrounding areas.",
    },
    {
      icon: "🏃",
      title: "Sports & Playground",
      text: "Large playground and facilities encouraging sports, fitness and extracurricular activities.",
    },
    {
      icon: "🌐",
      title: "Internet Connectivity",
      text: "High-speed internet connectivity supporting digital learning and academic activities.",
    },
  ];

  const placements = [
    { value: "2,281", label: "Students Placed" },
    { value: "40 LPA", label: "Highest Package" },
    { value: "4 LPA", label: "Average Package" },
    { value: "180+", label: "Recruiting Companies" },
  ];

  const quickLinks = [
    { name: "About ADCET", icon: "🏛️", link: "/about" },
    { name: "Admissions", icon: "🎓", link: "/admissions" },
    { name: "Courses", icon: "📚", link: "/courses" },
    { name: "Faculty", icon: "👨‍🏫", link: "/faculty" },
    { name: "Notices", icon: "📢", link: "/notices" },
    { name: "FAQ", icon: "❓", link: "/faq" },
  ];

  const deskMembers = [
    {
      name: "Shri. Annasaheb Dange",
      role: "Founder",
      img: "https://www.adcet.ac.in/images/desk/Hon-Shri-Annasaheb-Dange.jpg",
    },
    {
      name: "Adv. Rajendra R. Dange",
      role: "Secretary",
      img: "https://www.adcet.ac.in/images/desk/Adv-Rajendra-R-Dange.jpg",
    },
    {
      name: "Shri. Vishwanath R. Dange",
      role: "Joint Secretary",
      img: "https://www.adcet.ac.in/images/desk/Shri-Vishwanath-R-Dange-secratory.jpg",
    },
    {
      name: "Dr. Laxman Y Waghmode",
      role: "Director",
      img: "https://www.adcet.ac.in/images/desk/Dr-Laxman-Y-Waghmode.jpg",
    },
  ];

  const awards = [
    {
      img: "https://www.adcet.ac.in/images/approvals/naac-a++.png",
      title: 'ADCET awarded NAAC "A++" grade.',
    },
    {
      img: "https://www.adcet.ac.in/images/approvals/nba.png",
      title: "NBA Accredited",
    },
    {
      img: "https://www.adcet.ac.in/images/approvals/aicte.png",
      title: "Approved By AICTE",
    },
    {
      img: "https://www.adcet.ac.in/images/approvals/iso-2015.png",
      title: "ISO 9001:2015 Certified Institution",
    },
    {
      img: "https://www.adcet.ac.in/images/approvals/autonomous.png",
      title: "An Empowered Autonomous Institute",
    },
  ];

  const achievements = [
    "https://www.adcet.ac.in/uploads/achievements/17762297051.jpeg",
    "https://www.adcet.ac.in/uploads/achievements/17762296851.jpeg",
    "https://www.adcet.ac.in/uploads/achievements/17762296621.jpeg",
    "https://www.adcet.ac.in/uploads/achievements/17762296211.jpeg",
    "https://www.adcet.ac.in/uploads/achievements/17762296061.jpeg",
    "https://www.adcet.ac.in/uploads/achievements/17762295541.jpeg",
  ];

  const activities = [
    {
      title: "Constro 2025",
      img: "https://www.adcet.ac.in/thum/index.php?src=https://www.adcet.ac.in/uploads/gallery/1770880946.jpeg&w=370&h=280",
    },
    {
      title:
        "ISTE-Approved Faculty Development Program (FDP) on Applications of AI in Civil Engineering",
      img: "https://www.adcet.ac.in/thum/index.php?src=https://www.adcet.ac.in/uploads/gallery/1770880662.jpeg&w=370&h=280",
    },
    {
      title: "Civil Fighters (Faculty Cricket Match-2025)",
      img: "https://www.adcet.ac.in/thum/index.php?src=https://www.adcet.ac.in/uploads/gallery/1770879761.jpeg&w=370&h=280",
    },
    {
      title: "Exhibitor - Non Destructive Testing Expo",
      img: "https://www.adcet.ac.in/thum/index.php?src=https://www.adcet.ac.in/uploads/gallery/1770789418.jpg&w=370&h=280",
    },
    {
      title: "DGCA Deputy Director Visit",
      img: "https://www.adcet.ac.in/thum/index.php?src=https://www.adcet.ac.in/uploads/gallery/1770357127.jpg&w=370&h=280",
    },
    {
      title: "Hands-on Training on Agri Drone Calibration",
      img: "https://www.adcet.ac.in/thum/index.php?src=https://www.adcet.ac.in/uploads/gallery/1770356827.jpg&w=370&h=280",
    },
  ];

  const newsImages = [
    "https://www.adcet.ac.in/uploads/gallery/1782816987.jpeg",
    "https://www.adcet.ac.in/uploads/gallery/1780304807.jpeg",
    "https://www.adcet.ac.in/uploads/gallery/1780304784.jpeg",
    "https://www.adcet.ac.in/uploads/gallery/1778841084.jpeg",
    "https://www.adcet.ac.in/uploads/gallery/1778841065.jpeg",
    "https://www.adcet.ac.in/uploads/gallery/1778147817.jpeg",
    "https://www.adcet.ac.in/uploads/gallery/1776919443.jpeg",
    "https://www.adcet.ac.in/uploads/gallery/1773988390.jpeg",
  ];

  const downloads = [
    {
      title: "Fee Approval Proposal for Academic Year 2026-2027",
      link: "https://www.adcet.ac.in/uploads/download/1762167004.pdf",
    },
    {
      title: "DSE Final Merit List for ACAP Seats 2025-26",
      link: "https://www.adcet.ac.in/uploads/download/1757659995.pdf",
    },
    {
      title: "DSE Provisional Merit List Against CAP Seats 2025-26",
      link: "https://www.adcet.ac.in/uploads/download/1757651954.pdf",
    },
    {
      title: "Schedule for DSE Admission 2025-26",
      link: "https://www.adcet.ac.in/uploads/download/1757584030.pdf",
    },
    {
      title: "FY B.Tech. Final Merit List ACAP Seats 2025-26",
      link: "https://www.adcet.ac.in/uploads/download/1757490963.pdf",
    },
  ];

  const recruitersImg =
    "https://www.adcet.ac.in/images/recruiters/recruiters-11.jpg";

  return (
    <div className="adcet-home">

      {/* ================= HERO ================= */}

      <section className="hero-section">

        <div className="hero-overlay"></div>

        <div className="container hero-content">

          <div className="hero-text">

            <span className="hero-badge">
              EXCELLENCE • INNOVATION • TECHNOLOGY
            </span>

            <h2>
              Building Engineers
              <span> For Tomorrow.</span>
            </h2>

            <p>
              Empowering students with knowledge, innovation, research,
              professional skills and values to contribute meaningfully
              to society and build a better future.
            </p>

            <div className="hero-buttons">
              <a href="/courses" className="primary-btn">
                Explore Courses
              </a>

              <a href="/admissions" className="secondary-btn">
                Apply for Admission
              </a>
            </div>

          </div>

          <div className="hero-card">

            <span className="hero-card-tag">
              WHY ADCET?
            </span>

            <h3>
              A Campus Designed
              <br />
              For Excellence
            </h3>

            <ul>
              <li>✓ NAAC A++ Accredited Institute</li>
              <li>✓ NBA Accredited Programs</li>
              <li>✓ Student Centric Learning</li>
              <li>✓ Modern Infrastructure</li>
              <li>✓ Industry & Research Exposure</li>
              <li>✓ Strong Placement Support</li>
            </ul>

          </div>

        </div>
      </section>

      {/* ================= STATS ================= */}

      <section className="stats-section">
        <div className="container stats-grid">

          {stats.map((stat, index) => (
            <div className="stat-item" key={index}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= QUICK LINKS ================= */}

      <section className="quick-section">

        <div className="container">

          <div className="section-heading">
            <span>EXPLORE ADCET</span>
            <h2>Everything You Need in One Place</h2>
            <p>
              Quickly access important information about academics,
              admissions, faculty and student services.
            </p>
          </div>

          <div className="quick-grid">

            {quickLinks.map((item, index) => (
              <a
                href={item.link}
                className="quick-card"
                key={index}
              >
                <div className="quick-icon">
                  {item.icon}
                </div>

                <h3>{item.name}</h3>

                <span>
                  Explore →
                </span>
              </a>
            ))}

          </div>

        </div>
      </section>

      {/* ================= ABOUT ADCET ================= */}

      <section className="about-main-section">

        <div className="container">

          {/* Section Heading */}
          <div className="section-heading about-heading">

            <span>ABOUT ADCET</span>

            <h2>
              Annasaheb Dange College of Engineering
              <br />
              and Technology, Ashta
            </h2>

            <p>
              Empowering students through competence, confidence,
              commitment and compassion.
            </p>

          </div>


          {/* Main About Content */}

          <div className="about-main-grid">

            {/* Left Content */}

            <div className="about-main-content">

              <h3>
                An Institution Committed to Engineering Excellence
              </h3>

              <p>
                Annasaheb Dange College of Engineering and Technology
                (ADCET), Ashta is one of the prominent institutions of
                higher technical education in Western Maharashtra.
                Established in 1999, the institute has been committed
                to producing professionally competent engineers who
                can contribute meaningfully to society and nation
                building.
              </p>

              <p>
                ADCET is an Empowered Autonomous Institute affiliated
                to Shivaji University, Kolhapur, Maharashtra and
                approved by the All India Council for Technical
                Education (AICTE), New Delhi. The institute is
                accredited with NAAC A++ Grade and offers programs
                accredited by the National Board of Accreditation (NBA).
              </p>

              <p>
                The institution brings together dedicated faculty,
                motivated students, modern infrastructure, laboratories
                and strong academic practices to create an environment
                focused on quality education, innovation and professional
                development.
              </p>

              <p>
                ADCET believes that engineering education should go
                beyond classroom learning. Students are encouraged to
                participate in projects, internships, research,
                experimentation, industry interaction, technical
                activities and community engagement.
              </p>

            </div>


            {/* Right Highlight Card */}

            <div className="about-highlight-card">

              <div className="about-highlight-logo">
                <img
                  src="/adcet-logo.png"
                  alt="ADCET Logo"
                  className="about-section-logo"
                />
              </div>

              <h3>
                ADCET, Ashta
              </h3>

              <p>
                An Empowered Autonomous Institute
              </p>

              <div className="about-highlight-list">

                <div>
                  <strong>1999</strong>
                  <span>Established</span>
                </div>

                <div>
                  <strong>25+</strong>
                  <span>Acres Campus</span>
                </div>

                <div>
                  <strong>3000+</strong>
                  <span>Students</span>
                </div>

                <div>
                  <strong>A++</strong>
                  <span>NAAC Grade</span>
                </div>

              </div>

            </div>

          </div>


          {/* Campus / Academic Philosophy */}

          <div className="about-information-grid">

            <div className="about-info-card">

              <div className="about-info-icon">
                🏫
              </div>

              <h3>
                A Vibrant Campus
              </h3>

              <p>
                The ADCET campus is spread across more than 25 acres
                in Ashta, Sangli. The campus provides students with
                modern academic facilities, laboratories, playgrounds,
                hostel facilities, internet connectivity and an
                environment conducive to learning.
              </p>

            </div>


            <div className="about-info-card">

              <div className="about-info-icon">
                🎓
              </div>

              <h3>
                Student-Centric Learning
              </h3>

              <p>
                The institute focuses on student-centric learning by
                developing close working relationships between faculty
                and students. Outcome-based education, skill-oriented
                courses, projects and practical learning help students
                develop professional competence.
              </p>

            </div>


            <div className="about-info-card">

              <div className="about-info-icon">
                🔬
              </div>

              <h3>
                Research & Innovation
              </h3>

              <p>
                Students are encouraged to participate in original
                research, experimentation, micro projects, mini projects
                and major projects. Academic collaborations with IITs,
                NITs and research organizations provide additional
                opportunities for learning and innovation.
              </p>

            </div>


            <div className="about-info-card">

              <div className="about-info-icon">
                🤝
              </div>

              <h3>
                Industry Interaction
              </h3>

              <p>
                Strong relationships with engineering and allied
                industries provide students with opportunities for
                internships, industrial exposure, professional training
                and placement preparation.
              </p>

            </div>

          </div>


          {/* Academic Approach */}

          <div className="academic-approach">

            <div className="academic-approach-content">

              <span className="section-tag">
                OUR APPROACH
              </span>

              <h2>
                Learning Beyond the Classroom
              </h2>

              <p>
                At ADCET, education is designed to prepare students
                for real-world challenges. The institute emphasizes
                outcome-based education and encourages students to
                learn through collaboration, projects, research,
                experimentation and industry exposure.
              </p>

              <p>
                Students participate in micro, mini and mega projects,
                internships, technical activities, community engagement
                and research initiatives. These experiences help them
                develop technical knowledge as well as communication,
                leadership, teamwork and problem-solving abilities.
              </p>

            </div>


            <div className="learning-points">

              <div>
                <span>01</span>
                <strong>Outcome Based Education</strong>
                <p>
                  Learning focused on measurable academic and
                  professional outcomes.
                </p>
              </div>

              <div>
                <span>02</span>
                <strong>Project Based Learning</strong>
                <p>
                  Practical learning through real-world engineering
                  projects and experimentation.
                </p>
              </div>

              <div>
                <span>03</span>
                <strong>Industry Exposure</strong>
                <p>
                  Internships, industrial interaction and professional
                  development opportunities.
                </p>
              </div>

              <div>
                <span>04</span>
                <strong>Research & Innovation</strong>
                <p>
                  Encouraging students to explore emerging technologies
                  and research problems.
                </p>
              </div>

            </div>

          </div>


          {/* 4 C's */}

          <div className="four-c-section">

            <div className="section-heading">

              <span>OUR CORE VALUES</span>

              <h2>
                The 4 C's of ADCET
              </h2>

              <p>
                The institute strives to develop engineers who combine
                professional competence with confidence, dedication
                and social responsibility.
              </p>

            </div>


            <div className="four-c-grid">

              <div className="four-c-card">

                <span className="four-c-number">
                  01
                </span>

                <h3>
                  COMPETENCE
                </h3>

                <p>
                  Developing strong technical knowledge, practical
                  skills and professional capabilities.
                </p>

              </div>


              <div className="four-c-card">

                <span className="four-c-number">
                  02
                </span>

                <h3>
                  CONFIDENCE
                </h3>

                <p>
                  Building self-belief, communication skills and the
                  confidence to face professional challenges.
                </p>

              </div>


              <div className="four-c-card">

                <span className="four-c-number">
                  03
                </span>

                <h3>
                  COMMITMENT
                </h3>

                <p>
                  Encouraging dedication towards learning, professional
                  responsibilities and continuous improvement.
                </p>

              </div>


              <div className="four-c-card">

                <span className="four-c-number">
                  04
                </span>

                <h3>
                  COMPASSION
                </h3>

                <p>
                  Developing socially responsible professionals who
                  contribute positively to society.
                </p>

              </div>

            </div>

          </div>


          {/* Vision Mission */}

          <div className="vision-mission-main">

            <div className="vision-main-card">

              <span className="section-tag">
                OUR VISION
              </span>

              <div className="vm-icon">
                👁️
              </div>

              <h2>
                To be a Leader in producing
                professionally competent engineers.
              </h2>

            </div>


            <div className="mission-main-card">

              <span className="section-tag">
                OUR MISSION
              </span>

              <div className="vm-icon">
                🎯
              </div>

              <h2>
                Committed to Excellence
              </h2>

              <p>
                We, Annasaheb Dange College of Engineering &
                Technology, Ashta, are committed to achieve our
                vision by:
              </p>

              <ul>

                <li>
                  <strong>M1.</strong>
                  Imparting effective outcome based education.
                </li>

                <li>
                  <strong>M2.</strong>
                  Preparing students through skill-oriented courses
                  to excel in their profession with ethical values.
                </li>

                <li>
                  <strong>M3.</strong>
                  Promoting research to benefit society.
                </li>

                <li>
                  <strong>M4.</strong>
                  Strengthening relationships with all stakeholders.
                </li>

              </ul>

            </div>

          </div>


          {/* Quality Policy */}

          <div className="quality-policy">

            <div className="quality-policy-heading">

              <span className="section-tag">
                QUALITY POLICY
              </span>

              <h2>
                Continuous Improvement
              </h2>

              <p>
                ADCET intends to continually enhance the performance
                of the institute through structured, coordinated and
                responsible academic and administrative practices.
              </p>

            </div>


            <div className="quality-points">

              <div>
                <span>✓</span>
                <p>
                  Functioning in a structured, organized and
                  coordinated manner.
                </p>
              </div>

              <div>
                <span>✓</span>
                <p>
                  Being conscious about responsibilities and
                  authorities at formal and informal levels.
                </p>
              </div>

              <div>
                <span>✓</span>
                <p>
                  Taking every possible initiative in the role
                  assigned.
                </p>
              </div>

            </div>

          </div>


          {/* Institutional Highlights */}

          <div className="about-features">

            <div className="section-heading">

              <span>WHY ADCET</span>

              <h2>
                Institutional Highlights
              </h2>

            </div>


            <div className="about-feature-grid">

              <div>
                <span>✓</span>
                <p>An Empowered Autonomous Institute</p>
              </div>

              <div>
                <span>✓</span>
                <p>NAAC A++ Grade Accredited Institute</p>
              </div>

              <div>
                <span>✓</span>
                <p>NBA Accredited Programs</p>
              </div>

              <div>
                <span>✓</span>
                <p>AICTE Approved Programs</p>
              </div>

              <div>
                <span>✓</span>
                <p>Modern State-of-the-Art Laboratories</p>
              </div>

              <div>
                <span>✓</span>
                <p>Well Qualified & Experienced Faculty</p>
              </div>

              <div>
                <span>✓</span>
                <p>Excellent Hostel Facilities</p>
              </div>

              <div>
                <span>✓</span>
                <p>College Bus Service</p>
              </div>

              <div>
                <span>✓</span>
                <p>Large Playground & Healthy Campus</p>
              </div>

              <div>
                <span>✓</span>
                <p>High-Speed Internet Connectivity</p>
              </div>

              <div>
                <span>✓</span>
                <p>On-Campus ATM Banking Facility</p>
              </div>

              <div>
                <span>✓</span>
                <p>Modern Classrooms with CCTV Facilities</p>
              </div>

              <div>
                <span>✓</span>
                <p>Strong Industry & Placement Support</p>
              </div>

              <div>
                <span>✓</span>
                <p>Academic Results Above 95%</p>
              </div>

              <div>
                <span>✓</span>
                <p>Student Scholarship Support</p>
              </div>

              <div>
                <span>✓</span>
                <p>Excellent Connectivity from Sangli & Kolhapur</p>
              </div>

            </div>

          </div>

        </div>

      </section>
      {/* ================= PROGRAMS ================= */}

      <section className="program-section">

        <div className="container">

          <div className="section-heading">
            <span>ACADEMIC PROGRAMS</span>

            <h2>
              Explore Our Programs
            </h2>

            <p>
              Build your career with industry-relevant programs
              designed for the technologies of tomorrow.
            </p>
          </div>

          <div className="program-grid">

            {programs.map((program, index) => (
              <article className="program-card" key={index}>

                <div className="program-icon">
                  {program.icon}
                </div>

                <h3>
                  {program.title}
                </h3>

                <p>
                  {program.description}
                </p>

                <a href="/courses">
                  View Program →
                </a>

              </article>
            ))}

          </div>

          <div className="center-btn">
            <a href="/courses" className="primary-btn">
              View All Courses
            </a>
          </div>

        </div>

      </section>

      {/* ================= NOTICES + ADMISSION ================= */}

      <section className="notice-section">

        <div className="container notice-grid">

          <div className="notice-content">

            <span className="section-tag">
              IMPORTANT UPDATES
            </span>

            <h2>
              Latest Notices & Announcements
            </h2>

            <div className="notice-list">

              {notices.map((notice, index) => (
                <a
                  href="/notices"
                  key={index}
                  className="notice-item"
                >

                  <span className="notice-icon">
                    📄
                  </span>

                  <div>
                    <h4>
                      {notice.title}
                    </h4>

                    <p>
                      {notice.date} • View official notice
                    </p>
                  </div>

                  <span className="arrow">
                    →
                  </span>

                </a>
              ))}

            </div>

            <a
              href="/notices"
              className="primary-btn small-btn"
            >
              View All Notices
            </a>

          </div>

          <div className="admission-card">

            <span>
              ADMISSIONS 2026–27
            </span>

            <h3>
              Begin Your
              <br />
              Engineering Journey
            </h3>

            <p>
              Take the first step towards becoming a
              professionally competent engineer at ADCET.
            </p>

            <ul>
              <li>✓ Undergraduate Programs</li>
              <li>✓ Postgraduate Programs</li>
              <li>✓ Merit-Based Opportunities</li>
              <li>✓ Student Support</li>
            </ul>

            <a
              href="/admissions"
              className="white-btn"
            >
              Admission Details →
            </a>

          </div>

        </div>

      </section>

      {/* ================= FACILITIES ================= */}

      <section className="facility-section">

        <div className="container">

          <div className="section-heading">

            <span>
              CAMPUS LIFE
            </span>

            <h2>
              Facilities That Support
              Student Success
            </h2>

            <p>
              A learning environment designed to support academics,
              innovation, recreation and personal development.
            </p>

          </div>

          <div className="facility-grid">

            {facilities.map((facility, index) => (
              <div
                className="facility-card"
                key={index}
              >

                <div className="facility-icon">
                  {facility.icon}
                </div>

                <div>
                  <h3>
                    {facility.title}
                  </h3>

                  <p>
                    {facility.text}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ================= PLACEMENTS ================= */}

      <section className="placement-section">

        <div className="container">

          <div className="section-heading light">

            <span>
              CAREER EXCELLENCE
            </span>

            <h2>
              Placement Highlights
            </h2>

            <p>
              Strong industry relationships and career-focused
              training help students prepare for professional life.
            </p>

          </div>

          <div className="placement-grid">

            {placements.map((item, index) => (
              <div
                className="placement-card"
                key={index}
              >
                <h3>
                  {item.value}
                </h3>

                <p>
                  {item.label}
                </p>
              </div>
            ))}

          </div>

          <div className="placement-bottom">

            <p>
              Students receive support through training,
              industry interaction, recruitment drives and
              career development activities.
            </p>

            <a
              href="/contact"
              className="white-btn"
            >
              Contact Placement Cell →
            </a>

          </div>

        </div>

      </section>

      {/* ================= FACULTY ================= */}

      <section className="faculty-preview">

        <div className="container">

          <div className="section-heading">

            <span>
              OUR PEOPLE
            </span>

            <h2>
              Learn From Experienced Faculty
            </h2>

            <p>
              Dedicated faculty members combine academic knowledge,
              research and industry exposure to support student growth.
            </p>

          </div>

          <div className="faculty-grid">

            <div className="faculty-card">

              <div className="faculty-avatar">
                👨‍🏫
              </div>

              <h3>
                Experienced Faculty
              </h3>

              <p>
                Qualified and experienced educators focused on
                academic excellence and student development.
              </p>

            </div>

            <div className="faculty-card">

              <div className="faculty-avatar">
                🔬
              </div>

              <h3>
                Research & Innovation
              </h3>

              <p>
                Encouraging students to explore research,
                experimentation and emerging technologies.
              </p>

            </div>

            <div className="faculty-card">

              <div className="faculty-avatar">
                🤝
              </div>

              <h3>
                Industry Interaction
              </h3>

              <p>
                Connecting academic learning with practical
                industry requirements and professional experience.
              </p>

            </div>

          </div>

          <div className="center-btn">

            <a
              href="/faculty"
              className="primary-btn"
            >
              Meet Our Faculty
            </a>

          </div>

        </div>

      </section>

      {/* ================= FAQ ================= */}

      <section className="faq-preview">

        <div className="container faq-grid">

          <div>

            <span className="section-tag">
              NEED HELP?
            </span>

            <h2>
              Frequently Asked Questions
            </h2>

            <p>
              Find answers to commonly asked questions about
              admissions, courses, facilities and placements.
            </p>

            <a
              href="/faq"
              className="text-btn"
            >
              View All FAQs →
            </a>

          </div>

          <div className="faq-box">

            <a href="/faq">
              <strong>
                How can I apply for admission?
              </strong>

              <span>
                +
              </span>
            </a>

            <a href="/faq">
              <strong>
                What courses are available?
              </strong>

              <span>
                +
              </span>
            </a>

            <a href="/faq">
              <strong>
                Does ADCET provide hostel facilities?
              </strong>

              <span>
                +
              </span>
            </a>

            <a href="/faq">
              <strong>
                What are the placement opportunities?
              </strong>

              <span>
                +
              </span>
            </a>

          </div>

        </div>

      </section>

      {/* ================= AFFILIATION & AWARDS ================= */}

      <section className="awards-section">
        <div className="container">
          <div className="awards-grid">
            {awards.map((a, i) => (
              <div className="award-card" key={i}>
                <div className="award-img">
                  <img src={a.img} alt={a.title} />
                </div>
                <p>{a.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR DESK ================= */}

      <section className="desk-section">
        <div className="container">
          <div className="section-heading">
            <span>OUR DESK</span>
            <h2>Message from the Leadership</h2>
            <p>
              The vision and guidance of our founder, secretary, joint secretary
              and director continue to shape ADCET into a centre of excellence.
            </p>
          </div>

          <div className="desk-grid">
            {deskMembers.map((m, i) => (
              <a className="desk-card" key={i} href="#">
                <div className="desk-photo">
                  <img src={m.img} alt={m.name} />
                </div>
                <h3>{m.name}</h3>
                <span>{m.role}</span>
                <p className="desk-read">Read More →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}

      <section className="home-highlights">
        <div className="container highlights-grid">
          <div>
            <h3>180+</h3>
            <p>Companies Visiting</p>
          </div>
          <div>
            <h3>2281</h3>
            <p>Total Placed</p>
          </div>
          <div>
            <h3>40 LPA</h3>
            <p>Highest Package</p>
          </div>
          <div>
            <h3>4 LPA</h3>
            <p>Average Package</p>
          </div>
        </div>
      </section>

      {/* ================= RECRUITERS ================= */}

      <section className="recruiters-section">
        <div className="container">
          <div className="section-heading">
            <span>OUR RECRUITERS</span>
            <h2>Companies That Trust ADCET</h2>
          </div>
          <div className="recruiter-img">
            <img src={recruitersImg} alt="Our Recruiters" />
          </div>
        </div>
      </section>

      {/* ================= ACHIEVEMENTS ================= */}

      <section className="achievements-section">
        <div className="container">
          <div className="section-heading">
            <span>OUR ACHIEVEMENTS</span>
            <h2>Congratulations to Achievers</h2>
          </div>
          <div className="gallery-grid">
            {achievements.map((src, i) => (
              <a className="gallery-card" key={i} href="#">
                <img src={src} alt="Achievement" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VIDEOS ================= */}

      <section className="video-section">
        <div className="container">
          <div className="section-heading">
            <span>OUR VIDEOS</span>
            <h2>Watch ADCET in Action</h2>
          </div>
          <div className="video-card">
            <iframe
              title="ADCET Video"
              src="https://www.youtube.com/embed/FlRiUc-vHFc"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* ================= RECENT ACTIVITIES ================= */}

      <section className="activities-section">
        <div className="container">
          <div className="section-heading">
            <span>RECENT ACTIVITIES</span>
            <h2>What's Happening at ADCET</h2>
          </div>
          <div className="activity-grid">
            {activities.map((a, i) => (
              <a className="activity-card" key={i} href="#">
                <div className="activity-img">
                  <img src={a.img} alt={a.title} />
                </div>
                <h3>{a.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WE ARE IN NEWS ================= */}

      <section className="news-media-section">
        <div className="container">
          <div className="section-heading">
            <span>WE ARE IN NEWS</span>
            <h2>ADCET in the Media</h2>
          </div>
          <div className="news-media-grid">
            {newsImages.map((src, i) => (
              <a className="news-media-card" key={i} href="#">
                <img src={src} alt="In News" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DOWNLOADS ================= */}

      <section className="downloads-section">
        <div className="container">
          <div className="section-heading">
            <span>DOWNLOADS</span>
            <h2>Important Downloads</h2>
          </div>
          <div className="downloads-list">
            {downloads.map((d, i) => (
              <a
                className="download-item"
                key={i}
                href={d.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="download-icon">📄</span>
                <span className="download-title">{d.title}</span>
                <span className="download-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT CTA ================= */}

      <section className="contact-cta">

        <div className="container contact-cta-content">

          <div>

            <span>
              START YOUR JOURNEY
            </span>

            <h2>
              Ready to Take the Next Step?
            </h2>

            <p>
              Get in touch with ADCET for admissions,
              courses, campus information or general enquiries.
            </p>

          </div>

          <div className="cta-buttons">

            <a
              href="/admissions"
              className="white-btn"
            >
              Admissions →
            </a>

            <a
              href="/contact"
              className="outline-white-btn"
            >
              Contact Us
            </a>

          </div>

        </div>

      </section>

    </div>
  );
};

export default HomePage;