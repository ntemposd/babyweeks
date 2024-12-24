// src/pages/About.js
import React from 'react';
import '../App.css';
import babyImage from '../assets/baby-girl.svg';

const AboutPage = () => {
    return (
      <div className="App text-center">
        <header className="App-header">
          <div className="container pt-4">
            <img
              src={babyImage}
              className="App-logo"
              alt="Illustration of a baby girl"
              width="160"
              height="160"
              style={{ width: '20vmin', height: 'auto' }}
            />
            <h1 className="fw-bold">About Growth Leaps</h1>
            <p className="fw-light mt-1">
              <mark>Why</mark> <span className="material-icons">construction</span> built this app.
            </p>
          </div>
          <svg height="1" width="100%" className="header-line">
            <line x1="0" y1="0" x2="100%" y2="1" stroke="yellow" strokeWidth="4" />
          </svg>
        </header>

      		<div className="fw-light px-5">
      			<p>For the past couple of years, we’ve been experiencing parenthood. During our kids' first year, their pediatrician linked unexpected mood changes to transitions between growth cycle stages. While these weeks vary by child and are more empirical than scientific, the app helps my partner quickly calculate the current week of our kids' growth cycles, saving the need to count manually in her calendar.</p>
      			<h2>Who can use the app</h2>
      			<p>Anyone! The app is free, <a href="https://github.com/ntemposd/babyweeks"><u>open-source</u></a> and runs on your browser. Meaning it doesn't store any personal or sensitive data such as emails and your baby's birthdate so that you are targeted with ads later on. The app uses essential cookies to track information like location, browser and button clicks exploited by the creator to optimize the app's behavior and functionality. Don't want to share any information? <a href="https://support.google.com/analytics/answer/181881?hl=en"><u>Here</u></a> is how to opt-out.</p>
      			<h2>Upcoming improvements</h2>

      			<p>Babyweeks is currently in Beta version, might be slow and/or break. If any of those happen, keep calm and support me by clicking the green button on the lower right corner. I’m still working on it.</p>
      			<ul className="list-group-numbered">
      				<li>Translate into more languages</li>
      				<li>Add year 1+ transitions content</li>
      				<li>Optimize for small screens</li>
      			</ul>

      			<p>Have an idea? Send me an <a href="mailto:hello@babyweeks.app"><span className="material-icons">mail_outline</span></a></p>
      		</div>


      </div>
    );
};

export default AboutPage;
