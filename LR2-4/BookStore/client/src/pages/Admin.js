import React, {useState} from 'react'
import {Button, Container} from 'react-bootstrap'
import CreateBook from '../modals/CreateBook'
import CreateGenre from '../modals/CreateGenre'
import CreatePublisher from '../modals/CreatePublisher'
import DeleteBook from '../modals/DeleteBook'
import DeleteGenre from '../modals/DeleteGenre'
import DeletePublisher from '../modals/DeletePublisher'

const Admin = () => {
    const [publisherVisible, setPublisherVisible] = useState(false)
    const [genreVisible, setGenreVisible] = useState(false)
    const [bookVisible, setBookVisible] = useState(false)
    const [deleteBookVisible, setDeleteBookVisible] = useState(false)
    const [deleteGenreVisible, setDeleteGenreVisible] = useState(false)
    const [deletePublisherVisible, setDeletePublisherVisible] = useState(false)

    return (
        <div style={{ background: 'linear-gradient(259deg, #1a1e28,#3b3b33,#ab9462)', minHeight: '95vh' }}>
        <Container className="d-flex flex-column">
            <Button 
                variant={"light"} 
                className="mt-4 p-2" 
                onClick={() => setBookVisible(true)} 
                onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')} 
                onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
            >
                Добавить книгу
            </Button>
            <Button 
                variant={"light"} 
                className="mt-4 p-2" 
                onClick={() => setGenreVisible(true)}
                onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')} 
                onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
            >
                Добавить жанр
            </Button>
            <Button 
                variant={"light"} 
                className="mt-4 p-2" 
                onClick={() => setPublisherVisible(true)}
                onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')} 
                onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
            >
                Добавить издательство
            </Button>
            <Button 
                variant={"danger"} 
                className="mt-4 p-2" 
                onClick={() => setDeleteBookVisible(true)}
                onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')} 
                onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
            >
                Удалить книгу
            </Button>
            <Button 
                variant={"danger"} 
                className="mt-4 p-2" 
                onClick={() => setDeleteGenreVisible(true)}
                onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')} 
                onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
            >
                Удалить жанр
            </Button>
            <Button 
                variant={"danger"} 
                className="mt-4 p-2" 
                onClick={() => setDeletePublisherVisible(true)}
                onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')} 
                onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
            >
                Удалить издательство
            </Button>
            <CreatePublisher show={publisherVisible} onHide={() => setPublisherVisible(false)} />
            <CreateBook show={bookVisible} onHide={() => setBookVisible(false)} />
            <CreateGenre show={genreVisible} onHide={() => setGenreVisible(false)} />
            <DeleteBook show={deleteBookVisible} onHide={() => setDeleteBookVisible(false)} /> 
            <DeleteGenre show={deleteGenreVisible} onHide={() => setDeleteGenreVisible(false)} /> 
            <DeletePublisher show={deletePublisherVisible} onHide={() => setDeletePublisherVisible(false)} /> 
        </Container>
        </div>
    )
}

export default Admin
