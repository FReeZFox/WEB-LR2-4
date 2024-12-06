import React, {useState} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import {createPublisher} from "../http/AdminAPI"

const CreatePublisher = ({ show, onHide }) => {
    const [value, setValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const addPublisher = async () => {
        try {
            await createPublisher({ name: value })
            setValue('')
            setErrorMessage('')
            alert('Издательство успешно создано')
            onHide()
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage('Произошла ошибка при создании издателя.')
            }
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить издателя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название издателя"}
                    />
                    {errorMessage && (
                        <div style={{ color: 'red', marginTop: '10px' }}>
                            {errorMessage}
                        </div>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="outline-danger" 
                    onClick={onHide}
                    onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                    onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                >
                    Закрыть
                </Button>
                <Button 
                    variant="outline-success" 
                    onClick={addPublisher}
                    onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                    onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                >
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreatePublisher
