import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import RegisterModal from "./Auth/RegisterModal";
import LoginModal from "./Auth/LoginModal";
import Logout from "./Auth/Logout";

class AppNavBar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  state = {
    isOpen: false,
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );
    const authLinks = (
      <Fragment>
        {user &&  <NavItem>
          <span className="navbar-text mr-3">

          
            <strong>Welcome {user.name}!</strong>
          </span>
        </NavItem>}
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">ShoppingList</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                
                
                {isAuthenticated ? authLinks : guestLinks}
                <NavItem>
                  <NavLink href="https://github.com/R-dr/MERNstackShoppingList">Github repo</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(AppNavBar);
