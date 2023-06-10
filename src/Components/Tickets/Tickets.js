import React from 'react';
import './Tickets.css';

export const Tickets = ({ state, send, context }) => {

  const finish = () => {
    send('FINISH', {newPassenger: [], selectedCountry: ''})
  }

  return (
    <div className='Tickets'>
      <p className='Tickets-description description'>Gracias por volar con book a fly 💚</p>
      <div className='Tickets-ticket'>
        <div className='Tickets-country'>
          <div className="origin">
            <img src={`https://flagcdn.com/48x36/${state.context.selectedCountry}.png`} alt={`${state.context.selectedCountry}.jpg`}></img>
            <span>{state.context.selectedInitialDate}</span>
          </div>
            <span className="symbol">✈</span>
          <div className="destination">
            <img src={`https://flagcdn.com/48x36/${state.context.selectedCountryDestination}.png`} alt={`${state.context.selectedCountryDestination}.jpg`}></img>
            <span>{state.context.selectedFinalDate}</span>
          </div>
        </div>
        <div className='Tickets-passengers'>
          {state.context.passengers.map((x, id) => <p className="text" key={`passenger-${id}`}>{x}</p>)}
          
        </div>
      </div>
      <button onClick={finish} className='Tickets-finalizar button'>Finish</button>
    </div>
  );
}; 