import React, { useEffect, useMemo, useState } from "react";
import { listEvents } from "../../api/events";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";


export default function EventsList({ mineDefault = false, statusDefault = "" }) {
  const initial = useMemo(() => ({
    mine: mineDefault ? "1" : "0",
    status: statusDefault,          // <-- new (defaults to "")
     category: "",
     featured: "0",
     ordering: "start_time",
  }), [mineDefault, statusDefault]);

  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [filters, setFilters] = useState(initial);

  useEffect(() => {
    setLoading(true);
    const params = {
      ...(filters.mine === "1" ? { mine: "1" } : {}),
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.category ? { category: filters.category } : {}),
      ...(filters.featured === "1" ? { featured: "1" } : {}),
      ...(filters.ordering ? { ordering: filters.ordering } : {}),
    };
    listEvents(params)
      .then(setEvents)
      .catch((e) => setErr(String(e)))
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters)]);

  const reset = () => setFilters(initial);

  return (
    <div className="card">
      <div className="filters-header">
        <h3>Events</h3>
        <div className="filters-count">
          {loading ? "Loading…" : `${events.length} result${events.length === 1 ? "" : "s"}`}
        </div>
      </div>

      <div className="filter-bar">
        {/* Scope segmented control */}
        <div className="segmented">
          <button
            type="button"
            className={`seg ${filters.mine === "0" ? "active" : ""}`}
            onClick={() => setFilters((f) => ({ ...f, mine: "0" }))}
          >
            All
          </button>
          <button
            type="button"
            className={`seg ${filters.mine === "1" ? "active" : ""}`}
            onClick={() => setFilters((f) => ({ ...f, mine: "1" }))}
          >
            Uploaded by me
          </button>
        </div>

        <select
          className="sel"
          value={filters.status}
          onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
          aria-label="Status"
        >
          <option value="">Status: Any</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <select
          className="sel"
          value={filters.category}
          onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
          aria-label="Category"
        >
          <option value="">Category: Any</option>
          <option value="departmental">Departmental</option>
          <option value="non_departmental">Non-Departmental</option>
          <option value="outside">Outside university</option>
        </select>

        <label className="toggle">
          <input
            type="checkbox"
            checked={filters.featured === "1"}
            onChange={(e) =>
              setFilters((f) => ({ ...f, featured: e.target.checked ? "1" : "0" }))
            }
          />
          <span>Featured only</span>
        </label>

        <select
          className="sel"
          value={filters.ordering}
          onChange={(e) => setFilters((f) => ({ ...f, ordering: e.target.value }))}
          aria-label="Sort"
        >
          <option value="start_time">Sort: Start time (asc)</option>
          <option value="-created_at">Sort: Created (desc)</option>
        </select>

        <button type="button" className="btn-ghost" onClick={reset}>
          Reset
        </button>
      </div>

      {err && <p className="err">{String(err).slice(0, 200)}…</p>}

      {/* 3 cards per row on desktop */}
      <ul className="events-grid events-3">
        {events.map((ev) => {
          const canEdit =
            user?.role === "admin" ||
            (user?.role === "manager" && user?.username === ev.created_by_username);

          const editHref =
            user?.role === "admin"
              ? `/dashboard/admin/events/${ev.id}/edit`
              : `/dashboard/manager/events/${ev.id}/edit`;

          return (
            <li key={ev.id} className="event-card">
              {ev.cover_url && <img src={ev.cover_url} alt="" className="event-img" />}

              <div className="event-body">
                <div className="event-topline">
                  <span className={`badge cat-${ev.category}`}>
                    {ev.category.replace("_", " ")}
                  </span>
                  {ev.featured && <span className="badge featured">Featured</span>}
                </div>

                <h4 className="event-title">{ev.title}</h4>
                <p className="event-sub">
                  {new Date(ev.start_time).toLocaleString()}
                </p>
                <p className="event-reg">
                  <b>{ev.registration_open ? "Registration is going on" : "Registration closed"}</b>
                </p>

                <div className="event-actions">
                  <Link className="btn-ghost" to={`/events/${ev.id}`}>View</Link>
                  {canEdit && <Link className="primary" to={editHref}>Edit</Link>}
                </div>
              </div>
            </li>
          );
        })}
        {!loading && !events.length && <p>No events match the filters.</p>}
      </ul>
    </div>
  );
}
