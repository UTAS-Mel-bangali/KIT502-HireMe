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

    const emailField = form.querySelector("#loginEmail");
    const passwordField = form.querySelector("#loginPassword");

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        // Reset custom validity to clear previous messages
        emailField.setCustomValidity('');
        passwordField.setCustomValidity('');

        // Get field values
        const emailValue = emailField.value.trim();
        const passwordValue = passwordField.value;

        // Validate fields
        let isValid = true;

        // Email validation
        if (!emailValue) {
            emailField.setCustomValidity("Email is required");
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            emailField.setCustomValidity("Please enter a valid email address");
            isValid = false;
        }

        // Password validation
        if (!passwordValue) {
            passwordField.setCustomValidity("Password is required");
            isValid = false;
        } else if (passwordValue.length < 6) {
            passwordField.setCustomValidity("Password must be at least 6 characters long");
            isValid = false;
        }

        // Apply Bootstrap validation styling
        form.classList.add('was-validated');

        // Only proceed if form is valid
        if (isValid && form.checkValidity()) {
            console.log("Login form submitted successfully");
            // Here you would typically make an API call to authenticate the user
            // For now, we'll just reset the form and close the modal
            form.reset();
            bootstrap.Modal.getInstance(loginModal).hide();
            
            // Show success message (optional)
            showSuccessMessage("Login successful! Welcome back.");
        }
    }, false);

    // Real-time validation for immediate feedback
    [emailField, passwordField].forEach(field => {
        field.addEventListener('input', function () {
            const value = field.value.trim();
            
            if (!value) {
                field.setCustomValidity(`${field.id === 'loginEmail' ? 'Email' : 'Password'} is required`);
            } else if (field.id === 'loginEmail' && !isValidEmail(value)) {
                field.setCustomValidity("Please enter a valid email address");
            } else if (field.id === 'loginPassword' && value.length < 6) {
                field.setCustomValidity("Password must be at least 6 characters long");
            } else {
                field.setCustomValidity('');
            }
            
            form.classList.add('was-validated');
        });

        // Clear validation on blur if field is empty
        field.addEventListener('blur', function () {
            if (!field.value.trim()) {
                field.setCustomValidity(`${field.id === 'loginEmail' ? 'Email' : 'Password'} is required`);
                form.classList.add('was-validated');
            }
        });
    });

    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Success message helper function
    function showSuccessMessage(message) {
        // Create a temporary success alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 3000);
    }
}