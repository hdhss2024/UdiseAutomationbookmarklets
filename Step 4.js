(async () => {
  try {
    // Step 1: Navigate to Vocational Education Details (Step 4)
    const stepHeaders = document.querySelectorAll('.mat-step-header');
    if (stepHeaders.length >= 4) {
      stepHeaders[3].click();
      console.log('✅ Navigated to Vocational Education Details page.');
      await new Promise(res => setTimeout(res, 1200)); // Wait for content to load
    } else {
      throw new Error("❌ Vocational Education Details step header not found.");
    }

    // Step 2: Click "NO" for 'Did the student undertake any vocational course?'
    let noButton = null;
    const radioGroup = document.querySelector('div[id="isUtvcYN"]');
    if (radioGroup) {
      const labels = radioGroup.querySelectorAll('label');
      for (let i = 0; i < labels.length; i++) {
        if (labels[i].textContent.trim() === "No") {
          noButton = labels[i].previousElementSibling;
          break;
        }
      }
    }
    if (!noButton) throw new Error("❌ 'No' radio button not found for vocational course.");
    noButton.click();
    noButton.dispatchEvent(new Event('change', { bubbles: true }));
    console.log("✅ Selected 'No' for vocational course.");

    // Step 3: Select "3-Not Applicable" for previous class vocational exam
    const examDropdown = document.querySelector('select#prevClassVS[formcontrolname="prevClassVS"]');
    if (!examDropdown) throw new Error("❌ Vocational exam dropdown not found.");
    const notApplicableOption = Array.from(examDropdown.options).find(
      opt => opt.textContent.includes('3-Not Applicable')
    );
    if (!notApplicableOption) throw new Error("❌ '3-Not Applicable' option not found.");
    examDropdown.value = notApplicableOption.value;
    examDropdown.dispatchEvent(new Event('change', { bubbles: true }));
    console.log("✅ Selected '3-Not Applicable' in vocational exam dropdown.");

    // Optional Step 4: Click Save button if present
    const saveButton = document.querySelector('app-vocational-details-edit-new-ac .btnsave');
    if (saveButton) {
      saveButton.click();
      console.log("✅ Save button clicked for Vocational Education Details.");
    }

    // Step 5: Wait for success popup and click the "Okay" button
    const waitForOkayButton = () => {
      return new Promise((resolve, reject) => {
        let retries = 30; // ~3 seconds
        const interval = setInterval(() => {
          const popup = document.querySelector('.swal2-popup');
          const okayBtn = popup ? popup.querySelector('.swal2-confirm.swal2-styled') : null;
          if (popup && okayBtn && popup.style.display !== 'none' && okayBtn.offsetParent !== null) {
            clearInterval(interval);
            resolve(okayBtn);
          }
          if (--retries <= 0) {
            clearInterval(interval);
            reject("❌ 'Okay' button not found in success popup after waiting.");
          }
        }, 100);
      });
    };

    const okayButton = await waitForOkayButton();
    await new Promise(res => setTimeout(res, 200)); // brief wait for popup stabilization
    okayButton.click();
    console.log("✅ Clicked 'Okay' button on success popup.");

  } catch (error) {
    console.error(error);
  }
})();
