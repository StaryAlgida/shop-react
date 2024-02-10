import Accordion from 'react-bootstrap/Accordion';
import AddForm from "../forms/AddForm.jsx";
import EditForm from "../forms/EditForm.jsx";
import DeleteForm from "../forms/DeleteForm.jsx";
import {string} from "prop-types";

AccordionOptions.propTypes={
    seller: string,
}
export default function AccordionOptions({seller}){

    return (
        <Accordion defaultActiveKey='0' flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Add</Accordion.Header>
                <Accordion.Body>
                    <AddForm seller={seller}/>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Edit</Accordion.Header>
                <Accordion.Body>
                    <EditForm/>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Delete</Accordion.Header>
                <Accordion.Body>
                    <DeleteForm/>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );

}
