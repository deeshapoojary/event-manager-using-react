import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import Typed from 'typed.js';

function HeroSection() {
  const el = React.useRef(null);
    React.useEffect(() => {
        const typed = new Typed(el.current, {
          strings: ['The Event Awaits','Create Your Event'],
          typeSpeed: 60,
          loop: true,
          showCursor: false,
          backSpeed: 60,
        });
        return () => {
          typed.destroy();
        };
        }, []);
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1 ref={el} />
      <p>Let People Know!</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          anchor='./Login'
        >
          Login
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          anchor='./Adlogin'
        >
          Admin <i className='far fa-id-card' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
