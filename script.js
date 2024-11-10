var resumeForm = document.getElementById("resume-form");
var resumeDisplay = document.getElementById("resume-display");
var shareLink = document.getElementById("share-link");
var downloadButton = document.getElementById("download-btn");
// Save resume to localStorage and generate a unique URL
resumeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        location: document.getElementById("location").value,
        education: document.getElementById("education").value,
        experience: document.getElementById("experience").value,
        skills: document.getElementById("skills").value.split(",").map(function (skill) { return skill.trim(); })
    };
    localStorage.setItem("resume_".concat(username), JSON.stringify(formData));
    // Generate and display the shareable link
    var url = "".concat(window.location.origin).concat(window.location.pathname, "?username=").concat(username);
    shareLink.href = url;
    shareLink.innerText = "Share this resume";
    generateResume(formData);
});
// Load resume if username is in the query parameter
function loadResumeFromUrl() {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("username");
    if (username) {
        var storedData = localStorage.getItem("resume_".concat(username));
        if (storedData) {
            var data = JSON.parse(storedData);
            generateResume(data);
        }
        else {
            alert("Resume data not found for this username.");
        }
    }
}
// Generate the resume display
function generateResume(data) {
    resumeDisplay.innerHTML = "\n        <h1>".concat(data.name, "</h1>\n        <p>Email: ").concat(data.email, " | Phone: ").concat(data.phone, " | Location: ").concat(data.location, "</p>\n        <h2>Education</h2>\n        <p>").concat(data.education, "</p>\n        <h2>Work Experience</h2>\n        <p>").concat(data.experience, "</p>\n        <h2>Skills</h2>\n        <ul>").concat(data.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "</ul>\n    ");
    resumeDisplay.style.display = "block";
}
// Download resume as PDF
downloadButton.addEventListener("click", function () {
    window.print(); // This will open the print dialog to save the page as a PDF
});
// Load resume data if there's a username in the URL
loadResumeFromUrl();
