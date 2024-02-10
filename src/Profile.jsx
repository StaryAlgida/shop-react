import Container from "react-bootstrap/Container";
import {Col, Image, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import AccordionOptions from "./components/AccordionOptions.jsx";

export default function Profile(){
    const client = axios.create({
        baseURL: "http://127.0.0.1:3200",
    });
    const [profile, setProfile] = useState([])
    const getData = async ()=>{
        try{
            const response = await client.get('/name')
            setProfile({...response.data})
            console.log(response.data)
        }catch (error){
            console.log(error)
        }
    }
    useEffect(() => {
        void getData()
    }, []);
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