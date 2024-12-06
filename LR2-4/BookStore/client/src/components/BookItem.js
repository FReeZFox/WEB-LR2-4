import React, {useContext} from 'react'
import { Card, Col, Image, Button} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {BOOK_ROUTE} from '../consts'
import {Context} from '../index'
import {addToCart} from "../http/CartAPI"
import CartIcon from '../assets/CartIcon.png'

const BookItem = ({ book }) => {
    const history = useNavigate()
    const { user } = useContext(Context)

    const add = async (event) => {
        event.stopPropagation()
        if (!user.isAuth) {
            alert('Вы не авторизованы. Пожалуйста, войдите в аккаунт, чтобы добавить товар в корзину.')
            return
        }

        try {
            const formData = new FormData()
            formData.append('bookId', book.id)
            await addToCart(formData)
            alert(`Товар "${book.name}" был добавлен в вашу корзину!`)
        } catch (e) {
            alert(e.response?.data?.message || 'Ошибка при добавлении товара в корзину.')
        }
    }

    return (
        <Col md={3} className="mt-3">
            <Card
                style={{
                    width: '100%',
                    cursor: 'pointer',
                    border: '3px solid white',
                    height: '100%',
                    paddingBottom: '15px',
                    backgroundColor: '#e8e8e8' 
                }}
                border={'light'}
                onClick={() => history(BOOK_ROUTE + '/' + book.id)}
            >
                <Image
                    width={150}
                    height={210}
                    src={process.env.REACT_APP_API_URL + book.img}
                    style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '15px', 
                    }}
                />
                
                <div style={{ borderBottom: '3px solid white', marginTop: '10px' }}></div>
                
                <div className="mt-2 d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column" style={{ paddingLeft: '15px' }}>
                        <div>{book.name}</div>
                        <div className="text-black-50">{book.author}</div>
                    </div>
                    <div className="d-flex flex-column align-items-end" style={{ paddingRight: '15px' }}>
                        <div>{book.price} ₽</div>
                        <Button
                            alt='cart'
                            variant="light"
                            onClick={(event) => add(event)}
                            style={{
                                backgroundImage: `url(${CartIcon})`,
                                backgroundSize: 'contain',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                            }}
                            onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                            onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                        />
                    </div>
                </div>
            </Card>
        </Col>
    )
}

export default BookItem
