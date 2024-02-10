import Offer from "./Offer.jsx";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import axios from "axios";
import {useEffect, useState} from "react";
import OfferLoading from "../LoadingSekeltons/OfferLoading.jsx";

export default function AllOffers() {
    const client = axios.create({
        baseURL: "http://127.0.0.1:3200",
    });

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getCategoriesName = (items, categories) => {
        return (items.map(item => (
            {...item, categoryName: categories[item.categoryId].title}
        )));
    }

    const getItems = async () => {
        try {
            setIsLoading(true)
            const responseItems = await client.get("/adverts")
            const responseCategories = await client.get("/categories")
            const finalData = getCategoriesName(responseItems.data, responseCategories.data)
            setIsLoading(false)
            setItems([...finalData])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        void getItems();
    }, []);

    return (
        <Container fluid>
            <Row>
                {isLoading ?
                    <OfferLoading quantity={8}/> :
                    <>
                        {items.map((item) => (
                            <Col xl={3} sm={6} className='mb-4' key={item.id}>
                                <Offer item={item}/>
                            </Col>
                        ))}
                    </>}
            </Row>
        </Container>
    )
}