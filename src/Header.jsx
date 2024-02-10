import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from "axios";
import {useEffect, useState} from "react";
import {LinkContainer} from 'react-router-bootstrap'
import LoadingSpinner from "./LoadingSpinner.jsx";

export const useCategories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get("/categories")
                const titlesOnly = [...new Set(response.data.map(item => (
                    item.title
                )))]
                let id = 0;
                const correctData = titlesOnly.map(title => {
                    id += 1
                    return (
                        {
                            id,
                            title,
                        }
                    )
                })
                setCategories([...correctData])
            } catch (error) {
                if (axios.isAxiosError(error))
                    console.log(error)
            }
        }
        void getCategories();
    }, []);

    return categories;
}


export default function Header() {
    const categories = useCategories()

    // TODO: move to custom hook
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const getLoggedUser = async () => {
            try {
                const response = await axios.get("/name")
                setUserData({...response.data})
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        void getLoggedUser();
    }, []);

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
                                    <LinkContainer key={item.id} to={`/category/${item.title.toLowerCase()}`}>
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