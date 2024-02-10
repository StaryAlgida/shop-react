import Offer from "./Offer.jsx";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import axios from "axios";
import {useEffect, useState} from "react";
import OfferLoading from "../LoadingSekeltons/OfferLoading.jsx";
import {useNavigate, useParams} from "react-router-dom";

export  default function Category(){
    const client = axios.create({
        baseURL: "http://127.0.0.1:3200",
    });

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {categoryTitle} = useParams();

    const getCategoriesName = (items, categories) =>{
        const category = categories.filter((cat)=> cat.title.toLowerCase() === categoryTitle);
        if(category.length===0){
            return []
        }
        const filtered = items.filter((item)=>{
            if(category.length > 1){
                if(item.categoryId === parseInt(category[0].id) || item.categoryId === parseInt(category[1].id)){
                    return item
                }
            }
            else{
                if(item.categoryId === parseInt(category[0].id)){
                    return item
                }
            }
        })
        return (filtered.map(item=>(
            {...item, categoryName:categories[item.categoryId].title }
        )));
    }
    const nav = useNavigate()
    const getItems = async ()=>{
        try {
            const responseItems = await client.get("/adverts")
            const responseCategories = await client.get("/categories")
            const finalData = getCategoriesName(responseItems.data, responseCategories.data)
            if(finalData.length===0){
                nav('/error')
                console.log('empty')
            }
            else{
                setIsLoading(false)
                setItems([...finalData])
            }
        }catch (error){
            console.log(error)

        }
    }

    useEffect(() => {
        void getItems();
    }, [categoryTitle]);

    return(
        <>
            <Container fluid>
                <Row>
                    {isLoading ? <OfferLoading quantity={12}/> :
                        items.map((item)=>(
                            <Col  xl={3}  sm={6}  className='mb-4' key={item.id}>
                                <Offer item={item}/>
                            </Col>
                        ))}
                </Row>
            </Container>
        </>
    )
}