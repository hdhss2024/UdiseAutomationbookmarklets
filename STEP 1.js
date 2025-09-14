(async () => {
    try {
        // Step 1: Select "Under Investigation" in blood group dropdown
        const bloodGroupSelect = document.getElementById('bloodGroup');
        if (!bloodGroupSelect) throw new Error("❌ Blood group dropdown not found.");

        const targetOption = Array.from(bloodGroupSelect.options).find(opt => 
            opt.textContent.trim().startsWith('Under Investigation')
        );
        if (!targetOption) throw new Error("❌ 'Under Investigation' option not found.");

        bloodGroupSelect.value = targetOption.value;
        bloodGroupSelect.dispatchEvent(new Event('change'));
        console.log("✅ Blood group set to 'Under Investigation'.");

        // Step 2: Click Save button
        const saveButtonLabel = Array.from(document.querySelectorAll('.mdc-button__label'))
            .find(el => el.textContent.trim() === 'Save');

        if (!saveButtonLabel) throw new Error("❌ Save button not found.");
        saveButtonLabel.click();
        console.log("✅ Save button clicked.");

        // Step 3: Wait for confirmation dialog
        const waitForConfirmButton = () => {
            return new Promise((resolve, reject) => {
                let retries = 30; // 3 seconds
                const interval = setInterval(() => {
                    const confirmBtn = document.querySelector('.swal2-confirm');
                    if (confirmBtn && confirmBtn.offsetParent !== null) {
                        clearInterval(interval);
                        resolve(confirmBtn);
                    }
                    if (--retries <= 0) {
                        clearInterval(interval);
                        reject("❌ Confirmation button not found after waiting.");
                    }
                }, 100);
            });
        };

        // Step 4: Click confirmation button
        const confirmBtn = await waitForConfirmButton();
        confirmBtn.click();
        console.log("✅ Confirmation dialog closed.");

        // Step 5: Wait for 300ms
        await new Promise(res => setTimeout(res, 300));
        console.log("⏱️ Waited 300ms.");

        // Step 6: Click "Enrolment Profile" tab (step 2)
        const stepHeader = Array.from(document.querySelectorAll('mat-step-header'))
            .find(el => el.textContent.includes('Enrolment Profile'));
        
        if (!stepHeader) throw new Error("❌ 'Enrolment Profile' step not found.");
        stepHeader.click();
        console.log("✅ Clicked 'Enrolment Profile' step.");

    } catch (error) {
        console.error(error);
    }
})();
