import React, { useState } from 'react';
import './Search.css';

export const Search = ({ state, send }) => {
  const [flight, setFlight] = useState('');
  const [destination, setDestination] = useState('');
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');

  const handleSelectChange = (event) => {
    setFlight(event.target.value);
  };

  const handleSelectChangeDestination = (event) => {
    setDestination(event.target.value);
  };
  
  const handleDate = (event) => {
    setInitialDate(event.target.value)
  }
  
  const handleDateDestination = (event) => {
    setFinalDate(event.target.value)
  }

  const goToPassengers = () => {
    send('CONTINUE', {selectedCountry: flight, 
      selectedCountryDestination: destination, 
      selectedInitialDate: initialDate,
      selectedFinalDate: finalDate,
    })
  }

  const today = () => {
    const fechaActual = new Date()
    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1;
    var anio = fechaActual.getFullYear();
    return `${anio}-${String(mes).length === 1 ? '0'.concat(mes): mes}-${dia}`
  }
  
  const options = state.context.countries;

  return (
    <div className='Search'>
        <p className='Search-title title'>From:</p>
        <select id="country" className='Search-select' value={flight} onChange={handleSelectChange}>
          <option value="" disabled defaultValue>Select a origin</option>
          {options.map((option, id) => <option value={option.cca2.toLowerCase()} key={`country-${id}`}>{option.name.common}</option>)}
        </select>
        <p className='Search-title title'>To:</p>
        <select id="country" className='Search-select' value={destination} onChange={handleSelectChangeDestination}>
          <option value="" disabled defaultValue>Select a destination</option>
          {options.map((option, id) => <option value={option.cca2.toLowerCase()} key={`country-${id}`}>{option.name.common}</option>)}
        </select>
      <div className="schedeule">
        <div className="travel-dates">
          <p>Initial Date</p>
          <input type='date' id="date-input-origin" min={today()} value={initialDate} onChange={handleDate}></input>
        </div>
        <div className="travel-dates">
          <p>Final Date</p>
          <input type='date' id="date-input-destination" min={initialDate} value={finalDate} onChange={handleDateDestination}></input>
        </div>
      </div>
      <button 
        onClick={goToPassengers} 
        className='Search-continue button'
        disabled={flight === '' || destination === '' || initialDate === '' || finalDate === ''}
      >
        Continue
      </button>
    </div>
  );
}; 