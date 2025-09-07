import React, { useEffect, useMemo, useState } from "react";
import { listEvents } from "../../api/events";

export default function EventsList({ mineDefault = false }) {
  const initial = useMemo(() => ({
    mine: mineDefault ? "1" : "0",
    status: "",
    category: "",
    featured: "0",
    ordering: "start_time",
  }), [mineDefault]);

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

      <ul className="events-grid">
        {events.map((ev) => (
          <li key={ev.id} className="event-card">
            <h4 className="event-title">{ev.title}</h4>
            <p className="event-sub">
              {ev.category.replace("_", " ")} •{" "}
              {new Date(ev.start_time).toLocaleString()}
            </p>
            <p className="event-reg">
              <b>{ev.registration_open ? "Registration is going on" : "Registration closed"}</b>
            </p>
            {ev.cover_url && (
              <img src={ev.cover_url} alt="" className="event-img" />
            )}
          </li>
        ))}
        {!loading && !events.length && <p>No events match the filters.</p>}
      </ul>
    </div>
  );
}
