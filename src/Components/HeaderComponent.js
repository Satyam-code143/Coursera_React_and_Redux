import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Jumbotron,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };
  }

  toggleNav = () => {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  };
  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };
  handleLogin = (e) => {
    this.toggleModal();
    alert(
      "Username:" +
        this.username.value +
        "Password: " +
        this.password.value +
        "Remember: " +
        this.remember.value
    );
    e.perventDefault();
  };
  render() {
    return (
      <>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img
                src="assets/images/logo.png"
                height="30"
                width="41"
                alt="Ristorante ConFusion"
              />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg"></span> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/about">
                    <span className="fa fa-info fa-lg"></span> Aboutus
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/menu">
                    <span className="fa fa-list fa-lg"></span> Menu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contact">
                    <span className="fa fa-phone fa-lg"></span> Contact
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-sign-in fa-lg">Login</span>
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row roe-header">
              <div className="col-12 col-sm-6">
                <h1>Restorante Con Fusion</h1>
                <p>
                  We take inspiration from the worlds best dish In qui labore
                  nostrud dolore pariatur tempor quis ut. Eiusmod culpa
                  excepteur sint adipisicing aliqua velit. Occaecat pariatur
                  labore deserunt magna ipsum occaecat voluptate velit
                  exercitation esse anim nisi cillum. Voluptate duis dolore
                  consequat nostrud cillum. Deserunt enim officia irure
                  occaecat.
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={(input) => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={(input) => (this.password = input)}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="remember"
                    innerRef={(input) => (this.remember = input)}
                  />
                  Remember me
                </Label>
              </FormGroup>
              <Button
                type="submit"
                value="submit"
                className="bg-primary"
                color="primary"
              >
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default Header;
