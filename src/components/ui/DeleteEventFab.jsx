import React from 'react'
import { useDispatch } from 'react-redux'
import {  eventStartDelete } from '../../actions/calendar'

export const DeleteEventFab = () => {
  const dispatch = useDispatch()
  const deleteEvent = () => { 
    dispatch(eventStartDelete())
  }
  return (
    <button onClick={deleteEvent} className="btn btn-danger fab-danger"><i className="fas fa-trash"></i> <span> Borrar evento</span></button>
  )
}
