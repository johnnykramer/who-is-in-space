import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return (
      <header>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Who is in space?</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="https://t.me/johnnykramer" target="_blank">
                @johnnykramer
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}
