import {Carousel, Image} from "react-bootstrap";

export default function OfferSideCarousel(){
    return(
        <Carousel>
            <Carousel.Item interval={1000}>
                <Image src={'https://picsum.photos/800/600?i=1'} fluid/>
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <Image src={'https://picsum.photos/800/600?i=2'} fluid/>
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image src={'https://picsum.photos/800/600?i=3'} fluid/>
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}