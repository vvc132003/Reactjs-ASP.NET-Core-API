import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { useLocation, NavLink } from 'react-router-dom';
const Header = (props) => {
    const location = useLocation();
    return (
        <>
            <Navbar bg="gray" expand="md">
                <Container>
                    <Navbar.Brand href="/">Thích thì code</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className="nav-link" >
                                Home
                            </NavLink>
                            <NavLink to="rooms/phongs" className="nav-link" >
                                Phòng
                            </NavLink>
                            <NavLink to="/users" className="nav-link" >
                                User
                            </NavLink>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Setting" >
                                <NavDropdown.Item href="/logins">Login</NavDropdown.Item>
                                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header;