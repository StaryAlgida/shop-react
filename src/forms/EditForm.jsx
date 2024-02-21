import * as formik from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {Dropdown, FloatingLabel, Modal} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {useAdverts} from "../customHooks/useAdverts.jsx";
import {useCategories} from "../customHooks/useCategories.jsx";
import {FormContext} from "../context/FromsContext.jsx";
import {useSingleAdvert} from "../customHooks/useSingleAdvert.jsx";

export default function EditForm() {
    const {Formik} = formik;
    const {sendEditForm} = useContext(FormContext)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [items, setItems] = useState([])
    const [selectedItemId, setSelectedItemId] = useState('')

    const responseItems = useAdverts()
    const category = useCategories()

    const itemInfo = useSingleAdvert(selectedItemId)

    const submit = (data) => {
        if (sendEditForm(data, itemInfo, selectedItemId)) {
            setShow(true)
            setSelectedItemId('')
        }
    }

    const checkIfSelected = () => {
        return selectedItemId === '';
    }

    const phoneRegExp = /^\+\d{2} \d{3} \d{3} \d{3}$/
    const schema = yup.object().shape({
        title: yup.string().required().min('2', "Title too short"),
        price: yup.number().required().positive("Price too low"),
        image: yup.string().required(),
        canNegotiate: yup.string().required(),
        categoryId: yup.string().required(),
        sellerPhone: yup.string().required('Phone number is a required field.').matches(phoneRegExp, 'Phone number is not valid'),
        description: yup.string().required("Description field is required.").min('5', "Description too shor"),
    });


    useEffect(() => {
        const getItemsToEdit = () => {
            const finalData = responseItems.map(item => (
                {
                    id: item.id,
                    title: item.title
                }
            ))
            console.log('item to edit')
            console.log(finalData)
            setItems([...finalData])
        }
        if (responseItems.length !== 0) {
            void getItemsToEdit()
        }
    }, [responseItems]);

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {items.length === 0 ?
                        <Dropdown.Item>Loading...</Dropdown.Item> :
                        items.map(item => (
                            <Dropdown.Item key={item.id}
                                           onClick={() => setSelectedItemId(item.id)}>{item.title}</Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>

            <Formik
                enableReinitialize={true}
                validationSchema={schema}
                onSubmit={submit}
                initialValues={{
                    title: itemInfo.title !== undefined ? itemInfo.title : '',
                    price: itemInfo.price !== undefined ? itemInfo.price : '',
                    image: itemInfo.image !== undefined ? itemInfo.image : '',
                    canNegotiate: itemInfo.canNegotiate !== undefined ? itemInfo.canNegotiate : '',
                    categoryId: itemInfo.categoryId !== undefined ? itemInfo.categoryId : '',
                    sellerPhone: itemInfo.sellerPhone !== undefined ? itemInfo.sellerPhone : '',
                    description: itemInfo.description !== undefined ? itemInfo.description : '',
                }}
            >
                {({handleSubmit, handleChange, values, touched, errors}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationFormik01">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    placeholder="Your produc title"
                                    value={values.title}
                                    onChange={handleChange}
                                    isValid={touched.title && !errors.title}
                                    isInvalid={!!errors.title}
                                    disabled={checkIfSelected()}
                                />
                                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationFormik02">
                                <Form.Label>Price in PLN</Form.Label>
                                <Form.Control
                                    type="number"
                                    step=".01"
                                    name="price"
                                    placeholder="20.99"
                                    value={values.price}
                                    onChange={handleChange}
                                    isValid={touched.price && !errors.price}
                                    isInvalid={!!errors.price}
                                    disabled={checkIfSelected()}
                                />
                                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationFormik03">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="image"
                                    name="image"
                                    value={values.image}
                                    onChange={handleChange}
                                    isValid={touched.image && !errors.image}
                                    isInvalid={!!errors.image}
                                    disabled={checkIfSelected()}
                                />

                                <Form.Control.Feedback type="invalid">
                                    Image is a required field
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationFormik04">
                                <Form.Label>Can by negotiate</Form.Label>
                                <Form.Select
                                    aria-label="Can by negotiate"
                                    type="text"
                                    placeholder="canNegotiate"
                                    name="canNegotiate"
                                    value={values.canNegotiate}
                                    onChange={handleChange}
                                    isValid={touched.canNegotiate && !errors.canNegotiate}
                                    isInvalid={!!errors.canNegotiate}
                                    disabled={checkIfSelected()}
                                >
                                    <option></option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Negotiate field is required.
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationFormik05">
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    aria-label="Category"
                                    type="text"
                                    placeholder="Category"
                                    name="categoryId"
                                    value={values.categoryId}
                                    onChange={handleChange}
                                    isValid={touched.categoryId && !errors.categoryId}
                                    isInvalid={!!errors.categoryId}
                                    disabled={checkIfSelected()}
                                >
                                    <option></option>
                                    {category.map(item => (
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Category is a required field.
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            {/*Phone number*/}
                            <Form.Group as={Col} md="4" controlId="validationFormik06">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control
                                    aria-label="Phone number"
                                    type="text"
                                    placeholder="+48 111 222 333"
                                    name="sellerPhone"
                                    value={values.sellerPhone}
                                    onChange={handleChange}
                                    isValid={touched.sellerPhone && !errors.sellerPhone}
                                    isInvalid={!!errors.sellerPhone}
                                    disabled={checkIfSelected()}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.sellerPhone}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            {/*Description*/}
                            <Form.Group as={Col} className='mt-3' controlId="validationFormik07">
                                <FloatingLabel controlId="floatingTextarea2" label="Description">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        isValid={touched.description && !errors.description}
                                        isInvalid={!!errors.description}
                                        style={{height: '75px'}}
                                        disabled={checkIfSelected()}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Button type="submit" disabled={checkIfSelected()}>Submit form</Button>
                    </Form>
                )}
            </Formik>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Item edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Item has been edited successfully.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}