document.addEventListener('DOMContentLoaded', () => {
    // Get form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const summaryInput = document.getElementById('summary');
    const educationContainer = document.getElementById('educationContainer');
    const addEducationButton = document.getElementById('addEducation');
    const skillInput = document.getElementById('skillInput');
    const addSkillButton = document.getElementById('addSkill');
    const skillsList = document.getElementById('skillsList'); // For form skills
    const experienceContainer = document.getElementById('experienceContainer');
    const addExperienceButton = document.getElementById('addExperience');
    const clearFormButton = document.getElementById('clearForm');
    const resumeForm = document.getElementById('resumeForm');

    // Get preview elements
    const previewName = document.getElementById('previewName');
    const previewEmail = document.getElementById('previewEmail');
    const previewPhone = document.getElementById('previewPhone');
    const previewSummary = document.getElementById('previewSummary');
    const previewEducation = document.getElementById('previewEducation');
    const previewSkills = document.getElementById('previewSkills'); // For resume skills
    const previewExperience = document.getElementById('previewExperience');

    // Function to update resume preview
    const updateResume = () => {
        // Personal Info
        previewName.textContent = nameInput.value || 'Your Name';
        previewEmail.textContent = emailInput.value || 'your.email@example.com';
        previewPhone.textContent = phoneInput.value || '+1234567890';
        previewSummary.textContent = summaryInput.value || 'A brief summary of your professional background will appear here.';

        // Education
        previewEducation.innerHTML = '';
        document.querySelectorAll('.education-item').forEach(item => {
            const degree = item.querySelector('.degree').value;
            const university = item.querySelector('.university').value;
            const years = item.querySelector('.edu-years').value;

            if (degree || university || years) {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${degree || 'Degree/Certification'}</strong> at ${university || 'University/Institution'} (${years || 'Years'})`;
                previewEducation.appendChild(li);
            }
        });
        if (previewEducation.children.length === 0) {
            previewEducation.innerHTML = '<li><strong>Degree/Certification</strong> at University/Institution (Years)</li>';
        }


        // Skills
        previewSkills.innerHTML = '';
        const skillTags = skillsList.querySelectorAll('.skill-tag span:first-child');
        if (skillTags.length > 0) {
            skillTags.forEach(skillSpan => {
                const li = document.createElement('li');
                li.textContent = skillSpan.textContent;
                previewSkills.appendChild(li);
            });
        } else {
            previewSkills.innerHTML = '<li>Example Skill</li>';
        }

        // Experience
        previewExperience.innerHTML = '';
        document.querySelectorAll('.experience-item').forEach(item => {
            const jobTitle = item.querySelector('.job-title').value;
            const company = item.querySelector('.company').value;
            const expYears = item.querySelector('.exp-years').value;
            const responsibilities = item.querySelector('.responsibilities').value;

            if (jobTitle || company || expYears || responsibilities) {
                const div = document.createElement('div');
                div.classList.add('experience-entry');
                div.innerHTML = `
                    <h4>${jobTitle || 'Job Title'} at ${company || 'Company'}</h4>
                    <p class="experience-years">${expYears || 'Years (e.g., 2022-Present)'}</p>
                    <p class="experience-responsibilities">${responsibilities || 'Key responsibilities and achievements will appear here.'}</p>
                `;
                previewExperience.appendChild(div);
            }
        });
        if (previewExperience.children.length === 0) {
            previewExperience.innerHTML = `
                <div class="experience-entry">
                    <h4>Job Title at Company</h4>
                    <p class="experience-years">Years (e.g., 2022-Present)</p>
                    <p class="experience-responsibilities">Key responsibilities and achievements will appear here.</p>
                </div>
            `;
        }
    };

    // Add event listeners for real-time updates
    const formInputs = resumeForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', updateResume);
    });

    // Function to add new education row
    addEducationButton.addEventListener('click', () => {
        const newEducationItem = document.createElement('div');
        newEducationItem.classList.add('education-item');
        newEducationItem.innerHTML = `
            <input type="text" class="degree" placeholder="Degree/Certification">
            <input type="text" class="university" placeholder="University/Institution">
            <input type="text" class="edu-years" placeholder="Years (e.g., 2018-2022)">
            <button type="button" class="remove-item">Remove</button>
        `;
        educationContainer.appendChild(newEducationItem);
        newEducationItem.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', updateResume);
        });
        newEducationItem.querySelector('.remove-item').addEventListener('click', () => {
            newEducationItem.remove();
            updateResume();
        });
        updateResume(); // Update preview after adding
    });

    // Function to add new experience row
    addExperienceButton.addEventListener('click', () => {
        const newExperienceItem = document.createElement('div');
        newExperienceItem.classList.add('experience-item');
        newExperienceItem.innerHTML = `
            <input type="text" class="job-title" placeholder="Job Title">
            <input type="text" class="company" placeholder="Company">
            <input type="text" class="exp-years" placeholder="Years (e.g., 2022-Present)">
            <textarea class="responsibilities" rows="3" placeholder="Key responsibilities and achievements..."></textarea>
            <button type="button" class="remove-item">Remove</button>
        `;
        experienceContainer.appendChild(newExperienceItem);
        newExperienceItem.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', updateResume);
        });
        newExperienceItem.querySelector('.remove-item').addEventListener('click', () => {
            newExperienceItem.remove();
            updateResume();
        });
        updateResume(); // Update preview after adding
    });

    // Function to add skill tag
    addSkillButton.addEventListener('click', () => {
    const skillText = skillInput.value.trim();
    if (skillText) {
        const existingSkills = Array.from(skillsList.querySelectorAll('.skill-tag span:first-child'))
            .map(span => span.textContent.toLowerCase());
        
        if (!existingSkills.includes(skillText.toLowerCase())) {
            const skillTag = document.createElement('div');
            skillTag.classList.add('skill-tag');
            skillTag.innerHTML = `
                <span>${skillText}</span>
                <span class="remove-skill">x</span>
            `;
            skillsList.appendChild(skillTag);
            skillInput.value = ''; // Clear input
            skillTag.querySelector('.remove-skill').addEventListener('click', () => {
                skillTag.remove();
                updateResume();
            });
            updateResume(); // Update preview
        } else {
            alert("Skill already added.");
        }
    }
});

    // Allow adding skill by pressing Enter in the input field
    skillInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            addSkillButton.click();
        }
    });

    // Clear form button
    clearFormButton.addEventListener('click', () => {
        resumeForm.reset(); // Resets all form fields
        // Manually clear dynamically added sections
        educationContainer.innerHTML = `
            <div class="education-item">
                <input type="text" class="degree" placeholder="Degree/Certification">
                <input type="text" class="university" placeholder="University/Institution">
                <input type="text" class="edu-years" placeholder="Years (e.g., 2018-2022)">
            </div>
        `;
        experienceContainer.innerHTML = `
            <div class="experience-item">
                <input type="text" class="job-title" placeholder="Job Title">
                <input type="text" class="company" placeholder="Company">
                <input type="text" class="exp-years" placeholder="Years (e.g., 2022-Present)">
                <textarea class="responsibilities" rows="3" placeholder="Key responsibilities and achievements..."></textarea>
            </div>
        `;
        skillsList.innerHTML = ''; // Clear skill tags

        // Re-attach event listeners for initial dynamic items after reset
        document.querySelectorAll('.education-item input').forEach(input => {
            input.addEventListener('input', updateResume);
        });
        document.querySelectorAll('.experience-item input, .experience-item textarea').forEach(input => {
            input.addEventListener('input', updateResume);
        });

        updateResume(); // Update preview to initial state
    });

    // Initial update of resume preview on page load
    updateResume();
});
document.getElementById('downloadResume').addEventListener('click', function () {
    const printContents = document.getElementById('resumePreview').innerHTML;
    const originalContents = document.body.innerHTML;

    // Open a new window for printing
    const printWindow = window.open('', '', 'height=800,width=600');
    printWindow.document.write(`
        <html>
            <head>
                <title>Resume</title>
                <link rel="stylesheet" href="resume.css">
            </head>
            <body>
                <div class="resume-paper">${printContents}</div>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.focus();

    // Give the browser time to render before printing
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
});
