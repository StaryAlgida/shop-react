import Offer from "./Offer.jsx";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import {useCallback, useEffect, useState} from "react";
import OfferLoading from "../LoadingSekeltons/OfferLoading.jsx";
import {useCategories} from "../customHooks/useCategories.jsx";
import {useAdverts} from "../customHooks/useAdverts.jsx";

export default function AllOffers() {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getCategoriesName = useCallback((adverts, categories) => {
        return (adverts.map(advert => (
            {...advert, categoryName: categories[advert.categoryId].title}
        )));
    }, [])
    const categories = useCategories()
    const adverts = useAdverts()

    useEffect(() => {
        const data = getCategoriesName(adverts, categories)
        setItems(data)
        setIsLoading(false)
    }, [adverts, categories, getCategoriesName]);

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