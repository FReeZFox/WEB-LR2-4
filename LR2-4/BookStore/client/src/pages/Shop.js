import React, { useContext, useEffect } from 'react'
import { Container } from "react-bootstrap"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import GenreBar from "../components/GenreBar"
import PublisherBar from "../components/PublisherBar"
import BookList from "../components/BookList"
import { observer } from "mobx-react-lite"
import { Context } from "../index"
import { fetchPublishers, fetchBooks, fetchGenres } from "../http/BookAPI"

const Shop = observer(() => {
    const { book } = useContext(Context)

    useEffect(() => {
        fetchGenres().then(data => book.setGenres(data))
        fetchPublishers().then(data => book.setPublishers(data))
        fetchBooks(book.selectedGenre.id, book.selectedPublisher.id).then(data => book.setBooks(data.rows))
    }, [book, book.selectedGenre, book.selectedPublisher])
    
    return (
        <div style={{background: 'linear-gradient(259deg, #1a1e28,#3b3b33,#ab9462)', minHeight: '100vh'}}>
            <Container>
                <Row className="mt-2">
                    <Col md={3}>
                        <GenreBar />
                        <PublisherBar />
                    </Col>
                    <Col md={9}>
                        <BookList />
                    </Col>
                </Row>
            </Container>
        </div>
    )
})

export default Shop
