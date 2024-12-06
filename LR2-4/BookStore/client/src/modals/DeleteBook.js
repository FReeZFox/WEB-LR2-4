import React, {useState, useContext} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import {Context} from '../index'
import {deleteBook} from '../http/AdminAPI'

const DeleteBook = ({ show, onHide }) => {
    const { book } = useContext(Context)
    const [bookId, setBookId] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleDelete = async () => {
        try {
            const response = await deleteBook(bookId)

            if (response.message === 'Книга успешно удалена.') {
                book.setBooks(book.books.filter(b => b.id !== parseInt(bookId)))
                setErrorMessage('')
                alert('Книга успешно удалена')
                onHide()
            } else {
                alert('Ошибка: ' + response.message)
            }
        } catch (e) {
            if (e.response && e.response.data && e.response.data.message) {
                setErrorMessage(e.response.data.message)
            } else {
                setErrorMessage('Произошла ошибка при удалении книги.')
            }
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить книгу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                        placeholder={'Введите ID книги для удаления'}
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
    );
};

export default DeleteBook;
