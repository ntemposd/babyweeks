import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import babyImage from '../assets/baby-girl.svg';
import headerImage from '../assets/baby_texture.png';

function preloadImage(url) {
  const img = new Image();
  img.src = url;
}

preloadImage(babyImage);
preloadImage(headerImage);

const AboutPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="App text-center">
      <header className="App-header">
        <div className="container pt-4 position-relative">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')} // Navigate to homepage
            className="back-button"
            aria-label="Back to Homepage"
          >
            <span className="material-icons">arrow_back</span> Home
          </button>

          <img src={babyImage} className="App-logo" alt="Baby" />
          <h1 className="fw-bold">Growth Leaps</h1>
          <p className="fw-light mt-1">
            <span className="lead">Why I built this app.</span>{' '}
            <span
              className="material-icons"
              aria-label="Under construction"
            >
              construction
            </span>
          </p>
        </div>
        <svg height="1" width="100%" className="header-line">
          <line x1="0" y1="0" x2="100%" y2="1" stroke="yellow" strokeWidth="4" />
        </svg>
      </header>
      <main>
        <section className="about container container-fluid container-lg container-md container-sm container-xl container-xxl">
          <p>
            During a child's first year, brief periods of unexpected mood
            changes, occurring without other noticeable symptoms, may be linked
            to transitions between growth cycle stages. Often referred to as
            "Growth Leaps", these periods vary from child to child and are
            primarily based on observation rather than scientific evidence.
            Gaining insight into these transitions can help parents approach
            their child's infancy with greater patience.
          </p>
          <h2>How it works</h2>
          <p>
            Simply input a birthdate to calculate the weeks since birth and view
            developmental progress content for a baby's first year. Using the
            app, we’ve been able to quickly determine the current week of our
            kids' growth cycles, which has been especially helpful for my
            partner, saving the hassle of manually counting on a calendar. The
            app is free,{' '}
            <a
              href="https://github.com/ntemposd/babyweeks"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              open-source
            </a>
            , and runs directly in your browser.
          </p>

          <h2>Roadmap</h2>
          <p>Add languages <br />
             Add more content <br />
             Improve date selection <br />
          </p>
        </section>
      </main>

      <footer>
        <p>© 2025 · Crafted with ❤️ by ntemposd</p>
      </footer>
    </div>
  );
};

export default AboutPage;
