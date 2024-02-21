import Container from "react-bootstrap/Container";
import {Col, Image, Row} from "react-bootstrap";
import AccordionOptions from "./components/AccordionOptions.jsx";
import {useUserData} from "./customHooks/useUserData.jsx";

export default function Profile(){
    const profile = useUserData()

    return(
        <>
            <Container fluid>
                <Row className='mt-4'>
                    <Col className='d-flex align-items-center justify-content-center '>
                        <Image src={profile.avatar} roundedCircle />
                        <p className='ms-3 fw-bold fs-2'>{profile.name}</p>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <AccordionOptions seller={profile.name}/>
                </Row>
            </Container>
        </>
    )
}