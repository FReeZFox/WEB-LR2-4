import React, {useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {Button} from 'react-bootstrap'
import {jwtDecode} from 'jwt-decode'
import {Context} from '../index'
import {ADMIN_ROUTE} from '../consts'

const AdminButton = ({ activeButton, setActiveButton }) => {
    const { user } = useContext(Context)
    const navigate = useNavigate()
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const decoded = jwtDecode(token)
                setIsAdmin(decoded.role === 'ADMIN')
            } catch (e) {
                console.error("Ошибка при декодировании токена:", e)
                setIsAdmin(false);
            }
        } else {
            setIsAdmin(false)
        }
        
    }, [user])

    const handleClick = () => {
        setActiveButton('admin')
        navigate(ADMIN_ROUTE)
    };

    return (
        <>
            {isAdmin && (
                <Button
                    variant={activeButton === 'admin' ? 'light' : 'outline-light'}
                    onClick={handleClick}
                    style={{
                        margin: '0 3px',
                        padding: '6px 12px',
                    }}
                    onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                    onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                >
                    Редактирование
                </Button>
            )}
        </>
    );
};

export default AdminButton
