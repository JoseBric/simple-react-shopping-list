import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

export class ItemModal extends Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired,
  }

  state = {
    modal: false,
    name: '',
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    })
  }

  onChange = e => {
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  onSubmit = e => {
    e.preventDefault()

    const newItem = {
      name: this.state.name,
    }

    this.props.addItem(newItem)

    this.toggle()
  }

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >Add Item</Button>     

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
            Add To Shopping List
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item" >Item</Label>
                <Input 
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                  onChange={this.onChange}
                />
                <Button
                  color="dark"
                  style={{ marginTop: '2rem' }}
                  block
                >
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>   
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  addItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemModal)
