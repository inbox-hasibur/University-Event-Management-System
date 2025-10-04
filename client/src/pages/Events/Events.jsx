import React from "react";
import "../Profile/Profile.css";
import EventsList from "../../components/Events/EventsList.jsx";

export default function EventsPage() {
  return (
    <main className="page-pad">
      <div className="container">
        <h1>Events</h1>
        {/* published only by default, with filters & 3-column grid */}
        <EventsList mineDefault={false} statusDefault="published" />
      </div>
    </main>
  );
}
