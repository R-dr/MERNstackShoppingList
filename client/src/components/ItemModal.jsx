import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
//import uuid from 'uuid'

class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
  };
static propTypes ={
  isAuthenticated:PropTypes.bool
}

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault()
    const newItem= {
      //id:uuid(), this was needed before connecting to the database so we had an id, now with mongo it makes it's own id
      name:this.state.name
    }
    // add item via addItem action in redux
    this.props.addItem(newItem);
    //Close modal here
    this.toggle();
  }
  render() {
    return (
      <div>
        {this.props.isAuthenticated ? <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add Item
        </Button> : <h4>Please log in to manage items</h4>}
        

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add item"
                  onChange={this.onChange}
                />
                <Button
                color='dark'
                style={{MarginTop: '2rem'}}
                block
                >Add Item</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated:state.auth.isAuthenticated
});
//remember when using connect this is the way to export so the redux is used
export default connect(mapStateToProps, {addItem})(ItemModal);
