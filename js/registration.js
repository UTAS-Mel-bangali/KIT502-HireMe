function initializeRegistrationForm() {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    const userTypeSelect = document.getElementById('userType');
    const studentFields = document.getElementById('studentFields');
    const recruiterFields = document.getElementById('recruiterFields');

    // Function to toggle user-specific fields visibility and requirements
    function toggleUserFields() {
        if (userTypeSelect && studentFields && recruiterFields) {
            const isStudent = userTypeSelect.value === 'student';
            const isRecruiter = userTypeSelect.value === 'recruiter';

            // Toggle student fields
            studentFields.style.display = isStudent ? 'block' : 'none';
            studentFields.querySelectorAll('select').forEach(field => {
                if (isStudent) {
                    field.setAttribute('required', 'required');
                } else {
                    field.removeAttribute('required');
                    field.value = ''; // Reset student fields when hidden
                }
            });

            // Toggle recruiter fields
            recruiterFields.style.display = isRecruiter ? 'block' : 'none';
            recruiterFields.querySelectorAll('input, select').forEach(field => {
                if (isRecruiter) {
                    field.setAttribute('required', 'required');
                } else {
                    field.removeAttribute('required');
                    field.value = ''; // Reset recruiter fields when hidden
                }
            });
        }
    }

    // Initialize toggle and add event listener
    if (userTypeSelect) {
        toggleUserFields(); // Initial state
        userTypeSelect.addEventListener('change', toggleUserFields);
    }

    Array.from(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Always prevent default to control submission
            event.stopPropagation();

            const userType = form.querySelector("#userType").value;
            const fullName = form.querySelector("#fullName").value.trim();
            const email = form.querySelector("#email").value.trim();
            const pass = form.querySelector("#password").value;
            const confirm = form.querySelector("#confirmPassword").value;

            // Reset custom validity
            form.querySelectorAll('input, select').forEach(field => {
                field.setCustomValidity('');
            });

            // Validate common required fields
            let isValid = true;

            if (!userType) {
                form.querySelector("#userType").setCustomValidity("Please select a user type");
                isValid = false;
            }

            if (!fullName) {
                form.querySelector("#fullName").setCustomValidity("Full name is required");
                isValid = false;
            }

            if (!email) {
                form.querySelector("#email").setCustomValidity("Email is required");
                isValid = false;
            }

            if (!pass) {
                form.querySelector("#password").setCustomValidity("Password is required");
                isValid = false;
            }

            if (!confirm) {
                form.querySelector("#confirmPassword").setCustomValidity("Confirm password is required");
                isValid = false;
            }

            if (pass !== confirm) {
                form.querySelector("#confirmPassword").setCustomValidity("Passwords do not match");
                isValid = false;
            }

            // Validate student fields if user type is student
            if (userType === 'student') {
                const course = form.querySelector("#course").value;
                const yearLevel = form.querySelector("#yearLevel").value;

                if (!course) {
                    form.querySelector("#course").setCustomValidity("Please select a course");
                    isValid = false;
                }

                if (!yearLevel) {
                    form.querySelector("#yearLevel").setCustomValidity("Please select a year level or graduate status");
                    isValid = false;
                }
            }

            // Validate recruiter fields if user type is recruiter
            if (userType === 'recruiter') {
                const companyName = form.querySelector("#companyName").value.trim();
                const industryType = form.querySelector("#industryType").value;
                const companyLocation = form.querySelector("#companyLocation").value.trim();

                if (!companyName) {
                    form.querySelector("#companyName").setCustomValidity("Company name is required");
                    isValid = false;
                }

                if (!industryType) {
                    form.querySelector("#industryType").setCustomValidity("Please select an industry type");
                    isValid = false;
                }

                if (!companyLocation) {
                    form.querySelector("#companyLocation").setCustomValidity("Company location is required");
                    isValid = false;
                }
            }

            if (isValid && form.checkValidity()) {
                console.log("Registration form submitted successfully");
                form.reset();
                bootstrap.Modal.getInstance(form.closest('.modal')).hide();
            } else {
                form.classList.add('was-validated');
            }
        }, false);

        // Real-time validation for immediate feedback
        form.querySelectorAll('input, select').forEach(field => {
            field.addEventListener('input', function () {
                if (field.value.trim() || field.tagName === 'SELECT') {
                    field.setCustomValidity('');
                } else {
                    field.setCustomValidity(`${field.id === 'userType' ? 'User type' : field.id === 'fullName' ? 'Full name' : field.id === 'email' ? 'Email' : field.id === 'password' ? 'Password' : field.id === 'confirmPassword' ? 'Confirm password' : field.id === 'companyName' ? 'Company name' : field.id === 'industryType' ? 'Industry type' : field.id === 'companyLocation' ? 'Company location' : 'Field'} is required`);
                }
                form.classList.add('was-validated');
            });
        });
    });
}