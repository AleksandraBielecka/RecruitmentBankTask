import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { GrTransaction } from "react-icons/gr";

const Header: React.FC = () => {
  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{ width: "110%", marginBottom: "20px" }}
    >
      <Container>
        <Navbar.Brand href="/">
          Transactions
          <GrTransaction style={{ marginLeft: "10px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Example1</Nav.Link>
            <Nav.Link href="/">Example1</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
