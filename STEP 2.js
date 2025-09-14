(async () => {
    try {
        // First, ensure we're on the Enrolment Profile page (Step 2)
        // Check if we're already on Step 2, if not, navigate to it
        const stepHeaders = document.querySelectorAll('.mat-step-header');
        if (stepHeaders.length >= 2) {
            // Click on the second step header to navigate to the Enrolment Profile
            stepHeaders[1].click();
            console.log('✅ Navigated to Enrolment Profile page.');
            
            // Wait for the page to load
            await new Promise(res => setTimeout(res, 1000));
        }

        // Step 1: Insert Admission No.
        const admNoInput = document.querySelector('#admNo');
        if (!admNoInput) throw new Error("❌ Admission number input not found.");
        admNoInput.value = '2025/X-A/001';
        admNoInput.dispatchEvent(new Event('input', { bubbles: true }));
        console.log('✅ Admission number set.');

        // Step 2: Insert Admission Date
        const admDateInput = document.querySelector('#admDate');
        if (!admDateInput) throw new Error("❌ Admission date input not found.");
        admDateInput.value = '01/04/2024';
        admDateInput.dispatchEvent(new Event('input', { bubbles: true }));
        console.log('✅ Admission date set.');

        // Step 3: Insert Roll Number
        const rollNoInput = document.querySelector('#rollNo');
        if (!rollNoInput) throw new Error("❌ Roll number input not found.");
        rollNoInput.value = '001';
        rollNoInput.dispatchEvent(new Event('input', { bubbles: true }));
        console.log('✅ Roll number set.');

        // Step 4: Select Medium of Instruction "1-Assamese"
        const mediumSelect = document.querySelector('#medium');
        if (!mediumSelect) throw new Error("❌ Medium dropdown not found.");
        const assameseOption = Array.from(mediumSelect.options).find(o => o.textContent.includes('1-Assamese'));
        if (!assameseOption) throw new Error("❌ '1-Assamese' option not found.");
        mediumSelect.value = assameseOption.value;
        mediumSelect.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('✅ Medium set to Assamese.');

        // Step 5: Wait 400ms then select "Assamese_English"
        await new Promise(res => setTimeout(res, 400));
        const languageSelect = document.querySelector('#languageGroup');
        if (!languageSelect) throw new Error("❌ Language group dropdown not found.");
        const langOption = Array.from(languageSelect.options).find(o => o.textContent.includes('Assamese_English'));
        if (!langOption) throw new Error("❌ 'Assamese_English' option not found.");
        languageSelect.value = langOption.value;
        languageSelect.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('✅ Language group set.');

        // Step 6: Insert random marks (45–55)
        const marksInput = document.querySelector('[formcontrolname="examMarksPy"]');
        if (!marksInput) throw new Error("❌ Marks input not found.");
        const randomMarks = Math.floor(Math.random() * (55 - 45 + 1)) + 45;
        marksInput.value = randomMarks;
        marksInput.dispatchEvent(new Event('input', { bubbles: true }));
        console.log(`✅ Marks set to ${randomMarks}.`);

        // Step 7: Insert random attendance (180–220)
        const attendanceInput = document.querySelector('#attendancePy');
        if (!attendanceInput) throw new Error("❌ Attendance input not found.");
        const randomAttendance = Math.floor(Math.random() * (220 - 180 + 1)) + 180;
        attendanceInput.value = randomAttendance;
        attendanceInput.dispatchEvent(new Event('input', { bubbles: true }));
        console.log(`✅ Attendance set to ${randomAttendance}.`);

        // Step 8: Click Save button specifically for the Enrolment Profile page
        // Look for the Save button within the Enrolment Profile section
        const enrolmentSection = document.querySelector('app-enrolment-edit-new-ac');
        if (!enrolmentSection) throw new Error("❌ Enrolment section not found.");
        
        const saveButton = enrolmentSection.querySelector('.btnsave');
        if (!saveButton) throw new Error("❌ Save button not found in Enrolment section.");
        
        saveButton.click();
        console.log("✅ Save button clicked for Enrolment Profile.");

        // Step 9: Wait for the success popup to appear and click the "Close" button
        console.log("⏳ Waiting for success popup...");
        
        // Function to wait for the popup to appear
        const waitForPopup = () => {
            return new Promise((resolve, reject) => {
                let retries = 30; // check for ~3 seconds
                const interval = setInterval(() => {
                    const popup = document.querySelector('.swal2-popup');
                    const closeButton = popup ? popup.querySelector('.swal2-confirm') : null;
                    
                    if (popup && closeButton && popup.style.display !== 'none') {
                        clearInterval(interval);
                        resolve(closeButton);
                    }
                    if (--retries <= 0) {
                        clearInterval(interval);
                        reject("❌ Success popup not found after waiting.");
                    }
                }, 100);
            });
        };

        // Wait for the popup and click the Close button
        const closeButton = await waitForPopup();
        console.log("✅ Success popup found.");
        
        // Wait a moment for the popup to fully render
        await new Promise(res => setTimeout(res, 500));
        
        // Click the Close button
        closeButton.click();
        console.log("✅ Close button clicked.");

        console.log("✅ Enrolment Profile data filled and saved successfully!");

    } catch (err) {
        console.error(err);
    }
})();