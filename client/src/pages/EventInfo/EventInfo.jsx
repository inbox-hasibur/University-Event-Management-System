import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../../api/events";
import "../Profile/profile.css";

export default function EventInfo() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    getEvent(id).then(setEvent).catch(e => setErr(String(e)));
  }, [id]);

  if (err) return <main className="page-pad"><div className="container"><p className="err">{err}</p></div></main>;
  if (!event) return <main className="page-pad"><div className="container"><p>Loading…</p></div></main>;

  const regText = event.registration_open ? "Registration is going on" : "Registration closed";

  return (
    <main className="page-pad">
      <div className="container">
        <div className="card">
          <h1 style={{marginTop:0}}>{event.title}</h1>
          <p><b>Category:</b> {event.category.replace("_", " ")}</p>
          <p><b>Venue:</b> {event.venue}</p>
          <p><b>Time:</b> {new Date(event.start_time).toLocaleString()} → {new Date(event.end_time).toLocaleString()}</p>
          {event.online_link && <p><b>Online:</b> <a href={event.online_link} target="_blank">Join link</a></p>}
          <p><b>Featured:</b> {event.featured ? "Yes" : "No"}</p>
          <p><b>Status:</b> {event.status}</p>
          <p><b>Registration:</b> {regText}</p>

          {event.cover_url && (
            <div style={{margin:"12px 0"}}>
              <img src={event.cover_url} alt="Cover" style={{maxWidth:"100%", borderRadius:12}}/>
            </div>
          )}

          <hr />
          <pre style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
            {event.description_html || ""}
          </pre>
        </div>
      </div>
    </main>
  );
}
