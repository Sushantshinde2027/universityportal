import React from "react";
import "../App.css";

function Admissions() {
  return (
    <main className="admissions-page">
      <header className="page-header">
        <h1>Admissions</h1>
      </header>

      <section className="admissions-content">
        <p>
          Admissions are open for the academic year 2026-27.
        </p>

        <div className="admission-info">
          <h2>Admission Information</h2>

          <p>
            Annasaheb Dange College of Engineering and Technology (ADCET),
            Ashta offers admission to various undergraduate and postgraduate
            engineering programs.
          </p>

          <p>
            Students seeking admission are advised to check the eligibility
            criteria, admission schedule, required documents, and application
            procedure before applying.
          </p>
        </div>

        <div className="admission-sections">
          <div className="admission-card">
            <h3>Undergraduate Admissions</h3>
            <p>
              Admissions are available for various B.Tech engineering programs
              through the applicable admission process.
            </p>
          </div>

          <div className="admission-card">
            <h3>Eligibility</h3>
            <p>
              Candidates must satisfy the prescribed academic and entrance
              examination requirements for the selected program.
            </p>
          </div>

          <div className="admission-card">
            <h3>Required Documents</h3>
            <p>
              Students should keep their academic certificates, identity
              documents, photographs, and other required admission documents
              ready.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Admissions;