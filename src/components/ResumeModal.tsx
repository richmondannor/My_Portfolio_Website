import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import cvPortraitImg from '../assets/images/richmond_cv_portrait.png';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Standalone exact CV HTML for printing and fallback
const EXACT_CV_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Richmond Annor Ayisah – CV</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  @page {
    size: A4 portrait;
    margin: 0;
  }

  body {
    font-family: 'Lato', sans-serif;
    background: #0d1b2a;
    color: #e0e6f0;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .page {
    width: 794px;
    min-height: 1123px;
    background: #0d1117;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
  }

  /* LEFT SIDEBAR */
  .sidebar {
    width: 260px;
    min-height: 100%;
    background: #0d1117;
    padding: 28px 22px 24px 26px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    border-right: 1px solid #1e2d42;
  }

  .photo-wrap {
    width: 160px;
    height: 160px;
    border-radius: 4px;
    overflow: hidden;
    margin: 0 auto 4px;
    border: 2px solid #1e3a5f;
  }

  .photo-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  .sidebar-section-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #4a8fc1;
    margin-bottom: 10px;
    padding-bottom: 6px;
    border-bottom: 1px solid #1e2d42;
  }

  .contact-item {
    font-size: 10.5px;
    color: #a0b4c8;
    line-height: 1.7;
    word-break: break-all;
  }

  .edu-entry {
    margin-bottom: 14px;
  }

  .edu-school {
    font-family: 'Montserrat', sans-serif;
    font-size: 10.5px;
    font-weight: 700;
    color: #cdd9e8;
    line-height: 1.4;
  }

  .edu-degree {
    font-size: 10px;
    color: #7a99b8;
    line-height: 1.4;
  }

  .edu-dates {
    font-size: 9.5px;
    color: #4a6a84;
    margin-top: 1px;
  }

  .skill-item {
    font-size: 10.5px;
    color: #a0b4c8;
    line-height: 1.85;
    padding-left: 10px;
    position: relative;
  }

  .skill-item::before {
    content: '•';
    color: #4a8fc1;
    position: absolute;
    left: 0;
  }

  .lang-item {
    font-size: 10.5px;
    color: #a0b4c8;
    line-height: 1.85;
  }

  /* RIGHT MAIN CONTENT */
  .main {
    flex: 1;
    padding: 28px 30px 24px 30px;
    display: flex;
    flex-direction: column;
    gap: 13px;
  }

  .name-block {
    border-bottom: 1px solid #1e2d42;
    padding-bottom: 10px;
  }

  .name-block h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 26px;
    font-weight: 800;
    color: #e8f0fa;
    line-height: 1.1;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .name-block .subtitle {
    font-family: 'Montserrat', sans-serif;
    font-size: 9.5px;
    font-weight: 500;
    letter-spacing: 3px;
    color: #4a8fc1;
    text-transform: uppercase;
    margin-top: 4px;
  }

  .section-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #cdd9e8;
    margin-bottom: 6px;
    padding-bottom: 4px;
    border-bottom: 1px solid #1e2d42;
  }

  .profile-text {
    font-size: 10px;
    color: #8fafc8;
    line-height: 1.55;
    text-align: justify;
  }

  /* Experience */
  .exp-entry {
    margin-bottom: 10px;
  }

  .exp-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2px;
  }

  .exp-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 10.5px;
    font-weight: 700;
    color: #cdd9e8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .exp-company {
    font-size: 9.5px;
    color: #4a8fc1;
    font-style: italic;
    margin-bottom: 4px;
  }

  .exp-date {
    font-size: 9px;
    color: #4a6a84;
    white-space: nowrap;
    margin-left: 8px;
    flex-shrink: 0;
  }

  .exp-bullets {
    list-style: none;
    padding: 0;
  }

  .exp-bullets li {
    font-size: 9.5px;
    color: #8fafc8;
    line-height: 1.48;
    padding-left: 12px;
    position: relative;
    margin-bottom: 2px;
  }

  .exp-bullets li::before {
    content: '•';
    color: #4a8fc1;
    position: absolute;
    left: 0;
  }

  /* Coursework */
  .coursework-text {
    font-size: 9.5px;
    color: #8fafc8;
    line-height: 1.55;
  }
</style>
</head>
<body>
<div class="page">
  <!-- SIDEBAR -->
  <div class="sidebar">
    <div class="photo-wrap">
      <img src="${cvPortraitImg}" alt="Richmond Annor Ayisah">
    </div>

    <div>
      <div class="sidebar-section-title">Contact</div>
      <div class="contact-item">0553287014</div>
      <div class="contact-item">ayisahrichmondy6101@gmail.com</div>
      <div class="contact-item">Greater Accra, Ghana</div>
    </div>

    <div>
      <div class="sidebar-section-title">Education</div>
      <div class="edu-entry">
        <div class="edu-school">University of Ghana</div>
        <div class="edu-degree">BSc Statistics with Computer Science</div>
        <div class="edu-dates">2022 – 2025</div>
      </div>
      <div class="edu-entry">
        <div class="edu-school">Accra Academy Senior High School</div>
        <div class="edu-degree">GCSE Level</div>
        <div class="edu-dates">2018 – 2021</div>
      </div>
    </div>

    <div>
      <div class="sidebar-section-title">Skills</div>
      <div class="skill-item">Data Analysis &amp; Mining</div>
      <div class="skill-item">UI/UX &amp; Web Design</div>
      <div class="skill-item">Database Management</div>
      <div class="skill-item">Procedure Mapping</div>
      <div class="skill-item">Computer Networking</div>
      <div class="skill-item">Python, R, Excel, SQL</div>
      <div class="skill-item">Power BI</div>
      <div class="skill-item">Microsoft 365</div>
      <div class="skill-item">Project Management</div>
      <div class="skill-item">Problem-Solving</div>
      <div class="skill-item">Adaptability &amp; Fast Learning</div>
    </div>

    <div>
      <div class="sidebar-section-title">Language</div>
      <div class="lang-item">English</div>
    </div>
  </div>

  <!-- MAIN CONTENT -->
  <div class="main">
    <div class="name-block">
      <h1>Richmond<br>Annor Ayisah</h1>
      <div class="subtitle">Statistics &amp; Computer Science Graduate</div>
    </div>

    <div>
      <div class="section-title">Professional Profile</div>
      <div class="profile-text">
        Highly analytical and results-driven Statistics and Computer Science graduate equipped with strong expertise in data analysis, statistical modeling, database systems and programming. Proven track record in leveraging Python, R, SQL, Power BI and Excel to translate complex, large-scale datasets into actionable business intelligence. Adept at applying robust quantitative methods and machine learning principles to drive data-informed decision-making and solve intricate operational challenges. Additionally skilled in computer networking, process mapping and Microsoft 365, with a demonstrated ability to optimize system workflows, coordinate cross-functional projects, and deliver impactful presentations to stakeholders. Eager to contribute technical precision, analytical rigor and a proactive problem-solving mindset to dynamic, innovative teams.
      </div>
    </div>

    <div>
      <div class="section-title">Experience</div>

      <div class="exp-entry">
        <div class="exp-header">
          <div class="exp-title">National Service Personnel – Junior Method &amp; Procedure Officer / Junior Project Manager</div>
          <div class="exp-date">Nov 2025 – Oct 2026</div>
        </div>
        <div class="exp-company">Societe Generale Ghana – Head Office, Organization &amp; Projects Department</div>
        <ul class="exp-bullets">
          <li>Standardized and updated banking operational procedures by migrating legacy documentation into modern, approved templates to ensure regulatory compliance and operational consistency.</li>
          <li>Engineered detailed procedure maps and flowcharts using Microsoft Visio, providing stakeholders with clear pictorial representations of complex banking workflows.</li>
          <li>Facilitated project governance by recording comprehensive meeting minutes, tracking outstanding action items, and assigning responsibilities to ensure departmental deadlines were met.</li>
          <li>Managed internal departmental operations to support daily activities, streamlining administrative tasks and optimizing workflow efficiency.</li>
          <li>Assisted in project lifecycle management, monitoring timelines and resources to support the successful delivery of organizational initiatives.</li>
          <li>Collaborated with cross-functional teams to identify process bottlenecks and recommend improvements to enhance the bank's service delivery.</li>
        </ul>
      </div>

      <div class="exp-entry">
        <div class="exp-header">
          <div class="exp-title">Data Analyst Intern</div>
          <div class="exp-date">Apr 2025 – Jun 2025</div>
        </div>
        <div class="exp-company">MultiThread ICT Solutions Limited</div>
        <ul class="exp-bullets">
          <li>Gathered data from various sources and prepared it for analysis by identifying and correcting inconsistencies, errors, and missing values.</li>
          <li>Created informative charts, graphs, and dashboards to present insights clearly to both technical and non-technical stakeholders using Power BI and Excel.</li>
          <li>Worked closely with experienced data analysts, project managers and cross-functional teams to understand project requirements and deliver data-driven solutions.</li>
          <li>Assisted the IT team in providing software solutions internally.</li>
        </ul>
      </div>

      <div class="exp-entry">
        <div class="exp-header">
          <div class="exp-title">IT Assistant Intern</div>
          <div class="exp-date">Aug 2024 – Oct 2024</div>
        </div>
        <div class="exp-company">East Airport International</div>
        <ul class="exp-bullets">
          <li>Provided technical support and troubleshooting assistance for hardware and software issues.</li>
          <li>Assisted with network configuration and maintenance to ensure consistent connectivity.</li>
          <li>Supported data entry and management using Microsoft Office tools.</li>
          <li>Collaborated with the IT team to ensure smooth day-to-day operations and responded to service requests promptly.</li>
        </ul>
      </div>
    </div>

    <div>
      <div class="section-title">Relevant Coursework</div>
      <div class="coursework-text">
        Statistical Survey and Modeling, Data Mining, Database Management, Mobile and Web Development, Programming, Office Productivity Tools, Human Computer Interactions (HCI), Data Structures and Algorithms, Computer Networking, Statistical Quality Control, Advanced Regression Analysis, Business and Bayesian Statistics, Biostatistics, Discrete Data Analysis, Advanced Time Series Analysis.
      </div>
    </div>
  </div>
</div>
</body>
</html>`;

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const activePhoto = cvPortraitImg;

  if (!isOpen) return null;

  // Print function: uses clean isolated print frame
  const handlePrint = () => {
    try {
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      document.body.appendChild(iframe);

      const doc = iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        const htmlToPrint = EXACT_CV_HTML.replace('${cvPortraitImg}', activePhoto);
        doc.write(htmlToPrint);
        doc.close();

        setTimeout(() => {
          try {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
          } catch {
            window.print();
          } finally {
            setTimeout(() => {
              if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
              }
            }, 1000);
          }
        }, 350);
      } else {
        window.print();
      }
    } catch {
      window.print();
    }
  };

  // PDF download: converts CV sheet into a high-res PDF file ensuring 100% of content is included
  const handleDownloadPdf = async () => {
    const cvElement = document.getElementById('cv-document-sheet');
    if (!cvElement) {
      handlePrint();
      return;
    }

    setIsGeneratingPdf(true);
    try {
      const canvas = await html2canvas(cvElement, {
        scale: 2, // High resolution (300 DPI equivalent)
        useCORS: true,
        logging: false,
        backgroundColor: '#0d1117',
        scrollY: 0,
        scrollX: 0,
        windowWidth: 1200, // Forces desktop layout width
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      if (imgHeight <= pageHeight) {
        // Fits cleanly on a single A4 page
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      } else if (imgHeight <= pageHeight * 1.25) {
        // Slightly taller: proportionally scale to fit 100% of all content (including all coursework at the bottom)
        const fitScale = (pageHeight - 4) / imgHeight;
        const fittedWidth = imgWidth * fitScale;
        const xOffset = (pageWidth - fittedWidth) / 2;
        pdf.addImage(imgData, 'JPEG', xOffset, 2, fittedWidth, pageHeight - 4, undefined, 'FAST');
      } else {
        // If content exceeds single page significantly, slice across multiple pages so nothing is ever clipped
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = position - pageHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
          heightLeft -= pageHeight;
        }
      }

      pdf.save('Richmond_Annor_Ayisah_CV.pdf');
    } catch (err) {
      console.error('PDF generation error, falling back to print dialog:', err);
      handlePrint();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div
      id="cv-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="cv-modal-container"
        className="w-full max-w-[860px] bg-[#0d1b2a] border border-[#1e2d42] rounded-2xl shadow-2xl overflow-hidden my-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Chrome Header */}
        <div
          id="cv-modal-header"
          className="bg-[#0a0e17] px-4 md:px-6 py-3 border-b border-[#1e2d42] flex items-center justify-between font-mono text-xs"
        >
          {/* Left indicator dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-[#a0b4c8] ml-2 text-xs truncate">
              Richmond Annor Ayisah – Official Curriculum Vitae
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Button 1: Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e2d42] hover:bg-[#283d5a] active:scale-95 text-[#cdd9e8] hover:text-white text-xs font-mono font-medium transition-all cursor-pointer border border-[#304768]/60 shadow-xs"
              title="Print CV (A4 Format)"
            >
              <span className="material-symbols-outlined text-[16px] text-[#4a8fc1]">print</span>
              <span>Print CV</span>
            </button>

            {/* Button 2: Download PDF Button */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#4a8fc1] hover:bg-[#5ca2d6] active:scale-95 text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-md disabled:opacity-75 disabled:cursor-wait"
              title="Download CV in PDF Format"
            >
              {isGeneratingPdf ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                  <span>Download CV (PDF)</span>
                </>
              )}
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded flex items-center justify-center text-[#a0b4c8] hover:text-white hover:bg-[#1e2d42] transition-colors cursor-pointer ml-1"
              title="Close Modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* CV Rendered Viewport */}
        <div className="overflow-x-auto overflow-y-auto max-h-[82vh] bg-[#0d1b2a] p-2 sm:p-4 md:p-6 flex justify-center">
          <div
            id="cv-document-sheet"
            className="w-full max-w-[794px] min-h-[1123px] bg-[#0d1117] text-[#e0e6f0] flex flex-col sm:flex-row shadow-2xl border border-[#1e2d42] rounded-sm"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            {/* LEFT SIDEBAR (Width 260px) */}
            <div
              className="w-full sm:w-[260px] flex-shrink-0 bg-[#0d1117] p-5 sm:p-6 flex flex-col gap-4 border-b sm:border-b-0 sm:border-r border-[#1e2d42]"
            >
              {/* Profile Photo */}
              <div className="w-[160px] h-[160px] rounded-[4px] overflow-hidden mx-auto mb-1 border-2 border-[#1e3a5f] shadow-md">
                <img
                  src={activePhoto}
                  alt="Richmond Annor Ayisah"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Contact */}
              <div>
                <div
                  className="text-[9.5px] font-bold tracking-[2.5px] uppercase text-[#4a8fc1] mb-2 pb-1 border-b border-[#1e2d42]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Contact
                </div>
                <div className="text-[10px] text-[#a0b4c8] leading-[1.65] break-all">
                  0553287014
                </div>
                <div className="text-[10px] text-[#a0b4c8] leading-[1.65] break-all">
                  ayisahrichmondy6101@gmail.com
                </div>
                <div className="text-[10px] text-[#a0b4c8] leading-[1.65] break-all">
                  Greater Accra, Ghana
                </div>
              </div>

              {/* Education */}
              <div>
                <div
                  className="text-[9.5px] font-bold tracking-[2.5px] uppercase text-[#4a8fc1] mb-2 pb-1 border-b border-[#1e2d42]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Education
                </div>
                <div className="mb-2.5">
                  <div
                    className="text-[10px] font-bold text-[#cdd9e8] leading-[1.4]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    University of Ghana
                  </div>
                  <div className="text-[9.5px] text-[#7a99b8] leading-[1.4]">
                    BSc Statistics with Computer Science
                  </div>
                  <div className="text-[9px] text-[#4a6a84] mt-0.5">
                    2022 – 2025
                  </div>
                </div>
                <div>
                  <div
                    className="text-[10px] font-bold text-[#cdd9e8] leading-[1.4]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Accra Academy Senior High School
                  </div>
                  <div className="text-[9.5px] text-[#7a99b8] leading-[1.4]">
                    GCSE Level
                  </div>
                  <div className="text-[9px] text-[#4a6a84] mt-0.5">
                    2018 – 2021
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <div
                  className="text-[9.5px] font-bold tracking-[2.5px] uppercase text-[#4a8fc1] mb-2 pb-1 border-b border-[#1e2d42]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Skills
                </div>
                <div className="space-y-0.5">
                  {[
                    'Data Analysis & Mining',
                    'UI/UX & Web Design',
                    'Database Management',
                    'Procedure Mapping',
                    'Computer Networking',
                    'Python, R, Excel, SQL',
                    'Power BI',
                    'Microsoft 365',
                    'Project Management',
                    'Problem-Solving',
                    'Adaptability & Fast Learning',
                  ].map((skill, i) => (
                    <div
                      key={i}
                      className="text-[10px] text-[#a0b4c8] leading-[1.65] pl-2.5 relative flex items-baseline gap-1.5"
                    >
                      <span className="text-[#4a8fc1] font-bold leading-none select-none">•</span>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <div
                  className="text-[9.5px] font-bold tracking-[2.5px] uppercase text-[#4a8fc1] mb-2 pb-1 border-b border-[#1e2d42]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Language
                </div>
                <div className="text-[10px] text-[#a0b4c8] leading-[1.65]">
                  English
                </div>
              </div>
            </div>

            {/* RIGHT MAIN CONTENT */}
            <div className="flex-1 p-5 md:p-7 flex flex-col gap-3">
              {/* Name Block */}
              <div className="border-b border-[#1e2d42] pb-2.5">
                <h1
                  className="text-[24px] md:text-[26px] font-extrabold text-[#e8f0fa] leading-[1.1] tracking-[1px] uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Richmond<br />Annor Ayisah
                </h1>
                <div
                  className="text-[9px] font-medium tracking-[2.5px] text-[#4a8fc1] uppercase mt-1"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Statistics &amp; Computer Science Graduate
                </div>
              </div>

              {/* Professional Profile */}
              <div>
                <div
                  className="text-[9.5px] font-bold tracking-[2.5px] uppercase text-[#cdd9e8] mb-1.5 pb-1 border-b border-[#1e2d42]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Professional Profile
                </div>
                <p className="text-[10px] text-[#8fafc8] leading-[1.55] text-justify">
                  Highly analytical and results-driven Statistics and Computer Science graduate equipped with strong expertise in data analysis, statistical modeling, database systems and programming. Proven track record in leveraging Python, R, SQL, Power BI and Excel to translate complex, large-scale datasets into actionable business intelligence. Adept at applying robust quantitative methods and machine learning principles to drive data-informed decision-making and solve intricate operational challenges. Additionally skilled in computer networking, process mapping and Microsoft 365, with a demonstrated ability to optimize system workflows, coordinate cross-functional projects, and deliver impactful presentations to stakeholders. Eager to contribute technical precision, analytical rigor and a proactive problem-solving mindset to dynamic, innovative teams.
                </p>
              </div>

              {/* Experience */}
              <div>
                <div
                  className="text-[9.5px] font-bold tracking-[2.5px] uppercase text-[#cdd9e8] mb-1.5 pb-1 border-b border-[#1e2d42]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Experience
                </div>

                {/* Entry 1 */}
                <div className="mb-2.5">
                  <div className="flex justify-between items-start gap-2 mb-0.5">
                    <div
                      className="text-[10.5px] font-bold text-[#cdd9e8] uppercase tracking-[0.5px] leading-tight"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      National Service Personnel – Junior Method &amp; Procedure Officer / Junior Project Manager
                    </div>
                    <div className="text-[9px] text-[#4a6a84] whitespace-nowrap shrink-0 ml-2">
                      Nov 2025 – Oct 2026
                    </div>
                  </div>
                  <div className="text-[9.5px] text-[#4a8fc1] italic mb-1">
                    Societe Generale Ghana – Head Office, Organization &amp; Projects Department
                  </div>
                  <ul className="space-y-0.5">
                    {[
                      'Standardized and updated banking operational procedures by migrating legacy documentation into modern, approved templates to ensure regulatory compliance and operational consistency.',
                      'Engineered detailed procedure maps and flowcharts using Microsoft Visio, providing stakeholders with clear pictorial representations of complex banking workflows.',
                      'Facilitated project governance by recording comprehensive meeting minutes, tracking outstanding action items, and assigning responsibilities to ensure departmental deadlines were met.',
                      'Managed internal departmental operations to support daily activities, streamlining administrative tasks and optimizing workflow efficiency.',
                      'Assisted in project lifecycle management, monitoring timelines and resources to support the successful delivery of organizational initiatives.',
                      'Collaborated with cross-functional teams to identify process bottlenecks and recommend improvements to enhance the bank\'s service delivery.',
                    ].map((bullet, idx) => (
                      <li
                        key={idx}
                        className="text-[9.5px] text-[#8fafc8] leading-[1.48] pl-3 relative flex items-baseline gap-2"
                      >
                        <span className="text-[#4a8fc1] select-none">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Entry 2 */}
                <div className="mb-2.5">
                  <div className="flex justify-between items-start gap-2 mb-0.5">
                    <div
                      className="text-[10.5px] font-bold text-[#cdd9e8] uppercase tracking-[0.5px]"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Data Analyst Intern
                    </div>
                    <div className="text-[9px] text-[#4a6a84] whitespace-nowrap shrink-0 ml-2">
                      Apr 2025 – Jun 2025
                    </div>
                  </div>
                  <div className="text-[9.5px] text-[#4a8fc1] italic mb-1">
                    MultiThread ICT Solutions Limited
                  </div>
                  <ul className="space-y-0.5">
                    {[
                      'Gathered data from various sources and prepared it for analysis by identifying and correcting inconsistencies, errors, and missing values.',
                      'Created informative charts, graphs, and dashboards to present insights clearly to both technical and non-technical stakeholders using Power BI and Excel.',
                      'Worked closely with experienced data analysts, project managers and cross-functional teams to understand project requirements and deliver data-driven solutions.',
                      'Assisted the IT team in providing software solutions internally.',
                    ].map((bullet, idx) => (
                      <li
                        key={idx}
                        className="text-[9.5px] text-[#8fafc8] leading-[1.48] pl-3 relative flex items-baseline gap-2"
                      >
                        <span className="text-[#4a8fc1] select-none">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Entry 3 */}
                <div className="mb-1">
                  <div className="flex justify-between items-start gap-2 mb-0.5">
                    <div
                      className="text-[10.5px] font-bold text-[#cdd9e8] uppercase tracking-[0.5px]"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      IT Assistant Intern
                    </div>
                    <div className="text-[9px] text-[#4a6a84] whitespace-nowrap shrink-0 ml-2">
                      Aug 2024 – Oct 2024
                    </div>
                  </div>
                  <div className="text-[9.5px] text-[#4a8fc1] italic mb-1">
                    East Airport International
                  </div>
                  <ul className="space-y-0.5">
                    {[
                      'Provided technical support and troubleshooting assistance for hardware and software issues.',
                      'Assisted with network configuration and maintenance to ensure consistent connectivity.',
                      'Supported data entry and management using Microsoft Office tools.',
                      'Collaborated with the IT team to ensure smooth day-to-day operations and responded to service requests promptly.',
                    ].map((bullet, idx) => (
                      <li
                        key={idx}
                        className="text-[9.5px] text-[#8fafc8] leading-[1.48] pl-3 relative flex items-baseline gap-2"
                      >
                        <span className="text-[#4a8fc1] select-none">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Relevant Coursework */}
              <div>
                <div
                  className="text-[9.5px] font-bold tracking-[2.5px] uppercase text-[#cdd9e8] mb-1.5 pb-1 border-b border-[#1e2d42]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Relevant Coursework
                </div>
                <div className="text-[9.5px] text-[#8fafc8] leading-[1.55]">
                  Statistical Survey and Modeling, Data Mining, Database Management, Mobile and Web Development, Programming, Office Productivity Tools, Human Computer Interactions (HCI), Data Structures and Algorithms, Computer Networking, Statistical Quality Control, Advanced Regression Analysis, Business and Bayesian Statistics, Biostatistics, Discrete Data Analysis, Advanced Time Series Analysis.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div
          id="cv-modal-footer"
          className="bg-[#0a0e17] px-4 md:px-6 py-3.5 border-t border-[#1e2d42] flex flex-wrap items-center justify-between gap-3 font-mono text-xs"
        >
          <span className="text-[#7a99b8] text-xs">
            Format: A4 Print &amp; PDF Export • Richmond Annor Ayisah
          </span>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1e2d42] hover:bg-[#283d5a] text-[#cdd9e8] hover:text-white rounded-lg transition-colors cursor-pointer text-xs font-mono font-medium"
            >
              <span className="material-symbols-outlined text-[16px] text-[#4a8fc1]">print</span>
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#4a8fc1] hover:bg-[#5ca2d6] text-white text-xs font-mono font-bold rounded-lg transition-all cursor-pointer shadow-md disabled:opacity-75 disabled:cursor-wait"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#16202f] hover:bg-[#1f2c40] text-[#a0b4c8] rounded-lg transition-colors cursor-pointer text-xs font-mono"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
