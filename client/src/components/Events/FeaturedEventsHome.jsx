import React, { useEffect, useState } from "react";
import { listEvents } from "../../api/events";
import { Link } from "react-router-dom";
import "../../pages/Profile/Profile.css";

export default function FeaturedEventsHome() {
  const [events, setEvents] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    listEvents({ featured: "1", status: "published", ordering: "-created_at" })
      .then((d) => setEvents(d.slice(0, 6))) // show newest up to 6, 3 per row
      .catch((e) => setErr(String(e)));
  }, []);

  return (
    <section style={{ marginTop: 24 }}>
      <div className="container">
        <div className="filters-header" style={{ marginBottom: 10 }}>
          <h3 style={{ margin: 0 }}>Featured events</h3>
          <Link to="/events" className="btn-ghost">See all</Link>
        </div>

        {err && <p className="err">{String(err).slice(0, 200)}…</p>}

        <ul className="events-grid events-3">
          {events.map((ev) => (
            <li key={ev.id} className="event-card">
              {ev.cover_url && <img src={ev.cover_url} alt="" className="event-img" />}
              <div className="event-body">
                <div className="event-topline">
                  <span className={`badge cat-${ev.category}`}>{ev.category.replace("_", " ")}</span>
                  {ev.featured && <span className="badge featured">Featured</span>}
                </div>
                <h4 className="event-title">{ev.title}</h4>
                <p className="event-sub">{new Date(ev.start_time).toLocaleString()}</p>
                <div className="event-actions">
                  <Link className="primary" to={`/events/${ev.id}`}>View</Link>
                </div>
              </div>
            </li>
          ))}
          {!err && events.length === 0 && <p>No featured events yet.</p>}
        </ul>
      </div>
    </section>
  );
}
