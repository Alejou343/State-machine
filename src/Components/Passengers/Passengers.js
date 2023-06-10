import React, { useState } from 'react';
import './Passengers.css';

export const Passengers = ({ state, send }) => {
  const [value, setValue] = useState('');
  const [alert, setAlert] = useState(false);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  const goToTicket = () => {
    if (passengers.length !== 0) {
      send('DONE') 
    } else {
      setAlert(true)
    }
  }

  const submit = (e) => {
      e.preventDefault();
      send('ADD', { newPassenger: value })
      setValue('');
  }

  const { passengers } = state.context;



  return (
    <form onSubmit={submit} className='Passengers'>
      <p className='Passengers-title title'>Add passengers ✈️</p>
      {passengers.length > 0 ? passengers.map((x, id) => <p className="text" key={`person-${id}`}>{x}</p>) : []}
      <input 
        id="name" 
        name="name" 
        type="text" 
        placeholder='Escribe el nombre completo' 
        required 
        value={value} 
        onChange={onChangeInput}
      />
      <div className='Passengers-buttons'>
        <button 
          className='Passengers-add button-secondary'
          type="submit"
        >
          Add new passenger
        </button>
        <button
          className='Passenger-pay button'
          type="button"
          onClick={goToTicket}
          >
          View my ticket
        </button>
      </div>
        {alert && <p className='alerta'> The passengers list cannot be empty </p>}
    </form>
  );
};