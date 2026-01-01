const input = document.getElementById("letterhead");
const preview = document.getElementById("preview");
const download = document.getElementById("print-btn");
const page = document.getElementById("letterContent");
const letterhead = document.getElementById("letterhead");

input.addEventListener("change", handleLetterheadUpload);

letterhead.addEventListener("change", handleLetterheadUpload);

download.addEventListener("click", printPDF);

//
function handleLetterheadUpload() {
  const file = this.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    page.style.backgroundImage = `url(${imageUrl})`;
  }
}

function handleLetterTypeChange() {
  const letterType = document.getElementById("letterType").value;
  const templateInfo = document.getElementById("templateInfo");

  if (letterType === "manual") {
    templateInfo.classList.remove("active");
    // Don't auto-fill anything
  } else {
    const template = letterTemplates[letterType];
    document.getElementById("heading").value = template.heading;
    document.getElementById("body").value = template.body;

    templateInfo.textContent =
      "✓ Template loaded. You can edit the fields below.";
    templateInfo.classList.add("active");

    updatePreview();
  }
}

function printPDF() {
  window.html2canvas = html2canvas;
  window.jsPDF = window.jspdf.jsPDF;
  console.log("downloading pdf");
  let pdf = new jsPDF("p", "px", "a4");
  html2canvas(page).then((canvas) => {
    let base64image = canvas.toDataURL("image/png");
    console.log(base64image);

    pdf.addImage(base64image, "PNG", 0, 0, 445, 620);
    console.log("about to save");
    pdf.save(`${heading + new Date()}`);
  });
}

function updatePreview() {
  const date = document.getElementById("date").value;
  const recipient = document.getElementById("recipient").value;
  const heading = document.getElementById("heading").value;
  const body = document.getElementById("body").value;
  const signatory = document.getElementById("signatory").value;
  const title = document.getElementById("title").value;

  // Format date
  if (date) {
    const d = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    document.getElementById("preview-date").textContent = d.toLocaleDateString(
      "en-US",
      options
    );
  } else {
    document.getElementById("preview-date").textContent = "";
  }

  document.getElementById("preview-recipient").textContent = recipient;
  document.getElementById("preview-heading").textContent = heading;
  document.getElementById("preview-body").textContent = body;
  document.getElementById("preview-signatory").textContent = signatory;
  document.getElementById("preview-title").textContent = title;
}
document.querySelector(".preview-btn").addEventListener("click", togglePreview);

function togglePreview() {
  console.log("preview");
  const previewSection = document.querySelector(".preview-section");
  previewSection.classList.toggle("active");
  if (previewSection.classList.contains("active")) {
    updatePreview();
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

// input.addEventListener("change", function (e) {
//   const file = this.files[0];
//   const reader = new FileReader();

//   reader.onload = function (e) {
//     page.style.backgroundImage = `url(${e.target.result})`;
//   };

//   if (file) {
//     reader.readAsDataURL(file);
//   }
// });

const letterTemplates = {
  eoi: {
    heading: "EXPRESSION OF INTEREST",
    body: "We hereby express our interest in [project/opportunity name] as advertised/announced on [date/source].\n\nNalot Multisystems Ltd is a reputable company specializing in [services/products]. With our extensive experience and proven track record in [relevant field], we are confident in our ability to deliver exceptional results for this project.\n\nOur key competencies include:\n\n1. [Competency 1]\n2. [Competency 2]\n3. [Competency 3]\n\nWe have successfully completed similar projects for [mention clients/projects if applicable] and possess all necessary certifications and qualifications.\n\nWe would be delighted to provide further information about our capabilities and discuss how we can contribute to the success of this project.\n\nWe look forward to your favorable consideration.",
  },
  quotation: {
    heading: "REQUEST FOR QUOTATION",
    body: "We are writing to request a quotation for [product/service]. We would appreciate if you could provide us with detailed pricing information including:\n\n1. Unit prices\n2. Minimum order quantities\n3. Delivery timelines\n4. Payment terms\n\nWe look forward to receiving your quotation at your earliest convenience.\n\nThank you for your attention to this matter.",
  },
  proposal: {
    heading: "BUSINESS PROPOSAL",
    body: "We are pleased to submit this proposal for [project/service]. Our company specializes in [area of expertise] and we believe we can provide exceptional value to your organization.\n\nKey benefits of working with us include:\n\n1. [Benefit 1]\n2. [Benefit 2]\n3. [Benefit 3]\n\nWe would welcome the opportunity to discuss this proposal with you in detail.\n\nThank you for considering our proposal.",
  },
  application: {
    heading: "APPLICATION FOR EMPLOYMENT",
    body: "I am writing to express my interest in the [position title] position at your esteemed organization. With [X years] of experience in [field], I believe I would be a valuable addition to your team.\n\nMy qualifications include:\n\n1. [Qualification 1]\n2. [Qualification 2]\n3. [Qualification 3]\n\nI have attached my resume for your review and would welcome the opportunity to discuss how my skills and experience align with your needs.\n\nThank you for your consideration.",
  },
  introduction: {
    heading: "COMPANY INTRODUCTION",
    body: "We are pleased to introduce Nalot Multisystems Ltd, a leading provider of [services/products] in Nigeria.\n\nEstablished with the vision of [company vision], we specialize in:\n\n1. [Service/Product 1]\n2. [Service/Product 2]\n3. [Service/Product 3]\n\nOur commitment to quality, reliability, and customer satisfaction has enabled us to build strong relationships with clients across various sectors.\n\nWe would welcome the opportunity to discuss potential collaboration and demonstrate how our services can benefit your organization.\n\nWe look forward to establishing a mutually beneficial business relationship.",
  },
  recommendation: {
    heading: "LETTER OF RECOMMENDATION",
    body: "I am pleased to write this letter of recommendation for [Name], who [worked with us/served as] [position/role] from [start date] to [end date].\n\nDuring this period, [Name] demonstrated:\n\n1. [Quality/Skill 1]\n2. [Quality/Skill 2]\n3. [Quality/Skill 3]\n\n[He/She] consistently exceeded expectations and made significant contributions to [specific achievements].\n\nI have no hesitation in recommending [Name] for [purpose of recommendation]. [He/She] would be a valuable asset to any organization.\n\nPlease feel free to contact me if you require any additional information.",
  },
  complaint: {
    heading: "LETTER OF COMPLAINT",
    body: "I am writing to bring to your attention an issue regarding [describe issue]. This matter occurred on [date] and has caused [describe impact].\n\nSpecifically:\n\n1. [Detail 1]\n2. [Detail 2]\n3. [Detail 3]\n\nI would appreciate your prompt attention to this matter and look forward to a satisfactory resolution.\n\nThank you for your understanding.",
  },
  thankyou: {
    heading: "LETTER OF APPRECIATION",
    body: "I am writing to express my sincere gratitude for [reason for thanks]. Your [support/assistance/service] has been invaluable and greatly appreciated.\n\nIn particular, I would like to acknowledge:\n\n1. [Specific point 1]\n2. [Specific point 2]\n3. [Specific point 3]\n\nThank you once again for your kindness and professionalism.\n\nWith sincere appreciation.",
  },
  invitation: {
    heading: "INVITATION LETTER",
    body: "We are delighted to invite you to [event name] scheduled to take place on [date] at [time] at [venue].\n\nEvent details:\n\n1. Date: [Date]\n2. Time: [Time]\n3. Venue: [Venue]\n4. Purpose: [Purpose]\n\nThis event will provide an excellent opportunity to [describe benefits/purpose].\n\nWe would be honored by your presence. Kindly confirm your attendance by [RSVP date].\n\nWe look forward to welcoming you.",
  },
};
