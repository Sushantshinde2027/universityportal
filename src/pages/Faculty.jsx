import React from "react";
import "../App.css";

function Faculty() {
  const departments = [
    {
      name: "Computer Science & Engineering",
      faculty: [
        {
          name: "Dr. Suhel S. Sayyad",
          designation: "Professor & Head of Department",
          qualification: "B.E. (Computer Science), M.Tech. (Computer Science), Ph.D.",
          expertise: "Information Security, High Performance Computing",
          experience: "16.5 Years",
        },
        {
          name: "Dr. Arifa J. Shikalgar",
          designation: "Associate Professor",
          qualification: "Ph.D. (CSE)",
          expertise: "Machine Learning, Computer Vision",
          experience: "17 Years",
        },
      ],
    },

    {
      name: "Artificial Intelligence & Data Science",
      faculty: [
        {
          name: "Dr. Asma A. Shaikh",
          designation: "Professor & Head of Department",
          qualification:
            "Post Doc (CSE), Ph.D. (CSE), MCA, M.E. (Computer Engineering), AMIE",
          expertise: "Artificial Intelligence, Data Science, Image Processing",
          experience: "18 Years",
        },
        {
          name: "Dr. Krishna Kumar L.",
          designation: "Professor",
          qualification: "Ph.D. (Artificial Intelligence and IOT)",
          expertise: "Data Science and Data Warehousing",
          experience: "16 Years",
        },
        {
          name: "Miss. Sonali Satish Malame",
          designation: "Assistant Professor",
          qualification: "M.Tech (CSE)",
          expertise: "Web Development, Machine Learning, Artificial Intelligence",
          experience: "7.9 Years",
        },
        {
          name: "Mrs. Prajakta Satyavijay Dabade",
          designation: "Assistant Professor",
          qualification: "M.Tech (CSE)",
          expertise: "Machine Learning, Artificial Intelligence",
          experience: "4 Years",
        },
        {
          name: "Miss. Gayatri Suresh Sutar",
          designation: "Assistant Professor",
          qualification: "M.Tech (CSE)",
          expertise: "DBMS, C, Java, Computer Networks, IOT",
          experience: "10 Years",
        },
      ],
    },

    {
      name: "Robotics & Artificial Intelligence",
      faculty: [
        {
          name: "Dr. Sunita Sunil Shinde",
          designation: "Professor & Head of Department",
          qualification: "B.E., M.E., Ph.D.",
          expertise: "Wireless Communication and IOT",
          experience: "25 Years",
        },
        {
          name: "Prof. Makarand Madhav Kolekar",
          designation: "Assistant Professor",
          qualification: "M.Tech",
          expertise: "Manufacturing Engineering, AI & Data Science",
          experience: "13 Years",
        },
        {
          name: "Mr. Yogesh V. Koli",
          designation: "Assistant Professor",
          qualification: "M.E. (Electronics)",
          expertise: "Industrial Robotics & Automation, Embedded System",
          experience: "12 Years",
        },
        {
          name: "Mrs. Shital D. Kolekar",
          designation: "Assistant Professor",
          qualification: "M.E. (CSE), Ph.D. (Pursuing)",
          expertise: "Cloud Computing, IOT",
          experience: "7.5 Years",
        },
        {
          name: "Mrs. Rutuja Suraj Pawar",
          designation: "Assistant Professor",
          qualification: "B.E. (Electrical), M.Tech (Electrical Power System)",
          expertise: "Electric Power System",
          experience: "6 Years",
        },
      ],
    },

    {
      name: "Basic Science",
      faculty: [
        {
          name: "Dr. Santosh Shivaji Desai",
          designation: "Associate Professor & Head",
          qualification: "M.Sc. (Mathematics), Ph.D.",
          expertise: "Mathematics, Fuzzy Choice Theory",
          experience: "16 Years",
        },
        {
          name: "Mrs. Vijayalaxmi Maruti Vairat",
          designation: "Assistant Professor",
          qualification: "M.Sc., M.Phil.",
          expertise: "Chemistry",
          experience: "28 Years",
        },
      ],
    },

    {
      name: "Aeronautical Engineering",
      faculty: [
        {
          name: "Mr. Basithrahman A",
          designation: "Assistant Professor",
          qualification: "M.E. (Aeronautical Engineering)",
          expertise:
            "Composite Materials and Structures, Aircraft Structures, Finite Element Methods",
          experience: "7 Years",
        },
        {
          name: "Mr. Karthik Pullela",
          designation: "Assistant Professor",
          qualification: "M.Tech",
          expertise:
            "Aerospace Propulsion, Computational Fluid Dynamics, Aircraft Design",
          experience: "1 Year",
        },
        {
          name: "Prof. Mohammed Hashim Y",
          designation: "Assistant Professor",
          qualification: "M.E.",
          expertise: "UAV and Flight Dynamics",
          experience: "11 Years",
        },
        {
          name: "Prof. Arun Nema",
          designation: "Assistant Professor",
          qualification: "M.Tech",
          expertise:
            "Aerodynamics, Computational Fluid Dynamics, Fluid Mechanics",
          experience: "14 Years",
        },
      ],
    },
  ];

  return (
    <main className="faculty-page">
      {/* Header */}
      <header className="faculty-header">
        <h1>Faculty</h1>
        <p>
          Annasaheb Dange College of Engineering and Technology (ADCET), Ashta
          has a team of experienced and qualified faculty members across
          different academic departments.
        </p>
      </header>

      {/* Faculty Departments */}
      <section className="faculty-content">
        {departments.map((department, departmentIndex) => (
          <section
            className="faculty-department"
            key={departmentIndex}
          >
            <div className="department-heading">
              <h2>{department.name}</h2>
              <span>{department.faculty.length} Faculty Members</span>
            </div>

            <div className="faculty-grid">
              {department.faculty.map((member, index) => (
                <article className="faculty-card" key={index}>
                  <div className="faculty-avatar">
                    {member.name
                      .replace("Dr. ", "")
                      .replace("Mrs. ", "")
                      .replace("Mr. ", "")
                      .replace("Miss. ", "")
                      .replace("Prof. ", "")
                      .charAt(0)}
                  </div>

                  <div className="faculty-info">
                    <h3>{member.name}</h3>

                    <p className="faculty-designation">
                      {member.designation}
                    </p>

                    <div className="faculty-details">
                      <p>
                        <strong>Qualification:</strong>{" "}
                        {member.qualification}
                      </p>

                      <p>
                        <strong>Area of Expertise:</strong>{" "}
                        {member.expertise}
                      </p>

                      <p>
                        <strong>Experience:</strong>{" "}
                        {member.experience}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </section>

      {/* Faculty Note */}
      <section className="faculty-note">
        <h2>Experienced Faculty</h2>

        <p>
          ADCET is supported by dedicated faculty members who contribute to
          teaching, research, innovation, student development and industry
          collaboration across various disciplines.
        </p>
      </section>
    </main>
  );
}

export default Faculty;
