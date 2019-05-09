import { Button, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class extends Component {
  static propTypes = {
    headerTitle: PropTypes.string,
    children: PropTypes.any.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  }

  render () {
    const { headerTitle, children, onHide, onSubmit, ...rest } = this.props

    return (
      <Modal{...rest} size="lg" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header>
          <ModalTitle id="contained-modal-title-vcenter">{headerTitle}</ModalTitle>
        </Modal.Header>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter dir='ltr'>
          <Button variant='warning' onClick={onHide}>انصراف</Button>
          <Button variant="success" onClick={onSubmit}>ذخیره</Button>
        </ModalFooter>
      </Modal>
    )
  }
}