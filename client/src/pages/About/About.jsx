import React from "react";
import "./About.css";
import aboutImg from "../../assets/iubat_about.jpg"; // put your image here (jpg/png/webp)

export default function About() {
  return (
    <main className="about-page">
      {/* HERO */}
      <section className="about-container">
        <div className="about-hero">
          <div className="about-copy">
            <h1 className="about-title">About Us</h1>
            <p className="about-lead">
              We’re building a central place for students and organizers to
              discover, publish, and manage university events — hackathons, job
              fairs, club activities, and more.
            </p>

            <div className="about-card">
              <h3>What we do</h3>
              <ul>
                <li>Curate departmental & global events</li>
                <li>Provide organizer tools for creating & publishing events</li>
                <li>Offer registration, reminders, and feedback collection</li>
                <li>Promote featured and outside-university opportunities</li>
              </ul>
            </div>
          </div>

          <div className="about-visual">
            <div
              className="about-illustration"
              role="img"
              aria-label="Students collaborating at a campus event"
              style={{ backgroundImage: `url(${aboutImg})` }}
            />
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="about-container">
        <div className="about-card about-card--wide">
          <h3>Our mission</h3>
          <p>Make campus events easy to find, simple to manage, and fun to attend.</p>
        </div>
      </section>
    </main>
  );
}
