import {ListGroup, Modal, Toast} from "react-bootstrap";
import axios from "axios";
import {useCallback, useContext, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {FormContext} from "../context/FromsContext.jsx";


export default function DeleteForm() {
    const {sendDelete} = useContext(FormContext)

    const [items, setItems] = useState([])
    const [selectedItem, setSelectedItem] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [showToast, setShowToast] = useState(false)

    const handleClose = () => {
        setShowModal(false)
    }

    const submit = async () => {
        if (sendDelete(selectedItem)) {
            setShowModal(false)
            setShowToast(true)
        }
    }

    const getItemsDelete = useCallback(async () => {
        try {
            const responseItems = await axios.get("/adverts")
            const finalData = responseItems.data.map(item => (
                {
                    id: item.id,
                    title: item.title
                }
            ))
            console.log(finalData)
            setItems([...finalData])
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        if (!showModal) {
            void getItemsDelete()
        }
    }, [showModal, getItemsDelete]);

    return (
        <>
            <ListGroup>
                {items.length !== 0 ?
                    items.map(item => (
                        <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-start">
                            {item.title}
                            <Button onClick={() => {
                                setSelectedItem({...item})
                                setShowModal(true)
                            }}
                            >
                                Delete
                            </Button>
                        </ListGroup.Item>
                    ))
                    : <ListGroup.Item>Loading ...</ListGroup.Item>
                }
            </ListGroup>

            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Item delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the item:
                    <b>{Object.keys(selectedItem).length === 0 ? 'error' : selectedItem.title}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>No</Button>
                    <Button variant="success" onClick={submit}>Yes</Button>
                </Modal.Footer>
            </Modal>

            <Toast
                onClick={() => setShowToast(false)}
                show={showToast} delay={3000} autohide
                className="d-inline-block m-1"
                bg='success'
            >
                <Toast.Header>
                    <strong className="me-auto">Success</strong>
                    <small>Now</small>
                </Toast.Header>
                <Toast.Body>
                    Item deleted success.
                </Toast.Body>
            </Toast>
        </>
    )
}