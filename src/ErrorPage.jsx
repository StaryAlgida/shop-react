import {useRouteError} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {LinkContainer} from "react-router-bootstrap";

export default function ErrorPage(){
    const error = useRouteError()
    console.log(error)

    return (
        <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
            <h1>Oops!</h1>
            <h3>404 not found</h3>
            <p>
                <LinkContainer to='/'>
                    <Button>Go back</Button>
                </LinkContainer>
            </p>
        </div>
    );
}