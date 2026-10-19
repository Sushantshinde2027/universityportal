import React, { useState } from "react";
import "../App.css";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is ADCET?",
      answer:
        "Annasaheb Dange College of Engineering and Technology (ADCET), Ashta is an autonomous engineering institute affiliated to Shivaji University, Kolhapur and approved by AICTE, New Delhi.",
    },
    {
      question: "Where is ADCET located?",
      answer:
        "ADCET is located at Ashta, in Walwa Taluka of Sangli district, Maharashtra.",
    },
    {
      question: "What courses are offered at ADCET?",
      answer:
        "ADCET offers undergraduate and postgraduate programs in various engineering and technology disciplines, along with programs in areas such as Computer Applications and Business Administration.",
    },
    {
      question: "How can I apply for admission?",
      answer:
        "Students seeking admission should follow the admission procedure prescribed by the relevant admission authorities. Candidates should check the official admission information for eligibility, application procedure, important dates and required documents.",
    },
    {
      question: "Is ADCET an autonomous institute?",
      answer:
        "Yes. Annasaheb Dange College of Engineering and Technology, Ashta is an Empowered Autonomous Institute affiliated to Shivaji University, Kolhapur.",
    },
    {
      question: "Is ADCET approved by AICTE?",
      answer:
        "Yes. The engineering programs offered by ADCET are approved by the All India Council for Technical Education (AICTE), New Delhi.",
    },
    {
      question: "Is ADCET accredited by NAAC?",
      answer:
        "Yes. ADCET has been accredited by the National Assessment and Accreditation Council (NAAC) with an A++ grade.",
    },
    {
      question: "Are hostel facilities available?",
      answer:
        "Yes. ADCET provides hostel facilities for students along with campus amenities and other student support facilities.",
    },
    {
      question: "Does ADCET provide placement assistance?",
      answer:
        "Yes. The institute has a dedicated Training and Placement system that supports students through placement activities, industry interaction, training programs and recruitment opportunities.",
    },
    {
      question: "How can I contact ADCET?",
      answer:
        "Students and visitors can contact the institute through the official contact details provided on the ADCET website or visit the Contact Us section of this website.",
    },
    {
      question: "Where can I find the latest college notices?",
      answer:
        "Latest announcements, circulars, academic updates, examination information and other notices can be found in the Notices section of the website.",
    },
    {
      question: "Where can I find information about faculty members?",
      answer:
        "Faculty information is available department-wise. Students can visit the Faculty section to view information about faculty members and their respective departments.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="faq-page">
      <header className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>
          Find answers to commonly asked questions about ADCET, admissions,
          courses, facilities, placements and academics.
        </p>
      </header>

      <section className="faq-list">
        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${openIndex === index ? "faq-item-open" : ""
              }`}
            key={index}
          >
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              <span>
                <strong>Q.</strong> {faq.question}
              </span>

              <span className="faq-icon">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="faq-answer">
                <strong>A.</strong>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="faq-contact">
        <h2>Still Have Questions?</h2>
        <p>
          If you cannot find the information you are looking for, please
          contact ADCET through the Contact Us section.
        </p>
      </section>
    </main>
  );
}

export default FAQ;