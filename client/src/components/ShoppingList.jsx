import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ShoppingList extends Component {
  static propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};
  componentDidMount() {
    this.props.getItems();
  }
  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };
  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ?  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    // below is using redux to delete items from the global store, check item reducer for logic
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >
                    &times;
                  </Button> : null}
                 
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}
// below isthe way you set the props for a class using a reducer, the get items object is a function so you tell it its a function, and the item returns a object so you set it as such.


const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

// to connect the class to the redux state you use connect like this with a parathesis and then wrap theclass in parenthesis
export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
