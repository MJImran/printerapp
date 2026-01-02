import letterTemplates from "./letterdata.js";

const input = document.getElementById("letterhead");
const preview = document.getElementById("preview");
const download = document.getElementById("print-btn");
const page = document.getElementById("letterContent");
const letterhead = document.getElementById("letterhead");
const letterType = document.getElementById("letterType");
const previewBtn = document.querySelector(".preview-btn");
const closePreviewBtn = document.querySelector(".close-preview");

input.addEventListener("change", handleLetterheadUpload);

letterhead.addEventListener("change", handleLetterheadUpload);

download.addEventListener("click", printPDF);

letterType.addEventListener("change", handleLetterTypeChange);

previewBtn.addEventListener("click", togglePreview);

closePreviewBtn.addEventListener("click", togglePreview);

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

function togglePreview() {
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
