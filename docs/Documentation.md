
# **University Event Management System**

## **1. Abstract**

This document describes the design and development of a University Event Management System, aiming to centralize and simplify the publication, management, and participation processes for university events. The system is tailored to IUBAT’s specific needs but is extendable to similar institutional contexts. It addresses the current problem of fragmented event announcements and lack of structured communication by providing a single platform accessible to students, managers, and administrators.

---


## **2. Introduction**

### **2.1 Background**

Universities regularly organize various academic and non-academic events. However, in IUBAT, announcements are scattered across physical posters, Facebook groups, and overloaded official websites. As a result, students often miss important information due to lack of a centralized announcement system.

### **2.2 Problem Statement**

There is no dedicated system to manage and publish events in an organized, accessible, and timely manner. Students remain unaware of many opportunities, and event management by departments is disorganized due to absence of a centralized digital platform.

### **2.3 Objectives**

The objectives of this project are:

* To design and develop a centralized digital platform for managing university events efficiently.
* To allow students to view, register, and vote for events where applicable.
* To enable managers to create and manage departmental or private events.
* To provide admins with full control over users and events in the system.

---


## **3. Scope**

This system focuses on IUBAT University to manage its global, departmental, and private events. The architecture is designed to remain scalable for future deployment in other educational institutions. The project duration is one to 1.2 months with a team of three members.

---


## **4. Users and Stakeholders**

The primary users and stakeholders are:

* **Students:** They can view global and departmental events, register for events requiring participation, and vote where applicable. Registration is self-initiated with university ID or Google authentication. Private event access is granted by managers.

* **Managers:** Department-assigned individuals responsible for creating, updating, and managing events within their departments. They also approve student access for private events. Their accounts are created by the admin.

* **Admins:** University authorities who oversee the entire system, create and manage manager accounts, and have CRUD access to all events and users.

---


## **5. System Requirements**


### **5.1 Functional Requirements**

* User registration and authentication for students.
* Manager and admin authentication with role-based access.
* Viewing events categorized as global, departmental, or private.
* Event creation, editing, and deletion by managers or admins.
* Student event registration and voting for participation.
* Upload functionality for event posters and related files.
* Admin management of managers and users via a dedicated dashboard.


### **5.2 Non-Functional Requirements**

* Responsive design compatible with desktop and mobile devices.
* Secure password storage using hashing algorithms.
* Authentication security using JWT tokens.
* Scalable architecture to support up to 10,000 users with expected daily traffic below 50 concurrent users.

---


## **6. Future Scope**

Potential future improvements include:

* Development of a mobile application for Android and iOS.
* Integration of email or SMS notifications for event updates.
* Implementation of dark mode and advanced accessibility features.
* Addition of faculty or staff accounts with specialized roles.
* Role-based API authorization for improved security in large-scale deployment.

---


## **7. System Design**


### **7.1 Overview**

The University Event Management System is designed using a layered architecture ensuring separation of concerns among the presentation, business, and data layers. The frontend is developed using React.js with Tailwind CSS for styling, while the backend is planned in Django REST Framework or Node.js depending on final team decision, supported by a PostgreSQL database.


### **7.2 Entity Descriptions**

* **User Entity:** Contains student identification details, authentication credentials, and role-based access information.
* **Event Entity:** Contains event details including category, description, registration requirements, seat limitations if applicable, and related files.
* **Manager Entity:** Maintains records of department managers assigned by the admin.
* **Admin Entity:** Represents university authority with full system access.


### **7.3 User Flow**

Students sign up using their university ID or Google Auth. Upon login, they can browse global or departmental events. Private events require manager approval for access. Managers manage events within their scope. Admins create manager accounts and oversee all events and users.

---


## **8. Implementation Overview**

The system is implemented with the following modules:

* **Authentication Module:** Handles user registration, login, hashed password storage, and JWT-based session management.
* **Event Management Module:** Enables CRUD operations for events with proper authorization checks.
* **User Management Module:** Available to admins for managing managers and overall userbase.
* **Voting Module:** Allows student voting for events requiring participant selection.
* **File Upload Module:** Supports poster or related file attachments for events.

---


## **9. Testing and Evaluation**


### **9.1 Testing Strategy**

Testing includes unit tests for individual modules and integration tests to verify end-to-end workflows such as student registration, event creation, and participation voting.


### **9.2 Evaluation Criteria**

Evaluation focuses on:

* Functional correctness of all features.
* Usability and interface clarity.
* Security compliance for user data and authentication.
* Performance under expected user load.

---


## **10. Deployment**

The system will be deployed using Vercel or Netlify for the frontend, and Render, Railway, or the university’s internal server for the backend and database hosting. The deployment plan ensures minimal downtime and simple rollback procedures in case of failure.

---


## **11. Security and Maintenance**

* JWT authentication ensures secure session management.
* Passwords are stored in hashed form for security.
* Maintenance responsibilities are shared between university IT and the development team for future feature integrations and critical bug fixes.

---


## **12. Conclusion**

The University Event Management System effectively addresses the lack of a centralized platform for event management in IUBAT by providing a unified, accessible, and organized solution. The platform’s extendable design ensures adaptability to future requirements including mobile applications and advanced features to enhance the student experience.

---


## **13. References**

* React.js Official Documentation
* Tailwind CSS Documentation
* Django REST Framework Documentation
* PostgreSQL Official Documentation
* IUBAT Website and Academic Event Announcements