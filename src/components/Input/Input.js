import { FormControl, FormGroup } from 'react-bootstrap'
import React from 'react'

export default (props) => {
  return (
    <FormGroup>
      <FormControl {...props}/>
    </FormGroup>
  )
}