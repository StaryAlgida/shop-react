import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CategorySVG from '/src/assets/category-2-svgrepo-com.svg'
import {LinkContainer} from "react-router-bootstrap";
import {number, string, bool, shape, oneOfType} from "prop-types";

Offer.propTypes={
    item: shape({
        id: string,
        title: string,
        price: oneOfType([string, number]),
        description: string,
        seller: string,
        image: string,
        sellerPhone: string,
        canNegotiate: oneOfType([bool, string]),
        createdOn: string,
        categoryId: number,
    }),
}
export default  function Offer({item}){
    return (
        <Card >
            <Card.Img variant="top" src={`https://picsum.photos/286/180?i=${item.id}`} />
            <Card.Body>
                <Card.Title className='text-truncate'>{item.title}</Card.Title>
                <Card.Text className='line-clamp ' style={{height: '4.6rem'}}>
                    {item.description}
                </Card.Text>
                <LinkContainer to={`/offer/${item.id}`}>
                    <Button className='w-100' variant="primary">Show porduct</Button>
                </LinkContainer>
                <div className='d-flex justify-content-between mt-2'>
                    <div>{item.price} PLN</div>
                    <div>Negotiation: <span className='ms-1'>{item.canNegotiate?
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="negotiation-svg-true" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>:
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="negotiation-svg-false" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                        </svg>}</span>
                    </div>
                </div>
                <div className='d-flex justify-content-between mt-2'>
                    <div><img src={CategorySVG} alt="Category" className='svg-small'/> {item.categoryName}</div>
                   <div>Seller: <span className='fw-bold'>{item.seller}</span></div>
                </div>
            </Card.Body>
        </Card>
    );
}