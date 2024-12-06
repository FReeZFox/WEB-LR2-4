import React, {useState, useContext} from 'react'
import {Container, Form, Button, Row, Card, Col} from 'react-bootstrap'
import {NavLink, useLocation, useNavigate} from 'react-router-dom'
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from '../consts'
import {login, registration} from '../http/UserAPI'
import {Context} from '../index'
import BackAuth from '../assets/BackAuth.png'
import EyeIcon from '../assets/EyePasswordOpen.png'
import EyeClosedIcon from '../assets/EyePasswordClose.png'

const Auth = () => {
    const { user } = useContext(Context)
    const history = useNavigate()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false)

    const click = async () => {
        try { 
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            history(SHOP_ROUTE)
        } catch (e) {
            setError(e.response?.data?.message || 'Произошла ошибка')
        }
    }

    const isButtonDisabled = !email || !password

    return (
        <div
            className='img-fluid shadow-4'
            style={{
                backgroundImage: `url(${BackAuth})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh', 
                width: '100vw',
                position: 'fixed',
            }}
        >
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{
                    height: window.innerHeight - 54
                }}
            >
                <Card style={{ width: 500, backgroundColor: '#f0f0f0' }} className="p-4">
                    <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className="mt-3"
                            placeholder="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <div className="position-relative mt-3">
                            <Form.Control
                                placeholder="Пароль"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                            />
                            <img
                                src={showPassword ? EyeIcon : EyeClosedIcon}
                                alt="Toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '10px',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    width: '25px',
                                    height: '25px',
                                }}
                            />
                        </div>
                        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            {isLogin ? (
                                <Col>
                                    <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
                                </Col>
                            ) : (
                                <Col>
                                    <NavLink to={LOGIN_ROUTE}>Вход в аккант</NavLink>
                                </Col>
                            )}
                            <Col className="text-end">
                                <Button
                                    variant={"secondary"}
                                    onClick={click}
                                    disabled={isButtonDisabled}
                                    onMouseDown={(e) => (e.target.style.transform = 'scale(0.9)')}
                                    onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                                >
                                    {isLogin ? 'Войти' : 'Регистрация'}
                                </Button>
                            </Col>
                            {error && <div style={{ color: 'red' }}>{error}</div>}
                        </Row>
                    </Form>
                </Card>
            </Container>
        </div>
    )
}

export default Auth
