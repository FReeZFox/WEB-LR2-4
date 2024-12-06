import React, {useState, useContext} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import {Context} from '../index'
import {deleteGenre} from '../http/AdminAPI'

const DeleteGenre = ({ show, onHide }) => {
    const { book } = useContext(Context)
    const [genreId, setGenreId] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleDelete = async () => {
        try {
            const response = await deleteGenre(genreId)

            if (response.message === 'Жанр успешно удален.') {
                book.setGenres(book.genres.filter(g => g.id !== parseInt(genreId)))
                setErrorMessage('')
                alert('Жанр успешно удален.')
                onHide()
            } else {
                setErrorMessage(response.message)
            }
        } catch (e) {
            if (e.response && e.response.data && e.response.data.message) {
                setErrorMessage(e.response.data.message)
            } else {
                setErrorMessage('Произошла ошибка при удалении жанра.')
            }
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить жанр
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={genreId}
                        onChange={(e) => setGenreId(e.target.value)}
                        placeholder={'Введите ID жанра для удаления'}
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

export default DeleteGenre
