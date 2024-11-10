interface ResumeData {
    name: string;
    email: string;
    phone: string;
    location: string;
    education: string;
    experience: string;
    skills: string[];
}

const resumeForm = document.getElementById("resume-form") as HTMLFormElement;
const resumeDisplay = document.getElementById("resume-display") as HTMLDivElement;
const shareLink = document.getElementById("share-link") as HTMLAnchorElement;
const downloadButton = document.getElementById("download-btn") as HTMLButtonElement;

// Save resume to localStorage and generate a unique URL
resumeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = (document.getElementById("username") as HTMLInputElement).value;
    const formData: ResumeData = {
        name: (document.getElementById("name") as HTMLInputElement).value,
        email: (document.getElementById("email") as HTMLInputElement).value,
        phone: (document.getElementById("phone") as HTMLInputElement).value,
        location: (document.getElementById("location") as HTMLInputElement).value,
        education: (document.getElementById("education") as HTMLInputElement).value,
        experience: (document.getElementById("experience") as HTMLTextAreaElement).value,
        skills: (document.getElementById("skills") as HTMLInputElement).value.split(",").map(skill => skill.trim())
    };

    localStorage.setItem(`resume_${username}`, JSON.stringify(formData));

    // Generate and display the shareable link
    const url = `${window.location.origin}${window.location.pathname}?username=${username}`;
    shareLink.href = url;
    shareLink.innerText = "Share this resume";
    generateResume(formData);
});

// Load resume if username is in the query parameter
function loadResumeFromUrl(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");
    if (username) {
        const storedData = localStorage.getItem(`resume_${username}`);
        if (storedData) {
            const data: ResumeData = JSON.parse(storedData);
            generateResume(data);
        } else {
            alert("Resume data not found for this username.");
        }
    }
}

// Generate the resume display
function generateResume(data: ResumeData): void {
    resumeDisplay.innerHTML = `
        <h1>${data.name}</h1>
        <p>Email: ${data.email} | Phone: ${data.phone} | Location: ${data.location}</p>
        <h2>Education</h2>
        <p>${data.education}</p>
        <h2>Work Experience</h2>
        <p>${data.experience}</p>
        <h2>Skills</h2>
        <ul>${data.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
    `;
    resumeDisplay.style.display = "block";
}

// Download resume as PDF
downloadButton.addEventListener("click", () => {
    window.print(); // This will open the print dialog to save the page as a PDF
});

// Load resume data if there's a username in the URL
loadResumeFromUrl();
