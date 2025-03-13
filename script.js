document.addEventListener('DOMContentLoaded', () => {
    const captchaCheckbox = document.getElementById('captchaCheckbox');
    const confirmButton = document.getElementById('confirmButton');
    const result = document.getElementById('result');
    let lastMouseX = -1;
    let lastMouseY = -1;
    let straightLineMovementDetected = false;
    let lastConfirmClickTime = 0;
    const clickCooldown = 100; // 1 second cooldown between clicks

    document.addEventListener('mousemove', (event) => {
        if (lastMouseX >= 0 && lastMouseY >= 0) {
            const dx = event.clientX - lastMouseX;
            const dy = event.clientY - lastMouseY;
            if ((dx === 0 || dy === 0) && (dx !== 0 || dy !== 0)) {
                straightLineMovementDetected = true;
            } else {
                straightLineMovementDetected = false;
            }
        }
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    });

    confirmButton.addEventListener('click', () => {
        const now = Date.now();
        if (now - lastConfirmClickTime < clickCooldown) {
            result.textContent = 'Failed: Too many attempts';
            result.style.color = 'red';
            return;
        }
        lastConfirmClickTime = now;

        if (straightLineMovementDetected) {
            result.textContent = 'Failed: Robotic mouse movement detected, Please try again.';
            result.style.color = 'red';
        } else if (captchaCheckbox.checked) {
            result.textContent = 'CAPTCHA passed!';
            result.style.color = 'green';
        } else {
            result.textContent = 'Please check the CAPTCHA box.';
            result.style.color = 'red';
        }
        result.classList.add('show');
    });
});
