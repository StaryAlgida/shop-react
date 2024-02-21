import Accordion from 'react-bootstrap/Accordion';
import AddForm from "../forms/AddForm.jsx";
import EditForm from "../forms/EditForm.jsx";
import DeleteForm from "../forms/DeleteForm.jsx";
import {string} from "prop-types";
import {FormProvider} from "../context/FromsContext.jsx";

AccordionOptions.propTypes = {
    seller: string,
}
export default function AccordionOptions({seller}) {

    return (
        <Accordion defaultActiveKey='0' flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Add</Accordion.Header>
                <Accordion.Body>
                    <FormProvider>
                        <AddForm seller={seller}/>
                    </FormProvider>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Edit</Accordion.Header>
                <Accordion.Body>
                    <FormProvider>
                        <EditForm/>
                    </FormProvider>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Delete</Accordion.Header>
                <Accordion.Body>
                    <FormProvider>
                        <DeleteForm/>
                    </FormProvider>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );

}
