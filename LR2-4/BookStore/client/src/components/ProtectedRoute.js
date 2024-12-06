import React from 'react'
import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token')

    if (!token) {
        return <Navigate to="/" replace />
    }

    try {
        const decoded = jwtDecode(token)

        if (decoded.role !== 'ADMIN') {
            return <Navigate to="/" replace />
        }

        return children
    } catch (e) {
        console.error('Ошибка при декодировании токена:', e)
        return <Navigate to="/" replace />
    }
};

export default ProtectedRoute
