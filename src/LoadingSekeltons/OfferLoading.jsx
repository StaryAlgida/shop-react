import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import {Col} from "react-bootstrap";
import Loading from '/src/assets/Loading.png'
import {number} from 'prop-types';

OfferLoading.propTypes={
    quantity: number,
}
export default function OfferLoading({quantity = 1}){

    const returnCartsArray = (quantity)=>{
        const array = []
        for(let i= 0; i<quantity; i++){
            array.push({id:i,
                card: <Card>
                <Card.Img variant="top" src={Loading} />
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder.Button variant="primary" className='w-100' xs={6} />
                    <Placeholder as={Card.Text} animation="glow" className='mt-2'>
                        <Placeholder xs={4} /> <Placeholder xs={7} />
                        <Placeholder xs={5} /> <Placeholder xs={6} />
                    </Placeholder>
                </Card.Body>
            </Card>
            })
        }
        return array
    }

    return(
        <>
            {returnCartsArray(quantity).map(item=>(
                <Col  xl={3}  sm={6}  className='mb-4' key={item.id}>
                    {item.card}
                </Col>
            ))}
        </>
    )
}