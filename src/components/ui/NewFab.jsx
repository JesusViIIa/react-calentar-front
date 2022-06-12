import React from 'react'
import { useDispatch } from 'react-redux'
import { OpenModal } from '../../actions/ui'

export const NewFab = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(OpenModal())
   }
  return (
    <button onClick={handleClick}  className="btn btn-primary fab"> <i className="fas fa-plus"></i> </button>
  )
}
