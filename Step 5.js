(async () => {
  try {
    // Step 1: Navigate to "Profile Preview" (step 5)
    const stepHeaders = document.querySelectorAll('.mat-step-header');
    if (stepHeaders.length >= 5) {
      stepHeaders[4].click();
      console.log('✅ Navigated to Profile Preview page.');
      await new Promise(res => setTimeout(res, 1200)); // Wait for content to load
    } else {
      throw new Error("❌ Profile Preview step header not found.");
    }

    // Step 2: Click "COMPLETE DATA" button
    const completeDataButton = Array.from(document.querySelectorAll('button.btnsave'))
      .find(btn => btn.textContent.trim() === 'Complete Data');
    if (!completeDataButton) throw new Error("❌ 'Complete Data' button not found.");
    completeDataButton.click();
    console.log('✅ "Complete Data" button clicked.');

    // Step 3: Wait for confirmation popup with buttons "Close" and "Okay"
    const waitForConfirmationPopupButton = () => {
      return new Promise((resolve, reject) => {
        let retries = 30; // ~3 seconds max wait
        const interval = setInterval(() => {
          const popup = document.querySelector('.swal2-popup');
          if (popup && popup.style.display !== 'none') {
            const okayBtn = popup.querySelector('button.swal2-cancel.swal2-styled');
            if (okayBtn && okayBtn.offsetParent !== null && okayBtn.textContent.trim() === 'Okay') {
              clearInterval(interval);
              resolve(okayBtn);
            }
          }
          if (--retries <= 0) {
            clearInterval(interval);
            reject("❌ 'Okay' button not found in confirmation popup after waiting.");
          }
        }, 100);
      });
    };

    // Step 4: Click "Okay" button inside the confirmation popup
    const okayButton = await waitForConfirmationPopupButton();
    await new Promise(res => setTimeout(res, 200)); // brief pause before click
    okayButton.click();
    console.log('✅ Clicked "Okay" button on confirmation popup.');

    // Step 5: Wait for success popup with title "Data completion is complete."
    const waitForSuccessPopupButton = () => {
      return new Promise((resolve, reject) => {
        let retries = 40; // ~4 seconds max wait
        const interval = setInterval(() => {
          const popup = document.querySelector('.swal2-popup');
          if (popup && popup.style.display !== 'none') {
            const title = popup.querySelector('#swal2-title');
            const nextStudentBtn = popup.querySelector('button.swal2-cancel.swal2-styled');
            if (title && title.textContent.trim() === 'Data completion is complete.' 
                && nextStudentBtn && nextStudentBtn.offsetParent !== null 
                && nextStudentBtn.textContent.trim() === 'Next Student') {
              clearInterval(interval);
              resolve(nextStudentBtn);
            }
          }
          if (--retries <= 0) {
            clearInterval(interval);
            reject("❌ 'Next Student' button not found in success popup after waiting.");
          }
        }, 100);
      });
    };

    // Step 6: Click the "Next Student" button on the success popup
    const nextStudentButton = await waitForSuccessPopupButton();
    await new Promise(res => setTimeout(res, 200)); // brief pause before click
    nextStudentButton.click();
    console.log('✅ Clicked "Next Student" button on success popup.');

  } catch (error) {
    console.error(error);
  }
})();
