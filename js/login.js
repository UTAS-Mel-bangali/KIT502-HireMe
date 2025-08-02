function initializeLoginForm() {
    'use strict';
    const loginModal = document.getElementById('loginModal');
    if (!loginModal) {
        console.error('Login modal not found');
        return;
    }

    const form = loginModal.querySelector('.needs-validation');
    if (!form) {
        console.error('No form found in login modal');
        return;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const email = form.querySelector("#loginEmail");
        const password = form.querySelector("#loginPassword");

        // Reset custom validity to clear previous messages
        email.setCustomValidity('');
        password.setCustomValidity('');

        // Get field values
        const emailValue = email.value.trim();
        const passwordValue = password.value;

        // Validate fields
        let isValid = true;

        if (!emailValue) {
            email.setCustomValidity("Email is required");
            isValid = false;
        }

        if (!passwordValue) {
            password.setCustomValidity("Password is required");
            isValid = false;
        }

        // Apply Bootstrap validation styling
        form.classList.add('was-validated');

        // Only proceed if form is valid
        if (isValid && form.checkValidity()) {
            console.log("Login form submitted successfully");
            form.reset();
            bootstrap.Modal.getInstance(loginModal).hide();
        }
    }, false);

    // Real-time validation for immediate feedback
    [email, password].forEach(field => {
        field.addEventListener('input', function () {
            if (field.value.trim()) {
                field.setCustomValidity('');
            } else {
                field.setCustomValidity(`${field.id === 'loginEmail' ? 'Email' : 'Password'} is required`);
            }
            form.classList.add('was-validated');
        });
    });
}