![Hire Me Logo](logo_preview.png)

# 💼 HireMe Job Portal (Frontend UI) – KIT502 Assignment 1

This project is a **modular front-end user interface** for the **HireMe job platform**, developed as part of **KIT502 – Assignment 1**.

---

## 📂 Project Structure

```
/project-root
│
├── index.html                  # Homepage with carousel and dynamic placeholders
├── navbar.html                 # Bootstrap navbar (modal-based, loaded dynamically)
├── registration.html           # Registration modal, role-based fields
├── login.html                  # Login modal
├── job_listing.html            # Job listings with filter UI
├── job_details.html            # Job details page (dynamic)
├── manage_job.html             # Recruiter/admin job management dashboard
├── view_all_application.html   # Application view with filters
│
├── assets/
│   └── images/
│       ├── logo.png
│       ├── dev-job.png
│       ├── designer-job.png
│       └── marketing-job.png
│
├── css/
│   └── style.css               # Custom styles and Bootstrap overrides
│
├── js/
│   ├── navbar.js               # Loads navbar, registration & login modals
│   ├── registration.js         # Registration logic & validation
│   ├── login.js                # Login validation
│   ├── job_listing.js          # Job listings and filtering logic
│   ├── job_details.js          # Loads job details dynamically
│   ├── manage_jobs.js          # Job management logic
│   └── application_filter.js   # Application filtering logic
│
└── data/
    ├── jobs.json               # Sample job data (listing, details, manage jobs)
    └── application.json        # Sample application data (view & filter)
```

---

## 🗃️ Sample Data Files

* **`data/jobs.json`**
  Contains an array of job objects with fields like:
  `id`, `title`, `company`, `type`, `industry`, `description`, `link`, `status`, `created`, and `salary`.
  → Used by job listing, job details, and manage jobs features.

* **`data/application.json`**
  Contains application objects with fields:
  `name`, `email`, `phone`, `job`, `type`, `date`, `status`, and `cv`.
  → Used by the application view and filtering feature.

---

## 🎯 Key Features

### ✅ Modular UI Components

* Navbar & registration modals in separate HTML files
* Loaded dynamically using `fetch()`

### 🔐 Login & Registration

* Bootstrap modal-based forms
* Placeholder validation for empty fields
* Role-based registration (student, recruiter, placement officer)

### 👥 User Roles

* **Students** → Register with name, email, course, year level, password, resume (optional)
* **Recruiters** → Register with name, email, company details, industry, location, password
* **Placement Officers (Admin)** → Can register/login (extra features planned)

---

## 🛡️ Validations

**Password Requirements:**

* ≥ 8 characters
* At least **1 uppercase letter**
* At least **1 number**
* At least **1 special character** (`@`, `#`, `$`, `%`)

**Form Validations:**

* Required fields must be filled
* Passwords must match
* Client-side validation with JavaScript

---

## 🎨 CSS & Theming

* Custom styles & Bootstrap overrides in `css/style.css`
* Theme managed with CSS variables (e.g., `--bs-primary`)
* Consistent button, card, and form design with hover/transition effects
* Responsive design with media queries
* Custom classes like `.job-card` and `.status-badge`

---

## 💡 How It Works

1. `index.html` includes a placeholder `<div id="navbar-placeholder"></div>`
2. `navbar.js` injects `navbar.html` and `registration.html` dynamically
3. Clicking **Register** or **Login** opens modal forms with validations

---

## 📌 Notes

* No backend/database integration (front-end only)
* Resume upload is optional (will be required in job applications later)
* All users must register before accessing the platform

---

✨ This project demonstrates **front-end modular development, role-based registration, UI validation, and responsive design** for a job portal system.
