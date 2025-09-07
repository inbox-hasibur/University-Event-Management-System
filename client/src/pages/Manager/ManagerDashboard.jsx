import React from "react";
import "../Profile/profile.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import EventsList from "../../components/Events/EventsList.jsx";

export default function ManagerDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  if (!loading && (!user || user.role !== "manager")) navigate("/login");

  return (
    <main className="page-pad">
      <div className="container">
        <h1>Manager Dashboard</h1>

        <section className="card">
          <h3>Upload Event</h3>
          <p>(Coming soon — we’ll enable create/edit when the Events module is ready.)</p>
        </section>
        <section>
            <EventsList mineDefault={true} />
        </section>

        <section className="card">
          <h3>My Events</h3>
          <div style={{display:"flex", gap:8, marginBottom:8}}>
            <button className="primary" disabled>All</button>
            <button className="primary" disabled>Uploaded by me</button>
          </div>
          <p>(Events table will appear here.)</p>
        </section>

        <section className="card">
          <h3>Participants</h3>
          <p>(Per-event participants list will be available after Events module.)</p>
        </section>
      </div>
    </main>
  );
}
