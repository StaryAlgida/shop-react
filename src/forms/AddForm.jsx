import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import {useEffect, useState} from "react";
import axios from "axios";
import {FloatingLabel, Modal} from "react-bootstrap";
import { string} from "prop-types";

AddForm.propTypes={
    seller: string,
}
export default function AddForm({seller}){
    const client = axios.create({
        baseURL: "http://127.0.0.1:3200",
    });

    const [category, setCategory] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const sendData = async (data)=>{
        try{
            const currentDate = new Date()
            const finalData = {...data, seller}
            delete finalData.terms
            finalData.categoryId = parseInt(finalData.categoryId)
            finalData.price = finalData.price.toFixed(2)
            finalData.price = `${finalData.price}`
            finalData.createdOn = currentDate.toISOString()
            finalData.canNegotiate = finalData.canNegotiate === "true"
            console.log(finalData)

            const response = await client.post('/adverts', finalData)
            console.log(response.data)
            setShow(true)
        }catch (error){
            console.log(error)
        }
    }
    const getCategory = async ()=>{
        try{
            const response = await client.get('/categories')
            console.log(response.data)
            setCategory([...response.data])
        }catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        void getCategory();
    }, []);

    const { Formik } = formik;
    const phoneRegExp = /^\+\d{2} \d{3} \d{3} \d{3}$/
    const schema = yup.object().shape({
        title: yup.string().required().min('2',"Title too short"),
        price: yup.number().required().positive("Price too low"),
        image: yup.string().required(),
        canNegotiate: yup.string().required(),
        categoryId: yup.string().required(),
        sellerPhone: yup.string().required('Phone number is a required field.').matches(phoneRegExp, 'Phone number is not valid'),
        description: yup.string().required("Description field is required.").min('5',"Description too shor"),
        terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
    });

    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={sendData}
                initialValues={{
                    title: '',
                    price: '',
                    image: '',
                    canNegotiate: '',
                    categoryId: '',
                    sellerPhone:'',
                    description:'',
                    terms: false,
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
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
                                >
                                    <option> </option>
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
                                >
                                    <option> </option>
                                    {category.map(item=>(
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
                                        style={{ height: '75px' }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Check
                                required
                                name="terms"
                                label="Agree to terms and conditions"
                                onChange={handleChange}
                                isInvalid={!!errors.terms}
                                feedback={errors.terms}
                                feedbackType="invalid"
                                id="validationFormik0"
                            />
                        </Form.Group>
                        <Button type="submit">Submit form</Button>
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
                    <Modal.Title>Item added</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Item has been added successfully.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}