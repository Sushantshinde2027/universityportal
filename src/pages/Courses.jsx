import React from "react";
import "../App.css";

function Courses() {
  const undergraduateCourses = [
    {
      name: "Mechanical Engineering",
      intake: "120",
      year: "1999",
    },
    {
      name: "Computer Science & Engineering",
      intake: "180",
      year: "2001",
    },
    {
      name: "Electrical Engineering",
      intake: "120",
      year: "2004",
    },
    {
      name: "Civil Engineering",
      intake: "120",
      year: "2010",
    },
    {
      name: "Aeronautical Engineering",
      intake: "60",
      year: "2013",
    },
    {
      name: "Food Technology",
      intake: "30",
      year: "2019",
    },
    {
      name: "Artificial Intelligence (AI) and Data Science",
      intake: "120",
      year: "2021",
    },
    {
      name: "Computer Science & Engineering (Internet of Things and Cyber Security Including Block Chain Technology)",
      intake: "60",
      year: "2021",
    },
    {
      name: "Robotics And Artificial Intelligence",
      intake: "60",
      year: "2025",
    },
    {
      name: "Electronics and Telecommunication Engineering",
      intake: "60",
      year: "2026",
    },
  ];

  const otherCourses = [
    {
      name: "Bachelor of Business Administration (BBA)",
      intake: "200",
      year: "2024",
    },
    {
      name: "Bachelor of Computer Application (BCA)",
      intake: "60",
      year: "2024",
    },
  ];

  const postgraduateCourses = [
    {
      name: "Mechanical Engineering Design",
      intake: "12",
      year: "2025",
    },
    {
      name: "Computer Science And Engineering",
      intake: "12",
      year: "2025",
    },
    {
      name: "Electrical Power System",
      intake: "12",
      year: "2025",
    },
    {
      name: "Civil Engineering (Computer Aided Structural Engineering)",
      intake: "12",
      year: "2025",
    },
  ];

  return (
    <main className="courses-page">
      <header className="page-header">
        <h1>Courses</h1>
        <p>
          ADCET offers undergraduate and postgraduate programs in engineering,
          technology, computer applications and management.
        </p>
      </header>

      {/* B.Tech Programs */}
      <section className="courses-section">
        <div className="section-heading">
          <h2>Program Offered: B.Tech</h2>
          <p>Undergraduate Engineering Programs</p>
        </div>

        <div className="courses-grid">
          {undergraduateCourses.map((course, index) => (
            <article className="course-card" key={index}>
              <div className="course-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="course-info">
                <h3>{course.name}</h3>

                <div className="course-details">
                  <span>
                    <strong>Intake:</strong> {course.intake}
                  </span>

                  <span>
                    <strong>Started:</strong> {course.year}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* BBA / BCA */}
      <section className="courses-section">
        <div className="section-heading">
          <h2>Other Undergraduate Programs</h2>
          <p>Management and Computer Application Programs</p>
        </div>

        <div className="courses-grid">
          {otherCourses.map((course, index) => (
            <article className="course-card" key={index}>
              <div className="course-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="course-info">
                <h3>{course.name}</h3>

                <div className="course-details">
                  <span>
                    <strong>Intake:</strong> {course.intake}
                  </span>

                  <span>
                    <strong>Started:</strong> {course.year}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* M.Tech Programs */}
      <section className="courses-section">
        <div className="section-heading">
          <h2>Program Offered: M.Tech (PG)</h2>
          <p>Postgraduate Engineering Programs</p>
        </div>

        <div className="courses-grid">
          {postgraduateCourses.map((course, index) => (
            <article className="course-card" key={index}>
              <div className="course-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="course-info">
                <h3>{course.name}</h3>

                <div className="course-details">
                  <span>
                    <strong>Intake:</strong> {course.intake}
                  </span>

                  <span>
                    <strong>Started:</strong> {course.year}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Admission Note */}
      <section className="courses-note">
        <h2>Admission Information</h2>
        <p>
          Admission to the various programs is subject to the eligibility
          criteria and admission procedure prescribed by the concerned
          authorities. Students are advised to refer to the official admission
          information for the latest details.
        </p>
      </section>
    </main>
  );
}

export default Courses;
