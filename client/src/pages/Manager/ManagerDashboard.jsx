import React from "react";
import "../Profile/profile.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import EventsList from "../../components/Events/EventsList.jsx";

export default function ManagerDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  if (!loading && (!user || user.role !== "manager")) navigate("/login");

  return (
    <main className="page-pad">
      <div className="container">
        {/* Title + Upload button */}
        <div className="card" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <h1 style={{margin:0}}>Manager Dashboard</h1>
          <Link className="primary" to="/dashboard/manager/events/new">+ Upload Event</Link>
        </div>

        {/* Your events list with filters */}
        <section>
          <EventsList mineDefault={true} />
        </section>
      </div>
    </main>
  );
}
