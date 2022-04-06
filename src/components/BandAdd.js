import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { SocketContext } from '../context/SocketContext';
//import PropTypes from 'prop-types'

const BandAdd = () => {
  const [ value, setValue] = useState('');
  const { socket } = useContext( SocketContext );

  const onSubmit = (ev) =>{

    ev.preventDefault();
    if(value.trim().length > 0 ){
      socket.emit('create-a-band', value)
      setValue('');
    }

  }

  return (
    <>
      <h3> Agregar banda</h3>
      <form onSubmit={onSubmit}>
        <input
          className='form-control'
          placeholder='Nuevo nombre de banda'
          value = {value}
          onChange = {(ev) => setValue(ev.target.value)}
        />
      </form>
    </>
  )
}

//BandAdd.propTypes = {}

export default BandAdd