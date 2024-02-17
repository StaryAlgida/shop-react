import Offer from "./Offer.jsx";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import OfferLoading from "../LoadingSekeltons/OfferLoading.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useCategories} from "../customHooks/useCategories.jsx";
import {useAdverts} from "../customHooks/useAdverts.jsx";
import {CategoryContext} from "../context/CategoryContext.jsx";

export default function Category() {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {categoryId} = useParams();

    const {getOffersByCategory} = useContext(CategoryContext)
    const nav = useNavigate()

    const categories = useCategories()
    const adverts = useAdverts()

    useEffect(() => {
        const data = getOffersByCategory(adverts, categories, categoryId)
        setItems(data)
        setIsLoading(false)

        if(categoryId<0 || categoryId>10 || isNaN(categoryId)){
            nav('/error')
        }

    }, [nav, categories, adverts, categoryId, getOffersByCategory]);

    return (
        <>
            <Container fluid>
                <Row>
                    {isLoading ? <OfferLoading quantity={12}/> :
                        items.map((item) => (
                            <Col xl={3} sm={6} className='mb-4' key={item.id}>
                                <Offer item={item}/>
                            </Col>
                        ))}
                </Row>
            </Container>
        </>
    )
}