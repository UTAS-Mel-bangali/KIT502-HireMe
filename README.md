# HireMe Job Portal (Frontend UI) - KIT502 - Assignment 1

This project is a modular front-end user interface for the **HireMe** job platform, built for **KIT502 Assignment 1**.

---

### 📁 Project Structure

```
/project-root
│
├── index.html
├── navbar.html               # Separated Bootstrap navbar (modal-based)
├── register.html             # Registration modal, role-based fields
├── assets/
│   └── images/
│       └── logo.png
├── css/
│   └── styles.css            # Optional custom styles
└── js/
    └── main.js               # Loads navbar and registration modals dynamically
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

### 💡 How It Works

- `index.html` contains the homepage and placeholder `<div id="navbar-placeholder"></div>`
- On page load, `main.js` loads `navbar.html` and `register.html` and injects them into the page
- Clicking "Register" or "Login" opens Bootstrap modals with validations

---

### 📌 Notes

- No backend/database integration included
- Resume is optional now, but required later when applying for jobs
- All users must register before interacting with the platform
