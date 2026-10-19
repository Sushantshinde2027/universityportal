import React from "react";
import "../App.css";

function Notices() {
  const notices = [
    {
      day: "15",
      month: "Aug",
      year: "2026",
      title: "Admissions Open for Academic Year 2026–27",
      text: "ADCET invites applications for B.Tech and M.Tech programs. Interested candidates may apply through the admission portal.",
    },
    {
      day: "10",
      month: "Aug",
      year: "2026",
      title: "ADCET Hackathon 2026 – Season 3",
      text: "Sustainable Development Goals (SDGs) – Vikasit Bharat-2047. Registration open for all eligible students.",
    },
    {
      day: "02",
      month: "Aug",
      year: "2026",
      title: "AICTE Scholarship / Fellowship Schemes",
      text: "Students are advised to apply for the AICTE Scholarship and Fellowship Schemes through the official portal.",
    },
    {
      day: "25",
      month: "Jul",
      year: "2026",
      title: "Exam Schedule – Odd Semester 2026–27",
      text: "The examination schedule for the odd semester has been published. Students should check the notice board.",
    },
    {
      day: "18",
      month: "Jul",
      year: "2026",
      title: "ADCET Alumni Database Update Form",
      text: "All alumni are requested to update their details using the official alumni database update form.",
    },
  ];

  return (
    <main className="notices-page">
      <header className="notices-header">
        <h1>Latest Notices</h1>
        <p>
          Announcements, circulars and important updates from Annasaheb Dange
          College of Engineering and Technology (ADCET), Ashta.
        </p>
      </header>

      <div className="notices-list">
        {notices.map((notice, index) => (
          <article className="notice-card" key={index}>
            <div className="notice-date">
              <span className="notice-day">{notice.day}</span>
              <span className="notice-month">{notice.month}</span>
              <span className="notice-year">{notice.year}</span>
            </div>

            <div className="notice-content">
              <h2>{notice.title}</h2>
              <p>{notice.text}</p>
              <button className="notice-button">View Details</button>
            </div>
          </article>
        ))}
      </div>

      <section className="notices-info">
        <h2>Stay Updated</h2>
        <p>
          For the latest circulars, admission information, examination
          schedules and academic updates, please keep visiting the Notices
          section. For any clarification, contact the respective department or
          the admission cell.
        </p>
      </section>
    </main>
  );
}

export default Notices;
