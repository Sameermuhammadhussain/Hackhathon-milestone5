const form = document.getElementById('resume-form') as HTMLElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;




const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;
// HAndle Form Submission
form.addEventListener('submit', (event:Event) =>{
    event.preventDefault()
    // Collect input Data
    const Username =(document.getElementById('username')as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const experience = (document.getElementById('experience') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;
    // Save Data in Local Storage with the username=key
    const resumeData ={
        name,
        email,
        phone,
        education,
        experience,
        skills
    };
    localStorage.setItem(Username, JSON.stringify(resumeData)) 
    // Saving the Data Locally
    // Genreate the resume content Dynamically
    const resumeHtml = `
    <h2><b>Editable Resume</b></h2>
    <h3>Personal Information</h3>
    <p><b>Name:</b><span contenteditable="true">${name}</span></p>
    <p><b>Email:</b><span contenteditable="true">${email}</span></p>
    <p><b>Phone:</b><span contenteditable="true">${phone}</span></p>

    <h3>Education</h3>
    <p contenteditable="true">${education}</p>

    <h3>Experience</h3>
    <p contenteditable="true">${experience}</p>

    <h3>Skills</h3>
    <p contenteditable="true">${skills}</p>
`;
// Display the genrated Resume
resumeDisplayElement.innerHTML = resumeHtml;
// genrate shareable URL with username only
const shareableURL =
`${window.location.origin}?username=${encodeURIComponent(Username)}`;
// Display the ShareableLink
shareableLinkContainer.style.display = 'block';
shareableLinkElement.href=shareableURL;
shareableLinkElement.textContent =shareableURL;

});
// Handle PDF download
downloadPdfButton.addEventListener('click', () =>{
    window.print();
    // this will open print dialog and allow user to save as PDF
});
// prefill the form based on username in the URL
window.addEventListener('DOMContentLoaded',()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username')
    if (username) {
        // Autofill form if data is avalible in localstorage
        const savedResumeData =localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData =JSON.parse(savedResumeData);
            (document.getElementById('username') as HTMLInputElement).value =resumeData.username
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education
            (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills
}
}
})