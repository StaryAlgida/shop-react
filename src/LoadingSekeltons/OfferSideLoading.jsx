import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import LoadingBig from '/src/assets/Loading_800x600.png'
import Image from 'react-bootstrap/Image';
import Placeholder from "react-bootstrap/Placeholder";

export default function OfferSideLoading(){
    return(
        <Container className='mt-5'>
            <Row>
                <Col lg={6}>
                   <Image src={LoadingBig} fluid/>
                </Col>
                <Col lg={6} className='mt-3'>
                    <Placeholder as='h1' animation='glow'>
                        <Placeholder  xs={7}/>
                    </Placeholder>
                    <Placeholder as='h3' animation='glow'>
                        <Placeholder xs={3}/> <Placeholder xs={1}/>
                    </Placeholder>
                    <div className='d-flex flex-column'>
                        <Placeholder as='h3' animation='glow'>
                            <Placeholder xs={2}/> <Placeholder xs={3}/>
                        </Placeholder>
                        <Placeholder.Button xs={4} aria-hidden="true" />
                    </div>
                </Col>
            </Row>
            <Row>
                <Placeholder as='h5' animation='glow'>
                    <Placeholder xs={1} className='mt-3'/>
                </Placeholder>
                <Placeholder as='span' animation='glow'>
                    <Placeholder xs={3}/> <Placeholder xs={2}/> <Placeholder xs={5}/> <Placeholder xs={6}/>
                </Placeholder>
            </Row>
        </Container>
    )
}