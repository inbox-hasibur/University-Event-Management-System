import React from 'react';
import './Landing.css';
import calendarImg from '../../assets/3D Calender Bell.png';

const Landing = () => {
  return (
    <section className="landing">
      <div className="landing__content">
        <h1>University Events Management System</h1>
        <p>
          Explore global and departmental events: hackathons, job fairs, business collabs, coding contests, and more.
        </p>
      </div>
      <div className="landing__image">
        <img src={calendarImg} alt="3D Calendar Bell" />
      </div>
    </section>
  );
}

export default Landing;
