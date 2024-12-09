import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import './HeroSection.css';

function HeroSection() {
  const context = useContext(myContext);
  const { mode } = context;
  
  return (
    <section
      className="hero-section"
      style={{ background: mode === 'dark' ? 'rgb(30, 41, 59)' : '#30336b' }}
    >
  
      <div className="container">
  
        <main>
          <div className="text-center">
            <div className="image-container">
   
              <img
                className="hero-image"
                src="https://cdn-icons-png.flaticon.com/128/3685/3685253.png"
                alt="Blog Icon"
              />
            </div>

            
            <h1 className="hero-heading">My Blogs</h1>
          </div>


        </main>
      </div>
    </section>
  );
}

export default HeroSection;

