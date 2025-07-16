# 🚀 **Project Management Plan**

### **Methodology:** WEBE Framework

**(Workflow-Entity-Behavior-Experience)** combined with **Agile SCRUM Sprints**
**Team:** 3 members (Beginner to Intermediate level)
**Timeline Target:** \~1–1.2 months

---

## 🎯 **WEBE Analysis Summary**

1. **Workflow:**

   * User views events (global / departmental / private).
   * Registers/logs in → dashboard → view/register for events.
   * Managers CRUD departmental/private events.
   * Admin manages managers and global events.

2. **Entities:**

   * User, Manager, Admin
   * Event (global/departmental/private)
   * Registration / Participation
   * Authentication token/session

3. **Behavior:**

   * User: view, register, vote
   * Manager: CRUD events, approve users
   * Admin: CRUD events, manage managers

4. **Experience:**

   * Clean homepage with global events
   * Login/registration flows
   * Manager dashboard for event management
   * Admin dashboard for user/manager management

---

## 🗂️ **Sprint Planning**

### 🔖 **Sprint 0: Project Setup & Environment**

**Duration:** 2 days

| Task                    | Description                                         | Est. Time |
| ----------------------- | --------------------------------------------------- | --------- |
| Repository Setup        | Create GitHub repos, clone, push initial README     | 1 hr      |
| Local Environment Setup | Install Node.js, Vite, Django/Express backend setup | 3 hrs     |
| Folder Structure        | Create /docs /client /server directories            | 1 hr      |
| Tailwind CSS Init       | Configure Tailwind in React project                 | 2 hrs     |
| Database Setup          | Install PostgreSQL or SQLite for development        | 2 hrs     |

---

### 🔖 **Sprint 1: UI/UX Base & Public Homepage**

**Duration:** 3 days

| Task                 | Description                                              | Est. Time |
| -------------------- | -------------------------------------------------------- | --------- |
| Figma Wireframes     | Design homepage, login, registration, dashboard sketches | 3 hrs     |
| Homepage UI          | Implement global events listing page                     | 6 hrs     |
| Navbar & Footer      | Build responsive navbar/footer components                | 3 hrs     |
| Sample Data          | Mock API routes for global events                        | 2 hrs     |
| Branding Integration | Apply IUBAT color theme with Tailwind                    | 2 hrs     |

✅ **Deliverable:** Public homepage with event listing and brand styling

---

### 🔖 **Sprint 2: User Authentication System**

**Duration:** 4 days

| Task                     | Description                                         | Est. Time |
| ------------------------ | --------------------------------------------------- | --------- |
| Registration Page UI     | Build registration form (email, Google Auth button) | 3 hrs     |
| Backend Registration API | User registration route with hashed password        | 5 hrs     |
| Google OAuth             | Integrate Google Auth for students                  | 5 hrs     |
| Login Page UI            | Build login form                                    | 3 hrs     |
| Backend Login API        | Issue JWT tokens                                    | 4 hrs     |
| Protected Routes Setup   | Implement route guards for user dashboards          | 2 hrs     |

✅ **Deliverable:** Full user auth flow with JWT

---

### 🔖 **Sprint 3: Event Entity & Public View**

**Duration:** 3 days

| Task                 | Description                                  | Est. Time |
| -------------------- | -------------------------------------------- | --------- |
| Event Model          | Backend DB schema for events                 | 3 hrs     |
| Event API Route      | GET global events                            | 2 hrs     |
| Event Card Component | Frontend display card for events             | 3 hrs     |
| Connect API          | Fetch and display real DB events on homepage | 2 hrs     |

✅ **Deliverable:** Homepage connected to backend with real event data

---

### 🔖 **Sprint 4: User Dashboard & Event Registration**

**Duration:** 4 days

| Task                     | Description                              | Est. Time |
| ------------------------ | ---------------------------------------- | --------- |
| Dashboard UI             | Student dashboard with personal info     | 4 hrs     |
| View Departmental Events | Filter events by department on dashboard | 3 hrs     |
| Register for Events      | Register button + backend POST route     | 4 hrs     |
| Confirmations            | Success messages, UI feedback            | 2 hrs     |

✅ **Deliverable:** Users can register for events and see their dashboard

---

### 🔖 **Sprint 5: Manager Dashboard (Event CRUD)**

**Duration:** 5 days

| Task                    | Description                           | Est. Time |
| ----------------------- | ------------------------------------- | --------- |
| Manager Auth Middleware | Role-based route protection           | 3 hrs     |
| Manager Dashboard UI    | Event table + add/edit/delete buttons | 5 hrs     |
| Create Event            | UI form + backend POST route          | 4 hrs     |
| Edit Event              | Pre-filled form + backend PUT/PATCH   | 4 hrs     |
| Delete Event            | Delete button + backend route         | 3 hrs     |

✅ **Deliverable:** Managers manage their departmental/private events

---

### 🔖 **Sprint 6: Admin Dashboard**

**Duration:** 4 days

| Task              | Description                                      | Est. Time |
| ----------------- | ------------------------------------------------ | --------- |
| Admin Middleware  | Protect admin-only routes                        | 2 hrs     |
| Manage Managers   | View, add, edit, delete managers UI + backend    | 5 hrs     |
| Manage All Events | View and manage all events (global/departmental) | 4 hrs     |
| View Users        | List users with roles                            | 3 hrs     |

✅ **Deliverable:** Admin has full control over managers and events

---

### 🔖 **Sprint 7: Final Integration & Testing**

**Duration:** 3 days

| Task                | Description                | Est. Time |
| ------------------- | -------------------------- | --------- |
| Full System Testing | Test each flow end-to-end  | 6 hrs     |
| Bug Fixes           | Resolve integration issues | 6 hrs     |
| Deployment Setup    | Deploy frontend + backend  | 4 hrs     |

✅ **Deliverable:** Project ready for presentation with live deployment

---

### 🔖 **Sprint 8: Optional / Future Scope**

**Duration:** As needed / after submission

| Task                | Description                      |
| ------------------- | -------------------------------- |
| Email Notifications | Event registration confirmations |
| SMS Notifications   | Twilio integration               |
| Mobile App          | React Native base setup          |
| Dark Mode           | Tailwind theme extension         |

---

## 💡 **Notes**

✅ **Time estimations** are approximate, adjust per your team’s pace
✅ Always reserve **buffer days** for integration bugs
✅ **Start Figma design alongside Sprint 0 or 1** to avoid UI delays
✅ Conduct **daily standups** to align progress

---

### ✨ **Outcome**

By following this **WEBE + Agile incremental strategy**, you will:

* Deliver major working features each sprint
* Focus first on **core user flows** before advanced features
* Complete within your **targeted 1–1.2 month timeline** with clarity and team coordination.