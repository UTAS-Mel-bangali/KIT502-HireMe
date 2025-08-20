![Hire Me Logo](logo_preview.png)
# HireMe Job Portal (Frontend UI) - KIT502 - Assignment 1

This project is a modular front-end user interface for the **HireMe** job platform, built for **KIT502 Assignment 1**.

---

### 📁 Project Structure

```
/project-root
│
├── index.html                  # Homepage with carousel and dynamic placeholders
├── navbar.html                 # Bootstrap navbar (modal-based, loaded dynamically)
├── registration.html           # Registration modal, role-based fields
├── login.html                  # Login modal
├── job_listing.html            # Job listings with filter UI
├── job_details.html            # Job details page (dynamic)
├── manage_job.html             # Manage jobs dashboard (for recruiters/admin)
├── view_all_application.html   # View all job applications (with filters)
├── assets/
│   └── images/
│       ├── logo.png
│       ├── dev-job.png
│       ├── designer-job.png
│       └── marketing-job.png
├── css/
│   └── style.css               # Custom styles and Bootstrap overrides
├── js/
│   ├── navbar.js               # Loads navbar, registration, and login modals dynamically
│   ├── registration.js         # Registration form logic and validation
│   ├── login.js                # Login form logic and validation
│   ├── job_listing.js          # Loads and filters job listings
│   ├── job_details.js          # Loads job details dynamically
│   ├── manage_jobs.js          # Manage jobs dashboard logic
│   └── application_filter.js   # Filtering logic for applications
└── data/
    ├── jobs.json               # Sample job data for job listing and manage jobs
    └── application.json        # Sample application data for view all applications
```

### 🗃️ Sample Data Files

- `data/jobs.json`: Contains an array of job objects, each with fields like `id`, `title`, `company`, `type`, `industry`, `description`, `link`, `status`, `created`, and `salary`. Used by job listing, job details, and manage jobs features for demo and filtering.

- `data/application.json`: Contains an array of application objects, each with fields like `name`, `email`, `phone`, `job`, `type`, `date`, `status`, and `cv`. Used by the view all applications page for demo and filtering.

These files allow the frontend to demonstrate full functionality (listing, filtering, managing, and viewing applications) without a backend.
```

---

### 🎯 Features Implemented

#### ✅ Modular UI Components
- Navbar and Registration Modals separated into HTML files
- Loaded via JavaScript using `fetch()`

#### 🔐 Login & Registration Modals
- Modal-based forms using Bootstrap 5
- Placeholder validation to ensure no empty fields
- Login modal with basic email/password validation
- Role-based dynamic registration

---

### 👥 User Roles & Registration Fields

#### 🔹 Students
- Full Name
- Email
- Password (validated)
- Course (e.g., ICT, Business)
- Year Level (First, Second, Third Year)
- Resume Upload (optional for now)

#### 🔹 Recruiters
- Full Name
- Email Address
- Company Name
- Industry Type (e.g., IT, Finance)
- Company Location
- Password (validated)

#### 🔹 Placement Officers (Admin)
- Can register/login
- Additional features will be added in later stages

---

### 🛡️ Validations

#### Password Requirements:
- Minimum 8 characters  
- At least one uppercase letter  
- At least one number  
- At least one special character (`@`, `#`, `$`, `%`)

#### Form Validations:
- All required fields must be filled
- Passwords must match
- Fields are validated in-browser via JavaScript

---


### 🎨 CSS & Theming

- All custom styles and Bootstrap overrides are in `css/style.css`.
- The primary color theme is set using CSS variables (e.g., `--bs-primary`), ensuring consistent button and UI coloring.
- Buttons, forms, and cards use custom transitions, hover effects, and spacing for a modern look.
- Responsive design is achieved with media queries for mobile-friendly layouts.
- Custom classes (e.g., `.job-card`, `.status-badge`) are used for job listings and application tables.
- Bootstrap classes are extended for a unique but familiar user experience.

---

### 💡 How It Works

- `index.html` contains the homepage and placeholder `<div id="navbar-placeholder"></div>`
- On page load, `navbar.js` loads `navbar.html` and `register.html` and injects them into the page
- Clicking "Register" or "Login" opens Bootstrap modals with validations

---

### 📌 Notes

- No backend/database integration included
- Resume is optional now, but required later when applying for jobs
- All users must register before interacting with the platform
