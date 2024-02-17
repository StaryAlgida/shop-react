import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {LinkContainer} from 'react-router-bootstrap'
import LoadingSpinner from "./LoadingSpinner.jsx";
import {useCategories} from "./customHooks/useCategories.jsx";
import {useUserData} from "./customHooks/useUserData.jsx";


export default function Header() {
    const categories = useCategories()
    const userData = useUserData()

    return (
        <Navbar expand={'lg'} className="bg-body-tertiary mb-3">
            <Container fluid>
                <LinkContainer to={'/'}>
                    <Navbar.Brand>Super shop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'lg'}`}/>
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${'lg'}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${'lg'}`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>

                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'lg'}`}>
                            Super shop
                        </Offcanvas.Title>

                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <LinkContainer to={'/'}>
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={'/profile'}>
                                <Nav.Link>Profile</Nav.Link>
                            </LinkContainer>
                            <NavDropdown
                                title="Category"
                                id={`offcanvasNavbarDropdown-expand-${'lg'}`}
                            >
                                {categories.length !== 0 ? categories.map(item => (
                                    <LinkContainer key={item.id} to={`/category/${item.id}`}>
                                        <NavDropdown.Item>{item.title}</NavDropdown.Item>
                                    </LinkContainer>
                                )) : <div className='ms-3'><LoadingSpinner/></div>}
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        {userData.name ?
                            <Navbar.Collapse className="justify-content-end mt-3 mt-md-0 ">
                                <Navbar.Text>
                                    Signed in as: {userData.name}
                                </Navbar.Text>
                                <img src={userData.avatar} alt='avatar' width="40" height="40"
                                     className='rounded ms-1'/>
                            </Navbar.Collapse>
                            : ''
                        }
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}