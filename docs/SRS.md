# **Software Requirements Specification (SRS)**

## **1. Introduction**

### **1.1 Purpose**

The purpose of this Software Requirements Specification (SRS) is to define the requirements for the University Event Management System. This system will serve as a centralized platform for managing, publishing, and participating in events organized by IUBAT University, improving accessibility and organizational efficiency.

### **1.2 Scope**

The system will enable students to view and register for global, departmental, and private events; allow managers to create, update, and manage events within their departments; and provide administrators with complete control over all users and events. It will be a responsive web application developed using React.js, Tailwind CSS, Django or Node.js backend, and a PostgreSQL database.

### **1.3 Definitions, Acronyms, and Abbreviations**

* **SRS:** Software Requirements Specification
* **IUBAT:** International University of Business Agriculture and Technology
* **CRUD:** Create, Read, Update, Delete
* **JWT:** JSON Web Token
* **UI:** User Interface
* **API:** Application Programming Interface

### **1.4 References**

* React.js Official Documentation
* Tailwind CSS Documentation
* Django REST Framework Documentation
* PostgreSQL Documentation
* IEEE SRS Template Guidelines

---

## **2. Overall Description**

### **2.1 Product Perspective**

The University Event Management System is an independent web-based platform intended to integrate with university operations but remain functionally separate from the overloaded main academic website.

### **2.2 Product Functions**

The key functions include:

* User authentication and role-based authorization.
* Event creation, editing, and deletion by managers and admins.
* Viewing of global, departmental, and private events.
* Student registration and voting for events.
* Uploading event posters and related files.
* Admin management of managers and all users.
* Dashboard for managers and admins to oversee their responsibilities.

### **2.3 User Classes and Characteristics**

* **Students:** Can register and log in to view departmental and private events, register for events, and vote for participation when applicable. Global events are viewable without login.

* **Managers:** Assigned by admin to manage events within specific departments, approve student access for private events, and perform CRUD operations on their events.

* **Admins:** University authorities with full system control including user management, event management, and manager assignment.

### **2.4 Operating Environment**

* Frontend: React.js, Tailwind CSS
* Backend: Django REST Framework or Node.js with Express
* Database: PostgreSQL
* Hosting: Vercel or Netlify for frontend; Render, Railway, or university server for backend

### **2.5 Constraints**

* Project duration limited to 1 – 1.2 months.
* Team size: 3 members.
* Must use technologies covered in course and known by team.
* Should remain simple with complex features deferred to future scope.

### **2.6 Assumptions and Dependencies**

* Students have valid university IDs or Google accounts for authentication.
* Managers are pre-assigned by admins.
* Admin credentials are securely created and stored by system developers or university IT.

---

## **3. Specific Requirements**

### **3.1 Functional Requirements**

#### **3.1.1 User Registration and Authentication**

* Students can register using university ID or Google Auth.
* Managers and Admins have pre-created accounts.
* JWT-based authentication for secure sessions.

#### **3.1.2 Event Management**

* Managers can create, read, update, and delete departmental events.
* Admins can manage all events globally.
* Events are categorized as global, departmental (global or private), and private.

#### **3.1.3 Event Viewing**

* All users can view global events without login.
* Registered students can view departmental and private events based on access.

#### **3.1.4 Student Event Participation**

* Students can register for events.
* Students can vote to express participation interest where applicable.

#### **3.1.5 File Upload**

* Managers and admins can upload event posters or related files while creating events.

#### **3.1.6 Admin Dashboard**

* View, edit, and delete all events.
* Create and manage manager accounts.
* View all user data with role distinctions.

#### **3.1.7 Notifications (Optional/Future Scope)**

* Optional feature for email or SMS notifications to registered users for upcoming events.

---

### **3.2 Non-Functional Requirements**

#### **3.2.1 Performance**

* Should support up to 10,000 users with expected concurrent traffic under 50.

#### **3.2.2 Security**

* Passwords must be stored hashed in the database.
* Role-based API authorization.
* JWT for secure session management.

#### **3.2.3 Usability**

* Clean, intuitive UI using IUBAT branding (green, white, black theme).
* Responsive design for desktop and mobile devices.

#### **3.2.4 Scalability**

* Backend and database structured to accommodate future user growth and feature additions.

#### **3.2.5 Maintainability**

* Code should follow clean architecture and modular design principles for easy maintenance by university IT or future teams.

---

## **4. Future Scope**

* Mobile application for Android and iOS.
* Integration of dark mode and accessibility features.
* Role expansion to include faculty or staff accounts.
* Advanced analytics and reporting dashboards for event participation statistics.

---

## **5. Approval and Sign-Off**

Prepared by: \[Your Name, ID]
Reviewed by: \[Supervisor’s Name and Designation]
Date: \[Insert Date]