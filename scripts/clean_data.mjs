import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const INPUT_FILE = resolve(ROOT, "data/website_content.txt");
const OUTPUT_FILE = resolve(ROOT, "data/cleaned_content.txt");


function fixEncoding(text) {
    const replacements = {
        "â€“": "-",
        "â€”": "-",
        "â€˜": "'",
        "â€™": "'",
        "â€œ": '"',
        "â€": '"',
        "Â©": "(c)",
        "Â": "",
    };

    for (const [oldText, newText] of Object.entries(replacements)) {
        text = text.split(oldText).join(newText);
    }

    return text;
}


console.log("=".repeat(55));
console.log("   ADCET - STRUCTURED DATA CLEANING");
console.log("=".repeat(55));


// --------------------------------------------------
// READ RAW SCRAPED CONTENT
// --------------------------------------------------

const rawText = readFileSync(INPUT_FILE, "utf-8");

console.log(`\nRaw characters: ${rawText.length}`);


// --------------------------------------------------
// FIX ENCODING
// --------------------------------------------------

const fixedText = fixEncoding(rawText);


// --------------------------------------------------
// STRUCTURED KNOWLEDGE BASE
// (curated from the scraped portal pages, same as the
//  reference clean_data.py which curates by hand)
// --------------------------------------------------

const cleanedText = `
ANNASHEB DANGE COLLEGE OF ENGINEERING AND TECHNOLOGY

COLLEGE OVERVIEW

Annasaheb Dange College of Engineering and Technology (ADCET), Ashta is a college of engineering and technology located at Ashta, Dist. Sangli, Maharashtra - 416301.
ADCET is run by Sant Dnyaneshwar Shikshan Sanstha.
ADCET was established in the year 1999.
ADCET is an Empowered Autonomous Institute affiliated to Shivaji University, Kolhapur, Maharashtra.
ADCET is approved by the All India Council for Technical Education (AICTE), New Delhi.
ADCET is one of the prominent institutions of higher technical education in Western Maharashtra.
The institute is committed to producing professionally competent engineers who can contribute meaningfully to society and nation building.
The ADCET campus is spread across more than 25 acres in Ashta, Sangli.
The college has more than 3000 students.
The DTE code of the college is 06283.

ACCREDITATION AND APPROVALS

ADCET is accredited by NAAC with A++ Grade.
ADCET programs are accredited by the National Board of Accreditation (NBA), New Delhi.
ADCET is approved by AICTE, New Delhi.
ADCET is ISO 9001:2015 certified.
ADCET is an Empowered Autonomous Institute.
ADCET is affiliated to Shivaji University, Kolhapur.
ADCET is accredited by TCS, Mumbai.
Final year results of the college are above 95 percent.

VISION

To be a Leader in producing professionally competent engineers.

MISSION

The college is committed to achieve its vision by the following mission statements.
M1. Imparting effective outcome based education.
M2. Preparing students through skill-oriented courses to excel in their profession with ethical values.
M3. Promoting research to benefit society.
M4. Strengthening relationships with all stakeholders.

QUALITY POLICY

The college intends to continually enhance the performance of the institute through structured, coordinated and responsible academic and administrative practices.
The college functions in a structured, organized and coordinated manner.
The college is conscious about responsibilities and authorities at formal and informal levels.
The college takes every possible initiative in the role assigned.

CORE VALUES

The 4 C's of the college are Competence, Confidence, Commitment and Compassion.
Competence means developing strong technical knowledge, practical skills and professional capabilities.
Confidence means building self-belief, communication skills and the confidence to face professional challenges.
Commitment means encouraging dedication towards learning, professional responsibilities and continuous improvement.
Compassion means developing socially responsible professionals who contribute positively to society.

BTECH PROGRAMS

The college offers the Bachelor of Technology (B.Tech) undergraduate engineering program.
Mechanical Engineering: Intake 120 seats, started in 1999.
Computer Science and Engineering: Intake 180 seats, started in 2001.
Electrical Engineering: Intake 120 seats, started in 2004.
Civil Engineering: Intake 120 seats, started in 2010.
Aeronautical Engineering: Intake 60 seats, started in 2013.
Food Technology: Intake 30 seats, started in 2019.
Artificial Intelligence and Data Science: Intake 120 seats, started in 2021.
Computer Science and Engineering (Internet of Things and Cyber Security Including Block Chain Technology): Intake 60 seats, started in 2021.
Robotics and Artificial Intelligence: Intake 60 seats, started in 2025.
Electronics and Telecommunication Engineering: Intake 60 seats, started in 2026.
Admission to B.Tech is through the applicable state admission process for the academic year 2026-27.

OTHER UNDERGRADUATE PROGRAMS

The college offers other undergraduate programs in management and computer applications.
Bachelor of Business Administration (BBA): Intake 200 seats, started in 2024.
Bachelor of Computer Application (BCA): Intake 60 seats, started in 2024.

MTECH PROGRAMS

The college offers Master of Technology (M.Tech) postgraduate engineering programs.
Mechanical Engineering Design: Intake 12 seats, started in 2025.
Computer Science and Engineering: Intake 12 seats, started in 2025.
Electrical Power System: Intake 12 seats, started in 2025.
Civil Engineering (Computer Aided Structural Engineering): Intake 12 seats, started in 2025.

ADMISSION INFORMATION

Admissions are open for the academic year 2026-27.
The college offers admission to various undergraduate and postgraduate engineering programs.
Students seeking admission are advised to check the eligibility criteria, admission schedule, required documents and application procedure before applying.
Admissions are available for various B.Tech engineering programs through the applicable admission process.
Admission to the various programs is subject to the eligibility criteria and admission procedure prescribed by the concerned authorities.
Students are advised to refer to the official admission information for the latest details.
For admission related queries students may contact the college on phone number +91-8600600700 or by email at director@adcet.in.

ADMISSION ELIGIBILITY

Candidates must satisfy the prescribed academic and entrance examination requirements for the selected program.
For B.Tech admission candidates must have passed the required higher secondary or equivalent examination with the prescribed subjects and marks.
B.Tech admission is through the CAP admission process of the State Common Entrance Test Cell, Maharashtra.
Candidates seeking admission to M.Tech programs must hold a relevant Bachelor's degree in engineering or technology.

REQUIRED DOCUMENTS

Students should keep their academic certificates, identity documents, photographs and other required admission documents ready.
Students should keep the School Leaving Certificate, mark sheets, caste certificate and income certificate where applicable for the admission process.

SCHOLARSHIPS AND LOANS

Scholarship support is available for deserving students in their educational journey.
AICTE Scholarship and Fellowship Schemes are available for eligible students.
Students are advised to apply for the AICTE Scholarship and Fellowship Schemes through the official portal.
Scholarships for students are also available through the MahaDBT portal and the National Scholarship Portal.
The college provides 100 percent support for availing educational loans through nationalized banks.
The college offers robust student scholarship support while protecting against excessive student debt.

PLACEMENTS

The college has a dedicated placement cell that supports students through training, industry interaction, recruitment drives and career development activities.
A total of 2281 students have been placed through the placement activities of the college.
The highest package offered to students is 40 LPA.
The average package offered to students is 4 LPA.
More than 180 recruiting companies visit the college for recruitment.
Strong industry relationships and career-focused training help students prepare for professional life.
Students receive support through training, industry interaction, recruitment drives and career development activities.

CAMPUS FACILITIES

The college campus provides modern academic facilities, laboratories, playgrounds, hostel facilities and internet connectivity.
The college has modern state-of-the-art laboratories supporting practical learning, experimentation and research.
The college has well-equipped learning resources and library facilities designed to support academic excellence and student development.
The college provides comfortable hostel facilities and student support services for campus residents.
The college runs a bus service connecting students with nearby cities and surrounding areas.
The college has a large playground and facilities encouraging sports, fitness and extracurricular activities.
The college has high-speed internet connectivity with a 500 Mbps leased line supporting digital learning.
The college has an on campus ATM banking facility.
The classrooms of the college are modern and equipped with CCTV cameras.
The campus is described as a large, beautiful and healthy campus.

HOSTEL AND TRANSPORT

Hostel facilities are available for students on the college campus.
The college provides excellent hostel facilities for students.
College bus service is available for students from nearby cities and surrounding areas including Islampur, Kolhapur and Sangli.
The college has excellent connectivity from Islampur, Kolhapur and Sangli.

RESEARCH AND INNOVATION

Students are encouraged to participate in original research, experimentation, micro projects, mini projects and major projects.
Academic collaborations with IITs, NITs and research organizations provide additional opportunities for learning and innovation.
The college encourages students to explore emerging technologies and research problems.
Students participate in micro, mini and mega projects, internships, technical activities, community engagement and research initiatives.

INDUSTRY INTERACTION

Strong relationships with engineering and allied industries provide students with opportunities for internships, industrial exposure, professional training and placement preparation.
Active ties with engineering and allied industries extend employment opportunities available to students.
The college emphasizes outcome based education and project based learning for real world engineering challenges.

FACULTY OF COMPUTER SCIENCE AND ENGINEERING

The Computer Science and Engineering department has 2 faculty members.
Dr. Suhel S. Sayyad is Professor and Head of the Department. Qualification: B.E. (Computer Science), M.Tech. (Computer Science), Ph.D. Area of expertise: Information Security, High Performance Computing. Experience: 16.5 Years.
Dr. Arifa J. Shikalgar is Associate Professor. Qualification: Ph.D. (CSE). Area of expertise: Machine Learning, Computer Vision. Experience: 17 Years.

FACULTY OF ARTIFICIAL INTELLIGENCE AND DATA SCIENCE

The Artificial Intelligence and Data Science department has 5 faculty members.
Dr. Asma A. Shaikh is Professor and Head of the Department. Qualification: Post Doc (CSE), Ph.D. (CSE), MCA, M.E. (Computer Engineering), AMIE. Area of expertise: Artificial Intelligence, Data Science, Image Processing. Experience: 18 Years.
Dr. Krishna Kumar L. is Professor. Qualification: Ph.D. (Artificial Intelligence and IOT). Area of expertise: Data Science and Data Warehousing. Experience: 16 Years.
Miss Sonali Satish Malame is Assistant Professor. Qualification: M.Tech (CSE). Area of expertise: Web Development, Machine Learning, Artificial Intelligence. Experience: 7.9 Years.
Mrs. Prajakta Satyavijay Dabade is Assistant Professor. Qualification: M.Tech (CSE). Area of expertise: Machine Learning, Artificial Intelligence. Experience: 4 Years.
Miss Gayatri Suresh Sutar is Assistant Professor. Qualification: M.Tech (CSE). Area of expertise: DBMS, C, Java, Computer Networks, IOT. Experience: 10 Years.

FACULTY OF ROBOTICS AND ARTIFICIAL INTELLIGENCE

The Robotics and Artificial Intelligence department has 5 faculty members.
Dr. Sunita Sunil Shinde is Professor and Head of the Department. Qualification: B.E., M.E., Ph.D. Area of expertise: Wireless Communication and IOT. Experience: 25 Years.
Prof. Makarand Madhav Kolekar is Assistant Professor. Qualification: M.Tech. Area of expertise: Manufacturing Engineering, AI and Data Science. Experience: 13 Years.
Mr. Yogesh V. Koli is Assistant Professor. Qualification: M.E. (Electronics). Area of expertise: Industrial Robotics and Automation, Embedded System. Experience: 12 Years.
Mrs. Shital D. Kolekar is Assistant Professor. Qualification: M.E. (CSE), Ph.D. (Pursuing). Area of expertise: Cloud Computing, IOT. Experience: 7.5 Years.
Mrs. Rutuja Suraj Pawar is Assistant Professor. Qualification: B.E. (Electrical), M.Tech (Electrical Power System). Area of expertise: Electric Power System. Experience: 6 Years.

FACULTY OF BASIC SCIENCE

The Basic Science department has 2 faculty members.
Dr. Santosh Shivaji Desai is Associate Professor and Head. Qualification: M.Sc. (Mathematics), Ph.D. Area of expertise: Mathematics, Fuzzy Choice Theory. Experience: 16 Years.
Mrs. Vijayalaxmi Maruti Vairat is Assistant Professor. Qualification: M.Sc., M.Phil. Area of expertise: Chemistry. Experience: 28 Years.

FACULTY OF AERONAUTICAL ENGINEERING

The Aeronautical Engineering department has 4 faculty members.
Mr. Basithrahman A is Assistant Professor. Qualification: M.E. (Aeronautical Engineering). Area of expertise: Composite Materials and Structures, Aircraft Structures, Finite Element Methods. Experience: 7 Years.
Mr. Karthik Pullela is Assistant Professor. Qualification: M.Tech. Area of expertise: Aerospace Propulsion, Computational Fluid Dynamics, Aircraft Design. Experience: 1 Year.
Prof. Mohammed Hashim Y is Assistant Professor. Qualification: M.E. Area of expertise: UAV and Flight Dynamics. Experience: 11 Years.
Prof. Arun Nema is Assistant Professor. Qualification: M.Tech. Area of expertise: Aerodynamics, Computational Fluid Dynamics, Fluid Mechanics. Experience: 14 Years.

LATEST NOTICES

Admissions Open for Academic Year 2026-27 dated 15 August 2026. The college invites applications for B.Tech and M.Tech programs and interested candidates may apply through the admission portal.
ADCET Hackathon 2026 Season 3 dated 10 August 2026. The hackathon is on Sustainable Development Goals (SDGs) - Vikasit Bharat 2047 and registration is open for all eligible students.
AICTE Scholarship and Fellowship Schemes dated 02 August 2026. Students are advised to apply for the AICTE Scholarship and Fellowship Schemes through the official portal.
Exam Schedule for Odd Semester 2026-27 dated 25 July 2026. The examination schedule for the odd semester has been published and students should check the notice board.
ADCET Alumni Database Update Form dated 18 July 2026. All alumni are requested to update their details using the official alumni database update form.
For the latest circulars, admission information, examination schedules and academic updates, please keep visiting the Notices section of the website.

LEADERSHIP

Shri. Annasaheb Dange is the Founder of the college.
Adv. Rajendra R. Dange is the Secretary of the college.
Shri. Vishwanath R. Dange is the Joint Secretary of the college.
Dr. Laxman Y Waghmode is the Director of the college.
The vision and guidance of the founder, secretary, joint secretary and director shape the college into a centre of excellence.

FAQ

What is ADCET? Annasaheb Dange College of Engineering and Technology, Ashta is an Empowered Autonomous Institute established in 1999, affiliated to Shivaji University, Kolhapur and approved by AICTE.
Where is ADCET located? ADCET is located at Ashta, Dist. Sangli, Maharashtra - 416301.
What courses are offered at ADCET? ADCET offers B.Tech, M.Tech, BBA and BCA programs in various branches of engineering, technology, computer applications and management.
How can I apply for admission? Admissions are open for the academic year 2026-27 and students may apply through the applicable admission process after checking the eligibility criteria.
Is ADCET an autonomous institute? Yes, ADCET is an Empowered Autonomous Institute.
Is ADCET approved by AICTE? Yes, ADCET is approved by AICTE, New Delhi.
Is ADCET accredited by NAAC? Yes, ADCET is accredited by NAAC with A++ Grade and its programs are NBA accredited.
Are hostel facilities available? Yes, excellent hostel facilities are available for students on the college campus.
Does ADCET provide placement assistance? Yes, the college has a dedicated placement cell and more than 180 recruiting companies visit the campus.
How can I contact ADCET? You can contact ADCET on phone +91-8600600700 or by email at director@adcet.in.
Where can I find the latest college notices? The latest college notices are published in the Notices section of the website.
Where can I find information about faculty members? Faculty information is available in the Faculty section of the website.

CONTACT INFORMATION

The phone number of the college is +91-8600600700.
The email address of the college is director@adcet.in.
The official website of the college is www.adcet.ac.in.
The DTE code of the college is 06283.

ADDRESS

Annasaheb Dange College of Engineering and Technology (ADCET),
Ashta, Dist. Sangli,
Maharashtra - 416 301.

The college is located at Ashta in the Sangli district of Maharashtra.
The campus has excellent connectivity from Islampur, Kolhapur and Sangli.

USEFUL LINKS

Important links provided by the college are DTE Maharashtra, Shivaji University, MahaDBT, National Scholarship Portal, NPTEL, ERP Login, Alumni, RTI, NIRF, AICTE Approvals and Accreditation Status.
Students may use the ERP Login for the college enterprise resource planning portal.
Alumni may update their details using the ADCET Alumni Database Update Form.
`;


// --------------------------------------------------
// SAVE CLEANED DATA
// --------------------------------------------------

mkdirSync(dirname(OUTPUT_FILE), { recursive: true });

writeFileSync(OUTPUT_FILE, cleanedText.trim(), "utf-8");

console.log(`Scraped characters: ${fixedText.length}`);
console.log(`Cleaned characters: ${cleanedText.trim().length}`);
console.log(`Output file: ${OUTPUT_FILE}`);

console.log("\nStatus: STRUCTURED CLEANING COMPLETE");
console.log("=".repeat(55));
