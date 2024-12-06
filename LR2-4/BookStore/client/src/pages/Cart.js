import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row, Image, Spinner } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import { observer } from 'mobx-react-lite'
import { fetchOneBook } from '../http/BookAPI'
import { SHOP_ROUTE } from '../consts'
import { deleteFromCart, getCart, purchaseCart } from '../http/CartAPI'

const Cart = observer(() => {
    const [cartItems, setCartItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const history = useNavigate();

    useEffect(() => {
        const fetchCartData = async () => {
            setIsLoading(true)
            try {
                const cart = await getCart();
                const booksWithDetails = await Promise.all(
                    cart.map(async (item) => {
                        const bookData = await fetchOneBook(item.bookId)
                        return { ...item, book: bookData }
                    })
                );
                setCartItems(booksWithDetails);
            } catch (e) {
                console.error("Ошибка загрузки корзины:", e)
            }
            setIsLoading(false)
        };

        fetchCartData()
    }, []);

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.book?.price || 0), 0)

    const dropBook = (id) => {
        deleteFromCart(id).then(() => {
            setCartItems((prev) => prev.filter((item) => item.id !== id))
        })
    }

    const handlePurchase = async () => {
        try {
            const { token, balance } = await purchaseCart()
            localStorage.setItem('token', token)
            alert(`Покупка успешно завершена. Ваш новый баланс: ${balance} ₽.`)
            setCartItems([])
            history(SHOP_ROUTE)
            window.location.reload()
        } catch (e) {
            alert(e.response?.data?.message || 'Ошибка при покупке')
        }
    }

    return (
        <div style={{ background: 'linear-gradient(259deg, #1a1e28,#3b3b33,#ab9462)', minHeight: '95vh' }}>
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '95vh' }}>
                    <Spinner animation="grow" variant="light" />
                </div>
            ) : (
                <Container className="d-flex flex-column justify-content-center align-items-center mt-2">
                    <h1 className="pb-2 text-white">Корзина</h1>

                    <Card className="d-flex flex-row p-3 justify-content-between align-items-center mb-3 w-100" style={{backgroundColor: '#e8e8e8'}}>
                        <div className="d-flex align-items-center">
                            <h2 className="m-0">Итого:</h2>
                            <h3 className="m-0 ml-2">{totalPrice} ₽</h3>
                        </div>
                        <Button
                            variant="success"
                            onClick={handlePurchase}
                            disabled={cartItems.length === 0}
                            onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                            onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                        >
                            Купить
                        </Button>
                    </Card>

                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <Card className="d-flex w-100 p-2 justify-content-center mb-2" key={item.id} style={{backgroundColor: '#e8e8e8'}}>
                                <Row className="d-flex w-100 align-items-center">
                                    <Col md={2} className="d-flex justify-content-center">
                                        <Image src={process.env.REACT_APP_API_URL + item.book?.img} width={80} height={80} />
                                    </Col>
                                    <Col md={6}>
                                        <h4>{item.book?.name || 'Нет данных'}</h4>
                                        <p className="text-muted" style={{ marginBottom: '0' }}>{item.book?.author || 'Неизвестный автор'}</p>
                                    </Col>
                                    <Col md={2} className="d-flex justify-content-center">
                                        <h4 className="m-0">{item.book?.price || 0} ₽</h4>
                                    </Col>
                                    <Col md={2} className="d-flex justify-content-center">
                                        <Button 
                                            variant="outline-danger" 
                                            onClick={() => dropBook(item.id)}
                                            onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                                            onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                                        >
                                            Удалить
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        ))
                    ) : (
                        <h3 className="text-white">Корзина пуста</h3>
                    )}
                </Container>
            )}
        </div>
    )
})

export default Cart
