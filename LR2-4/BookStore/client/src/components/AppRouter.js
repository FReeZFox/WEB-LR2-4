import React, {useContext} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import {authRoutes, publicRoutes} from '../routes'
import {SHOP_ROUTE, ADMIN_ROUTE} from "../consts"
import {Context} from '../index'

const AppRouter = () => {
    const { user } = useContext(Context)

    const token = localStorage.getItem('token')
    let userRole = null;
    if (token) {
        try {
            const decodedToken = jwtDecode(token)
            userRole = decodedToken.role
        } catch (e) {
            console.error("Ошибка при декодировании токена:", e);
        }
    }

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component }) => {
                if (path === ADMIN_ROUTE && userRole !== 'ADMIN') {
                    return null
                }
                return <Route key={path} path={path} element={<Component />} exact />;
            })}

            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}

            <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter
