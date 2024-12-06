import Admin from './pages/Admin'
import Cart from './pages/Cart'
import Auth from './pages/Auth'
import Shop from './pages/Shop'
import BookPage from './pages/BookPage'
import Purchases from './pages/Purchases'
import {ADMIN_ROUTE, CART_ROUTE, BOOK_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, PURCHASES_ROUTE} from './consts'

export const authRoutes = [
	{
		path: ADMIN_ROUTE,
		Component: Admin
	},
	{
		path: CART_ROUTE,
		Component: Cart
	},
	{
		path: PURCHASES_ROUTE,
		Component: Purchases
	}
]

export const publicRoutes = [
	{
		path: SHOP_ROUTE,
		Component: Shop
	},
	{
		path: LOGIN_ROUTE,
		Component: Auth
	},
	{
		path: REGISTRATION_ROUTE,
		Component: Auth
	},
	{
		path: BOOK_ROUTE + '/:id',
		Component: BookPage
	}
]

