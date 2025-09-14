(async () => {
    try {
        // First, navigate to the Facility Profile page (Step 3)
        const stepHeaders = document.querySelectorAll('.mat-step-header');
        if (stepHeaders.length >= 3) {
            // Click on the third step header to navigate to the Facility Profile
            stepHeaders[2].click();
            console.log('✅ Navigated to Facility Profile page.');
            
            // Wait for the page to load
            await new Promise(res => setTimeout(res, 1500));
        }

        // Step 1: Select "Yes" for "Whether Facilities provided to the Student"
        const facilityYesRadio = document.querySelector('input[formcontrolname="facProvYN"][value="1"]');
        if (!facilityYesRadio) throw new Error("❌ 'Yes' radio button for facilities not found.");
        
        facilityYesRadio.click();
        facilityYesRadio.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('✅ Selected "Yes" for facilities provided.');

        // Wait for the checkboxes to become enabled
        await new Promise(res => setTimeout(res, 800));

        // Step 2: First, uncheck ALL facility checkboxes
        const allFacilityCheckboxes = document.querySelectorAll('#facProvided input[type="checkbox"]');
        console.log(`Found ${allFacilityCheckboxes.length} facility checkboxes`);
        
        for (const checkbox of allFacilityCheckboxes) {
            if (checkbox.checked) {
                checkbox.click();
                checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                console.log(`☑️ Unchecked: ${checkbox.nextElementSibling.textContent.trim()}`);
            }
        }

        // Step 3: Now check only the three specific facilities we want
        const facilitiesToSelect = [
            { id: 'textbook', name: 'Free Text Book' },
            { id: 'uniforms', name: 'Free Uniforms' },
            { id: 'bi-cycle', name: 'Free Bi-Cycle' }
        ];

        for (const facility of facilitiesToSelect) {
            const checkbox = document.querySelector(`#${facility.id}`);
            if (!checkbox) {
                console.log(`❌ ${facility.name} checkbox not found`);
                continue;
            }
            
            if (!checkbox.checked) {
                checkbox.click();
                checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                console.log(`✅ Selected ${facility.name}`);
            } else {
                console.log(`ℹ️ ${facility.name} was already selected`);
            }
            
            // Small delay between selections
            await new Promise(res => setTimeout(res, 200));
        }

        // Step 4: Set all seven radio buttons to "No"
        const radioButtonsToSetNo = [
            { name: 'screenedForSld', question: 'Screened for Specific Learning Disability (SLD)' },
            { name: 'autismSpectrumDisorder', question: 'Screened for Autism Spectrum Disorder (ASD)' },
            { name: 'attentionDeficitHyperactiveDisorder', question: 'Screened for Attention Deficit Hyperactive Disorder (ADHD)' },
            { name: 'giftedChildrenYn', question: 'Identified as Gifted/Talented' },
            { name: 'olympdsNlc', question: 'Appeared in Competitions/Olympiads' },
            { name: 'nccNssYn', question: 'Participate in NCC/NSS/Scouts and Guides' },
            { name: 'digitalCapableYn', question: 'Capable of handling digital devices' }
        ];

        console.log('🔘 Setting all radio buttons to "No"...');
        
        for (const radio of radioButtonsToSetNo) {
            const noRadioButton = document.querySelector(`input[formcontrolname="${radio.name}"][value="2"]`);
            if (noRadioButton) {
                noRadioButton.click();
                noRadioButton.dispatchEvent(new Event('change', { bubbles: true }));
                console.log(`✅ Set "${radio.question}" to No`);
            } else {
                console.log(`❌ Could not find "No" button for ${radio.question}`);
            }
            await new Promise(res => setTimeout(res, 100));
        }

        // Step 5: Set random student height (145-165 cm)
        const heightInput = document.querySelector('input[formcontrolname="heightInCm"]');
        if (heightInput) {
            const randomHeight = Math.floor(Math.random() * (165 - 145 + 1)) + 145;
            heightInput.value = randomHeight;
            heightInput.dispatchEvent(new Event('input', { bubbles: true }));
            console.log(`📏 Set student height to: ${randomHeight} cm`);
        } else {
            console.log('❌ Height input not found');
        }

        // Step 6: Set random student weight (40-60 kg)
        const weightInput = document.querySelector('input[formcontrolname="weightInKg"]');
        if (weightInput) {
            const randomWeight = Math.floor(Math.random() * (60 - 40 + 1)) + 40;
            weightInput.value = randomWeight;
            weightInput.dispatchEvent(new Event('input', { bubbles: true }));
            console.log(`⚖️ Set student weight to: ${randomWeight} kg`);
        } else {
            console.log('❌ Weight input not found');
        }

        // Step 7: Select first option from "Approximate Distance" dropdown
        const distanceSelect = document.querySelector('select[formcontrolname="distanceFrmSchool"]');
        if (!distanceSelect) throw new Error("❌ Distance dropdown not found.");
        
        // Select the first non-empty option (value="1")
        if (distanceSelect.options.length > 1) {
            distanceSelect.value = "1";
            distanceSelect.dispatchEvent(new Event('change', { bubbles: true }));
            console.log('✅ Selected "Less than 1 km" for distance.');
        } else {
            throw new Error("❌ No options found in distance dropdown.");
        }

        // Step 8: Select first option from "Education Level" dropdown
        const educationSelect = document.querySelector('select[formcontrolname="parentEducation"]');
        if (!educationSelect) throw new Error("❌ Education level dropdown not found.");
        
        // Select the first non-empty option (value="1")
        if (educationSelect.options.length > 1) {
            educationSelect.value = "1";
            educationSelect.dispatchEvent(new Event('change', { bubbles: true }));
            console.log('✅ Selected "Primary" for education level.');
        } else {
            throw new Error("❌ No options found in education level dropdown.");
        }

        // Step 9: Verify our selections
        console.log("🔍 Verifying selections...");
        
        // Verify facility selections
        const textbookCheckbox = document.querySelector('#textbook');
        const uniformsCheckbox = document.querySelector('#uniforms');
        const bicycleCheckbox = document.querySelector('#bi-cycle');
        
        console.log(`Free Text Book: ${textbookCheckbox.checked ? 'SELECTED' : 'NOT SELECTED'}`);
        console.log(`Free Uniforms: ${uniformsCheckbox.checked ? 'SELECTED' : 'NOT SELECTED'}`);
        console.log(`Free Bi-Cycle: ${bicycleCheckbox.checked ? 'SELECTED' : 'NOT SELECTED'}`);
        
        // Verify other checkboxes are NOT selected
        const otherCheckboxes = document.querySelectorAll('#facProvided input[type="checkbox"]:not(#textbook):not(#uniforms):not(#bi-cycle)');
        let allOthersUnchecked = true;
        
        for (const checkbox of otherCheckboxes) {
            if (checkbox.checked) {
                console.log(`❌ ${checkbox.nextElementSibling.textContent.trim()} is still selected!`);
                allOthersUnchecked = false;
            }
        }
        
        if (allOthersUnchecked) {
            console.log("✅ All other facilities are properly unchecked");
        }

        // Verify radio buttons are set to "No"
        for (const radio of radioButtonsToSetNo) {
            const noRadioButton = document.querySelector(`input[formcontrolname="${radio.name}"][value="2"]`);
            if (noRadioButton && noRadioButton.checked) {
                console.log(`✅ ${radio.question}: NO`);
            } else {
                console.log(`❌ ${radio.question}: NOT set to NO`);
            }
        }

        // Verify dropdown selections
        console.log(`📏 Distance selected: ${distanceSelect.options[distanceSelect.selectedIndex].text.trim()}`);
        console.log(`🎓 Education level selected: ${educationSelect.options[educationSelect.selectedIndex].text.trim()}`);

        // Step 10: Click Save button
        const saveButton = document.querySelector('app-other-details-edit-new-ac .btnsave');
        if (!saveButton) throw new Error("❌ Save button not found.");
        
        saveButton.click();
        console.log("✅ Save button clicked for Facility Profile.");

        // Step 11: Wait for the success popup to appear and click the "Close" button
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

        console.log("✅ Facility Profile fully configured and saved successfully!");

    } catch (err) {
        console.error(err);
    }
})();