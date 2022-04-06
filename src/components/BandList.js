import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { SocketContext } from '../context/SocketContext';
//import PropTypes from 'prop-types'

const BandList = () => {

  const [bands, setBands] = useState([]);
  const { socket } = useContext( SocketContext )

  useEffect(() => {
    socket.on('current-bands', (bands) =>{
      setBands(bands)
    });
    return () => socket.off('current-bands');
  }, [socket]);

  const changeName = (event , id) =>{
    const newName = event.target.value;

    setBands ( bands.map( band =>{
      if(band.id === id) {
        band.name  = newName
      }

      return band
    }))
  }

  const onLostFocus = (id, name) =>{
    socket.emit('change-band-name', {id, name})
  }

  const vote = (id) =>{
      socket.emit('vote-band', id)
    }


  const remove = (id) =>{
      socket.emit('delete-band', id)
    }

  const createRows = () => {
    return (
      bands.map(band => (
          <tr key = {band.id}>
          <td>
            <button 
              className='btn btn-primary'
              onClick={() => vote(band.id)}
              > +1 </button>
          </td>
          <td>
            <input
              className='form-control'
              value = {band.name}
              onChange = {(event) => changeName(event, band.id)}
              onBlur={ () => onLostFocus(band.id, band.name) }
            />
          </td>
          <td> <h3> {band.votes} </h3></td>
          <td>
            <button 
              className='btn btn-danger'
              onClick={() => remove(band.id)}
              >
              Borrar
            </button>
          </td>
        </tr>
      ))

    )
  }

  return (
    <>
      <h3> Agregar banda</h3>
      <table className='table table-stripped'>
        <thead>
          <tr>
            <th></th>
            <th> Nombre </th>
            <th> Votos  </th>
            <th> Borrar </th>
          </tr>
        </thead>
        <tbody>
          { createRows() }
        </tbody>
      </table>
    </>
  )
}

//BandList.propTypes = {}

export default BandList