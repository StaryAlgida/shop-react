import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import Container from "react-bootstrap/Container";
import {Col, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import OfferSideCarousel from "../components/OfferSideCarousel.jsx";
import Button from "react-bootstrap/Button";
import OfferSideLoading from "../LoadingSekeltons/OfferSideLoading.jsx";
import {string, node} from "prop-types";

const Link = ({id, children, title}) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
        <a href="#">{children}</a>
    </OverlayTrigger>
);

Link.propTypes = {
    id: string,
    children: node,
    title: string
}

export const NOT_FOUND = 404;

export default function OfferSide() {

    const nav = useNavigate()
    const {offerId} = useParams();
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)


    // const name = 'xd'
    // const age = 22

    // const obj = {
    //     name,
    //     age,
    // }

    // const obj = useMemo(() => ({
    //     name,
    //     age
    // }), [name, age]);

    const getOfferData = useCallback(async () => {
        try {
            const response = await axios.get(`/adverts/${offerId}`)
            console.log(response.data)
            setData({...response.data})
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                if (error.response.status === NOT_FOUND) {
                    nav('/error')
                }
            }
        }
    }, [nav, offerId]);

    useEffect(() => {
        void getOfferData()
    }, [getOfferData]);

    // useEffect(() => {
    //
    // }, [obj]);

    return (
        <>
            {/*<Comp obj={obj} />*/}
            {isLoading ? <OfferSideLoading/> :
                <Container className='mt-5'>
                    <Row>
                        <Col lg={6}>
                            <OfferSideCarousel/>
                        </Col>
                        <Col lg={6} className='mt-3'>
                            <h1>{data.title}</h1>
                            <div className='d-flex'>
                                <h3 className='text-secondary'>{data.price} PLN</h3>
                                <span className='ms-3 mt-1'>{data.canNegotiate ?
                                    <Link title='Can be negotiated.' id='t-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             fill="currentColor" className="negotiation-svg-true " viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                        </svg>
                                    </Link> :
                                    <Link title='Cannot be negotiated.' id='t-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             fill="currentColor" className="negotiation-svg-false" viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                        </svg>
                                    </Link>}
                            </span>
                            </div>
                            <div className='d-flex flex-column'>
                                <span className='fs-2'>Seller: {data.seller}</span>
                                <Button className='mt-3' variant="primary">Buy</Button>
                            </div>
                            <div className='d-flex justify-content-between mt-3'>
                                <p>Phone: <span className='fw-bold'>{data.sellerPhone}</span></p>
                                <p>Created: <span
                                    className='fw-bold'>{data.createdOn ? data.createdOn.split('T')[0] : ''}</span></p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <h5 className='mt-3'>Description</h5>
                        <span>{data.description}</span>
                    </Row>
                </Container>
            }

        </>
    )
}