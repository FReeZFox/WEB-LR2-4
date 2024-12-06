import React, {useContext, useEffect, useRef, useState} from 'react'
import {Container, Navbar, Nav, Button, Spinner} from 'react-bootstrap'
import {NavLink, useNavigate, useLocation} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import {jwtDecode} from 'jwt-decode' 
import {SHOP_ROUTE, LOGIN_ROUTE, CART_ROUTE, PURCHASES_ROUTE, ADMIN_ROUTE} from '../consts'
import {Context} from '../index'
import {check} from '../http/UserAPI'
import AdminButton from './AdminButton'
import BackNavBar from '../assets/BackNavBar.png'
import BookLogo from '../assets/BookLogo.png'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const navRef = useRef(null)
    const location = useLocation()
    const [isOverflowing, setIsOverflowing] = useState(false) 
    const [userData, setUserData] = useState({email: "", balance: 0})
    const [activeButton, setActiveButton] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName)
    }

    const scrollNav = (direction) => {
        if (navRef.current) {
            const scrollAmount = 150 
            navRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            })
        }
    }

    const checkOverflow = () => {
        if (navRef.current) {
            setIsOverflowing(navRef.current.scrollWidth > navRef.current.clientWidth)
        }
    }

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        setUserData({ email: "", balance: 0 })
        navigate(SHOP_ROUTE)
    }

    useEffect(() => {
        switch (location.pathname) {
            case ADMIN_ROUTE:
                setActiveButton('admin')
                break
            case CART_ROUTE:
                setActiveButton('cart')
                break
            case PURCHASES_ROUTE:
                setActiveButton('purchases')
                break
            default:
                setActiveButton('')
        }

        const fetchUserData = async () => {
            setIsLoading(true)
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    setUserData((prevState) => ({
                        ...prevState,
                        email: decodedToken.email,
                    }))
                    const decoded = await check();
                    user.setIsAuth(true)
                    setUserData((prevState) => ({
                        ...prevState,
                        balance: decoded.balance || 0,
                    }))
                } catch (e) {
                    user.setIsAuth(false)
                }
            } else {
                user.setIsAuth(false)
                setUserData({ email: "", balance: 0 })
            }
            await new Promise((resolve) => setTimeout(resolve, 10))
            setIsLoading(false)
        }

        fetchUserData()
        checkOverflow()

        const observer = new MutationObserver(() => {
            checkOverflow() 
        })

        if (navRef.current) {
            observer.observe(navRef.current, { childList: true, subtree: true })
        }

        window.addEventListener('resize', checkOverflow)

        return () => {
            window.removeEventListener('resize', checkOverflow)
        }
    }, [user, user.isAuth, location.pathname])

    return (
        <Navbar
            variant="light"
            style={{
                backgroundImage: `url(${BackNavBar})`,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                height: '50px',
            }}
        >
            <Container className="d-flex align-items-center">
                {isLoading ? (
                    <Spinner
                        animation="grow"
                        variant="light"
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '25%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1000,
                        }}
                    />
                ) : (
                    <>
                        <NavLink
                            className="d-flex align-items-center"
                            style={{
                                textDecoration: 'none',
                                color: 'whitesmoke',
                                fontSize: 28,
                                marginRight: '15px',
                            }}
                            to={SHOP_ROUTE}
                            onClick={handleButtonClick}
                        >
                            <img
                                src={BookLogo}
                                alt="logo"
                                style={{
                                    width: '35px',
                                    height: '35px',
                                    marginRight: '2px',
                                }}
                            />
                            BookStore
                        </NavLink>
                        {isOverflowing && (
                            <Button
                                variant="outline-light"
                                className="d-none d-md-block mr-2"
                                style={{
                                    margin: '0 3px',
                                    transition: 'background-color 0.2s ease-in-out',
                                    padding: '6px 10px',
                                }}
                                onClick={() => scrollNav('left')}
                                onMouseDown={(e) => (e.target.style.transform = 'scale(0.9)')}
                                onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                            >
                                ❮
                            </Button>
                        )}
                        <div
                            ref={navRef}
                            className="d-flex flex-nowrap overflow-auto"
                            style={{
                                maxWidth: '70%',
                                whiteSpace: 'nowrap',
                                scrollbarWidth: 'none',
                            }}
                        >
                            {user.isAuth ? (
                                <Nav className="d-flex align-items-center">
                                    <span
                                        style={{
                                            marginRight: '15px',
                                            color: 'white',
                                            fontSize: '16px',
                                        }}
                                    >
                                        {userData.email}
                                        <br />
                                        Баланс: {userData.balance} ₽
                                    </span>
                                    <AdminButton activeButton={activeButton} setActiveButton={handleButtonClick} />
                                    <Button
                                        variant={activeButton === 'purchases' ? 'light' : 'outline-light'}
                                        className="mr-2"
                                        style={{
                                            margin: '0 3px',
                                            padding: '6px 12px',
                                        }}
                                        onClick={() => {
                                            navigate(PURCHASES_ROUTE);
                                            handleButtonClick('purchases')
                                        }}
                                        onMouseDown={(e) => (e.target.style.transform = 'scale(0.9)')}
                                        onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                                    >
                                        Купленные товары
                                    </Button>
                                    <Button
                                        variant={activeButton === 'cart' ? 'light' : 'outline-light'}
                                        className="mr-2"
                                        style={{
                                            margin: '0 3px',
                                            padding: '6px 12px',
                                        }}
                                        onClick={() => {
                                            navigate(CART_ROUTE);
                                            handleButtonClick('cart')
                                        }}
                                        onMouseDown={(e) => (e.target.style.transform = 'scale(0.9)')}
                                        onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                                    >
                                        Корзина
                                    </Button>
                                    <Button
                                        variant="outline-light"
                                        className="ml-2"
                                        style={{
                                            margin: '0 3px',
                                            padding: '6px 12px',
                                        }}
                                        onClick={() => {
                                            logOut();
                                            handleButtonClick('logout')
                                        }}
                                        onMouseDown={(e) => (e.target.style.transform = 'scale(0.9)')}
                                        onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                                    >
                                        Выйти
                                    </Button>
                                </Nav>
                            ) : (
                                <Nav>
                                    <Button
                                        variant="outline-light"
                                        onClick={() => {
                                            navigate(LOGIN_ROUTE);
                                            handleButtonClick('login')
                                        }}
                                        onMouseDown={(e) => (e.target.style.transform = 'scale(0.9)')}
                                        onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                                    >
                                        Авторизация
                                    </Button>
                                </Nav>
                            )}
                        </div>
                        {isOverflowing && (
                            <Button
                                variant="outline-light"
                                className="d-none d-md-block ml-2"
                                onClick={() => scrollNav('right')}
                                onMouseDown={(e) => (e.target.style.transform = 'scale(0.9)')}
                                onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                            >
                                ❯
                            </Button>
                        )}
                    </>
                )}
            </Container>
        </Navbar>
    )
})

export default NavBar


