import React from 'react';
import { Nav, Navbar, Container, NavDropdown, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from 'D:/REACTJS/REACTJS/src/logo192.png';

const Header = ({ isLoggedIn, userInfo, handleLogout }) => {
    return (
        <Navbar style={{ backgroundColor: '#74412c' }} variant="dark" expand="md" sticky="top">
            <Container>
                <Navbar.Brand href="/">
                    <Image src={logo} alt="Logo" height="30" /> Cột sống
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" exact activeClassName="active">
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/rooms/phongs" activeClassName="active">
                            Phòng
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/users" activeClassName="active">
                            User
                        </Nav.Link>
                        {/* <Nav.Link as={NavLink} to="" activeClassName="active">
                            Chat
                        </Nav.Link> */}
                    </Nav>
                    <Nav>
                        {isLoggedIn ? (
                            <NavDropdown title={userInfo?.first_name || 'User'}>
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <NavDropdown title="Setting">
                                <NavDropdown.Item href="/logins">Login</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
