var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
// HAndle Form Submission
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Collect input Data
    var Username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // Save Data in Local Storage with the username=key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(Username, JSON.stringify(resumeData));
    // Saving the Data Locally
    // Genreate the resume content Dynamically
    var resumeHtml = "\n    <h2><b>Editable Resume</b></h2>\n    <h3>Personal Information</h3>\n    <p><b>Name:</b><span contenteditable=\"true\">".concat(name, "</span></p>\n    <p><b>Email:</b><span contenteditable=\"true\">").concat(email, "</span></p>\n    <p><b>Phone:</b><span contenteditable=\"true\">").concat(phone, "</span></p>\n\n    <h3>Education</h3>\n    <p contenteditable=\"true\">").concat(education, "</p>\n\n    <h3>Experience</h3>\n    <p contenteditable=\"true\">").concat(experience, "</p>\n\n    <h3>Skills</h3>\n    <p contenteditable=\"true\">").concat(skills, "</p>\n");
    // Display the genrated Resume
    resumeDisplayElement.innerHTML = resumeHtml;
    // genrate shareable URL with username only
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(Username));
    // Display the ShareableLink
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print();
    // this will open print dialog and allow user to save as PDF
});
// prefill the form based on username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is avalible in localstorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = resumeData.username(document.getElementById('name')).value = resumeData.name(document.getElementById('email')).value = resumeData.email(document.getElementById('phone')).value = resumeData.phone(document.getElementById('education')).value = resumeData.education(document.getElementById('experience')).value = resumeData.experience(document.getElementById('skills')).value = resumeData.skills;
        }
    }
});
