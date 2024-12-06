import React, {useEffect, useState, useContext} from 'react'
import {Button, Card, Col, Container, Image, Row, Spinner} from "react-bootstrap"
import {useParams} from 'react-router-dom'
import {fetchOneBook, fetchGenres, fetchPublishers} from '../http/BookAPI'
import {Context} from '../index'
import {addToCart} from "../http/CartAPI"

const BookPage = () => {
    const { id } = useParams()
    const { user } = useContext(Context)
    const [book, setBook] = useState({ info: [] })
    const [genres, setGenres] = useState([])
    const [publishers, setPublishers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const [bookData, genresData, publishersData] = await Promise.all([
                    fetchOneBook(id),
                    fetchGenres(),
                    fetchPublishers()
                ]);
                setBook(bookData)
                setGenres(genresData)
                setPublishers(publishersData)
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error)
            }
            setIsLoading(false)
        };

        fetchData()
    }, [id])

    const getGenreById = (genreId) => {
        const genre = genres.find(g => g.id === genreId)
        return genre ? genre.name : "Неизвестный жанр"
    };

    const getPublisherById = (publisherId) => {
        const publisher = publishers.find(p => p.id === publisherId)
        return publisher ? publisher.name : "Неизвестное издательство"
    };

    const add = async () => {
        if (!user.isAuth) {
            alert('Вы не авторизованы. Пожалуйста, войдите в аккаунт, чтобы добавить товар в корзину.')
            return
        }

        try {
            const formData = new FormData()
            formData.append('bookId', id)
            await addToCart(formData)
            alert(`Товар "${book.name}" был добавлен в вашу корзину!`)
        } catch (e) {
            alert(e.response?.data?.message || 'Ошибка при добавлении товара в корзину.')
        }
    }

    return (
        <div style={{ background: 'linear-gradient(259deg, #1a1e28,#3b3b33,#ab9462)', minHeight: '95vh' }}>
            <Container className="mt-2" style={{ padding: '20px', borderRadius: '10px' }}>
                {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                        <Spinner animation="grow" variant="light" />
                    </div>
                ) : (
                    <Row>
                        <Col md={5}>
                            <Card style={{ padding: '15px', border: '2px solid lightgray', borderRadius: '10px', backgroundColor: '#e8e8e8' }}>
                                <Image
                                    width={350}
                                    height={500}
                                    src={process.env.REACT_APP_API_URL + book.img}
                                    style={{
                                        display: 'block',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        marginTop: '15px',
                                    }}
                                />
                                <h3 className="text-center">{book.price} ₽</h3>
                                <Button
                                    variant="outline-dark"
                                    onClick={add}
                                    style={{ display: 'block', margin: '0 auto', marginTop: '10px' }}
                                    onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                                    onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                                >
                                    Добавить в корзину
                                </Button>
                            </Card>
                        </Col>
                        <Col md={7}>
                            <Card style={{ padding: '15px', border: '2px solid lightgray', borderRadius: '10px', backgroundColor: '#e8e8e8' }}>
                                <h2 className="text-center" style={{ marginBottom: '5px' }}>{book.name}</h2>
                                <p className="text-center text-muted">{book.author}</p>
                                <p className="text-left" style={{ marginBottom: '5px' }}>
                                    <strong>Жанр:</strong> {getGenreById(book.genreId) || "Не указан"}
                                </p>
                                <p className="text-left">
                                    <strong>Издательство:</strong> {getPublisherById(book.publisherId) || "Не указано"}
                                </p>
                                <h4 className="mt-4">Информация</h4>
                                {book.info.map((info) => (
                                    <div
                                        key={info.id}
                                        style={{
                                            borderRadius: '5px',
                                            marginBottom: '5px'
                                        }}
                                    >
                                        <strong>{info.title}:</strong> {info.description}
                                    </div>
                                ))}
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    )
}

export default BookPage
