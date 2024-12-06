import React, {useState, useContext} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import {Context} from '../index'
import {deletePublisher} from '../http/AdminAPI'

const DeletePublisher = ({ show, onHide }) => {
    const { book } = useContext(Context)
    const [publisherId, setPublisherId] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleDelete = async () => {
        try {
            const response = await deletePublisher(publisherId)

            if (response.message === 'Издательство успешно удалено.') {
                book.setPublishers(book.publishers.filter(p => p.id !== parseInt(publisherId)));
                setErrorMessage('')
                alert('Издательство успешно удалено.')
                onHide()
            } else {
                setErrorMessage(response.message)
            }
        } catch (e) {
            if (e.response && e.response.data && e.response.data.message) {
                setErrorMessage(e.response.data.message)
            } else {
                setErrorMessage('Произошла ошибка при удалении издательства.')
            }
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить издательство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={publisherId}
                        onChange={(e) => setPublisherId(e.target.value)}
                        placeholder={'Введите ID издательства для удаления'}
                        type="number"
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
                    variant="outline-danger" 
                    onClick={handleDelete}
                    onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                    onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                >
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeletePublisher
