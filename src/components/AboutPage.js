import React from 'react';
import babyImage from '../assets/baby-girl.svg';
import headerImage from '../assets/baby_texture.png';

function preloadImage(url) {
  const img = new Image();
  img.src = url;
}

preloadImage(babyImage);
preloadImage(headerImage);

const AboutPage = () => {
  return (
    <div className="App text-center">
      <header className="App-header">
        <div className="container pt-4">
          <img src={babyImage} className="App-logo" alt="Baby" />
          <h1 className="fw-bold">Growth Leaps</h1>
          <p className="fw-light mt-1"><span className="highlight">Why I built this app.</span>{' '}
            <span
              className="material-icons"
              aria-label="Under construction"
            >
              construction
            </span>{' '}
            
          </p>
        </div>
        <svg height="1" width="100%" className="header-line">
          <line x1="0" y1="0" x2="100%" y2="1" stroke="yellow" strokeWidth="4" />
        </svg>
      </header>
      <main>
          
          <p>
            During a child’s first year, unexpected short-term mood changes, without other medical signs, may be linked to transitions between growth cycle stages. These periods, often referred to as Growth Leaps, vary from child to child and are rather based on observation than in scientific evidence. Understanding transitions can help parents navigate their child's infancy with greater patience.
          </p>
          <h2>How it works</h2>
          <p>
            The app helped my partner quickly calculate the current week of our kids' growth cycles,
            saving the need to count manually in the calendar. The app is free,{' '}
            <a
              href="https://github.com/ntemposd/babyweeks"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              open-source
            </a>{' '}
            and runs on your browser.
          </p>
        
          <h2>Upcoming improvements</h2>
          <ul className="list-group mt-1">
            <li className="list-group-item">Translate into more languages</li>
            <li className="list-group-item">Add year 1+ transitions content</li>
          </ul>
          <p className="mt-4">
            Have an idea? Send me an{' '}
            <a
              href="mailto:hello@babyweeks.app"
              className="link"
            >
              email
            </a>
            .
          </p>
      </main>

      <footer>
        <p>© 2025 · Crafted with ❤️ by ntemposd</p>
      </footer>
    </div>
  );
};

export default AboutPage;
