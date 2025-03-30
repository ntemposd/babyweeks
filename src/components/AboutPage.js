import React from 'react';
import { useNavigate } from 'react-router-dom';

const babyImage = "/babyweeks/assets/baby-girl.svg";
const headerImage = "/babyweeks/assets/baby_texture.png";

function preloadImage(url) {
  const img = new Image();
  img.src = url;
}

preloadImage(babyImage);
preloadImage(headerImage);

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="App text-center">
      <header className="App-header">
        <div className="container pt-4 position-relative">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="back-button"
            aria-label="Back to Homepage"
          >
            <span className="material-icons">arrow_back</span> Home
          </button>

          <img src={babyImage} className="App-logo" alt="Baby" />
          <h1 className="fw-bold">Growth Leaps</h1>
          <p className="fw-light mt-1">
            <span className="lead">About this app</span>{' '}
            {/* <span className="material-icons" aria-label="Under construction">
              construction
            </span> */}
          </p>
        </div>
        {/*
        <svg height="1" width="100%" className="header-line">
          <line x1="0" y1="0" x2="100%" y2="1" stroke="yellow" strokeWidth="4" />
        </svg>
        */}
      </header>
      <main>
        <div className="row">
          <section className="about col-12 col-sm-2 col-md-8 col-lg-6 col-xl-4 col-xxl-4">
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
              developmental progress content for a baby's first year.
              The app is free,{' '}
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
            <h2>Why I built it</h2>
            <p>
              I created this app as a personal project to help my partner and I better understand our baby's growth cycles and navigate the challenges of early parenthood.
              Using the app, we’ve been able to quickly determine the current week of our
              kids' growth cycles, which has been especially helpful for my
              partner, saving the hassle of manually counting on a calendar. 
            </p>

            <h3>Upcoming improvements</h3>
            <p>
              Translate into more languages <br />
              Extend leaps content <br />
              Improve date selection <br />
            </p>
          </section>
        </div>
      </main>

      <footer>
        <p>Crafted with ❤️ by ntemposd</p>
      </footer>
    </div>
  );
};

export default AboutPage;
