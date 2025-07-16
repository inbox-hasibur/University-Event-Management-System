# **Product Backlog**

## **1. Epic: User Authentication & Authorization**

### **1.1 User Registration**

* **Story:** As a student, I want to register using my university ID or Google account so that I can log in and access departmental/private events.
* **Tasks:**

  * Design registration form UI.
  * Integrate Google Auth API.
  * Backend endpoint for registration.
  * Validate inputs (ID format, email uniqueness).
  * Test user registration flow.

### **1.2 User Login**

* **Story:** As a student, I want to log in securely using my credentials so that I can access event features.
* **Tasks:**

  * Design login form UI.
  * Backend JWT authentication route.
  * Store JWT securely (localStorage).
  * Redirect on successful login.
  * Error handling for invalid login.

### **1.3 Manager/Admin Account Creation**

* **Story:** As an admin, I want to create manager accounts so that managers can manage departmental events.
* **Tasks:**

  * Admin dashboard UI for manager creation.
  * Backend route to create manager users.
  * Role-based authorization implementation.

---

## **2. Epic: Event Management**

### **2.1 Create Event**

* **Story:** As a manager/admin, I want to create events with details, posters, and seat limitations so that students can view or register.
* **Tasks:**

  * Event creation form UI.
  * Backend route for event creation.
  * File upload integration for event posters.
  * Validation (dates, seat limits, required fields).

### **2.2 Edit Event**

* **Story:** As a manager/admin, I want to edit event details to update information when required.
* **Tasks:**

  * UI for editing events (pre-filled form).
  * Backend PUT/PATCH endpoint.
  * Update file if poster is changed.

### **2.3 Delete Event**

* **Story:** As a manager/admin, I want to delete an event so that outdated or canceled events are removed.
* **Tasks:**

  * UI delete button with confirmation modal.
  * Backend delete endpoint.
  * Remove associated files if any.

### **2.4 View Events**

* **Story:** As a user, I want to view all global events without login so that I stay informed about university-wide events.
* **Tasks:**

  * Design homepage event listing for global events.
  * Backend route for fetching global events.
  * Public route configuration in frontend.

### **2.5 View Departmental and Private Events**

* **Story:** As a student, I want to view departmental or private events relevant to me after login.
* **Tasks:**

  * UI for departmental/private events listing.
  * Backend endpoint with user-based data filtering.
  * Access control checks.

---

## **3. Epic: Event Registration & Participation**

### **3.1 Event Registration**

* **Story:** As a student, I want to register for events so that I can participate in them.
* **Tasks:**

  * UI register button with seat availability display.
  * Backend route for registration logic.
  * Update event seat count.
  * Confirmation message after successful registration.

### **3.2 Participation Voting**

* **Story:** As a student, I want to vote for participation in events (where applicable) so that organizers know student interest.
* **Tasks:**

  * UI for voting option within event details.
  * Backend route to record votes.
  * Restrict multiple votes per user per event.

---

## **4. Epic: Admin Dashboard & Management**

### **4.1 Manage Managers**

* **Story:** As an admin, I want to view, add, edit, and delete managers to control departmental event management efficiently.
* **Tasks:**

  * Dashboard UI for manager list.
  * Backend routes for CRUD operations on managers.
  * Confirmation modals for delete actions.

### **4.2 Manage All Events**

* **Story:** As an admin, I want to view and manage all events so that I can oversee university-wide event operations.
* **Tasks:**

  * Events table UI with filtering options.
  * Backend route to fetch all events.
  * Edit/delete integration for admin role.

### **4.3 View All Users**

* **Story:** As an admin, I want to see all users with their roles to manage system security and usage.
* **Tasks:**

  * User management UI.
  * Backend route for user listing with roles.
  * Option to deactivate/reactivate users.

---

## **5. Epic: Notifications (Optional/Future Scope)**

### **5.1 Email Notifications**

* **Story:** As a student, I want to receive email notifications for event updates or reminders so that I do not miss important events.
* **Tasks:**

  * Integrate email service (e.g. SendGrid).
  * Backend function to trigger emails on event registration or updates.

### **5.2 SMS Notifications**

* **Story:** As a student, I want to receive SMS notifications for critical events so that I stay informed instantly.
* **Tasks:**

  * Integrate SMS API (e.g. Twilio).
  * Backend function to send SMS alerts.

---

## **6. Epic: System Security & Infrastructure**

### **6.1 JWT Authentication Implementation**

* **Story:** As a developer, I want to implement JWT so that user sessions remain secure.
* **Tasks:**

  * Backend JWT setup (issue, verify tokens).
  * Frontend token storage and usage in requests.
  * Refresh token setup (optional/future).

### **6.2 Password Hashing**

* **Story:** As a developer, I want to store hashed passwords in the database so that user credentials remain secure.
* **Tasks:**

  * Implement bcrypt hashing in backend user model.
  * Update registration route to store hashed passwords.
  * Update login route to validate hashed passwords.

### **6.3 Role-Based Authorization**

* **Story:** As a developer, I want to implement role-based route protection so that only authorized users can access certain features.
* **Tasks:**

  * Middleware development for checking user roles.
  * Protect manager and admin routes accordingly.

---

## **7. Epic: UI/UX Design & Branding**

### **7.1 Branding Implementation**

* **Story:** As a designer, I want to implement IUBAT color themes and branding guidelines so that the system reflects university identity.
* **Tasks:**

  * Tailwind CSS configuration with brand colors.
  * Consistent typography and component styling.

### **7.2 Responsive Design**

* **Story:** As a student, I want to use the system on both mobile and desktop devices seamlessly.
* **Tasks:**

  * Design mobile views for all pages.
  * Ensure responsiveness through Tailwind utilities.

---

## **8. Epic: Project Setup & Deployment**

### **8.1 Repository Setup**

* **Story:** As a team, we want to set up GitHub repos for client and server so that collaboration is efficient.
* **Tasks:**

  * Create GitHub repos (client, server).
  * Clone, branch, and push initial commits.
  * Set up README with project details.

### **8.2 Environment Setup**

* **Story:** As a developer, I want to set up local development environments so that I can work efficiently.
* **Tasks:**

  * Install Node.js, Vite, Django or Express dependencies.
  * Configure database connections.

### **8.3 Deployment**

* **Story:** As a team, we want to deploy the system for university access so that stakeholders can use it in real scenarios.
* **Tasks:**

  * Select frontend and backend deployment platforms.
  * Configure environment variables securely.
  * Final testing before production.

---

## **9. Epic: Documentation**

### **9.1 Project Documentation**

* **Story:** As a team, we want to prepare a full project documentation so that supervisors and future maintainers understand the system.
* **Tasks:**

  * Prepare SRS, backlog, and final report.
  * Write installation and setup guides.
  * Create system usage manual for managers and admins.