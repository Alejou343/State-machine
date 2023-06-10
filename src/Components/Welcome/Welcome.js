import React from 'react';
import './Welcome.css';

export const Welcome = ({ send }) => {

  const startBooking = () => {
    send('START')
  }

  return (
    <div className='Welcome'>
      <p className='Welcome-title title'>¡Today is the day!</p>
      <p className='Welcome-description description'>Buy a flight ticket and know somewhere in the world, are you ready for an amazing experience?</p>
      <button onClick={startBooking} className='Welcome-cancel button'>Let's start</button>
    </div>
  );
}; 