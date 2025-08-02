document.addEventListener("DOMContentLoaded", function () {
    // Load navbar
    fetch("navbar.html")
        .then((response) => {
            if (!response.ok) throw new Error("Failed to load navbar");
            return response.text();
        })
        .then((html) => {
            document.getElementById("navbar-placeholder").innerHTML = html;

            // Load registration modal
            return fetch("registration.html");
        })
        .then((response) => {
            if (!response.ok) throw new Error("Failed to load register modal");
            return response.text();
        })
        .then((regHtml) => {
            document.getElementById("register-placeholder").innerHTML = regHtml;

            // Load login modal
            return fetch("login.html");
        })
        .then((response) => {
            if (!response.ok) throw new Error("Failed to load login modal");
            return response.text();
        })
        .then((loginHtml) => {
            // Create a login placeholder if it doesn't exist
            let loginPlaceholder = document.getElementById('login-placeholder');
            if (!loginPlaceholder) {
                loginPlaceholder = document.createElement('div');
                loginPlaceholder.id = 'login-placeholder';
                document.body.appendChild(loginPlaceholder);
            }
            loginPlaceholder.innerHTML = loginHtml;

            // Initialize Bootstrap modals
            const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));

            // Add event listeners for modal triggers
            document.querySelectorAll('[data-bs-toggle="modal"]').forEach(button => {
                button.addEventListener('click', () => {
                    const targetModal = button.getAttribute('data-bs-target');
                    if (targetModal === '#registerModal') {
                        registerModal.show();
                    } else if (targetModal === '#loginModal') {
                        loginModal.show();
                    }
                });
            });

            // Initialize registration form logic
            if (typeof initializeRegistrationForm === 'function') {
                initializeRegistrationForm();
            }

            // Initialize login form logic
            if (typeof initializeLoginForm === 'function') {
                initializeLoginForm();
            }
        })
        .catch((error) => {
            console.error("Error loading components:", error);
        });
});