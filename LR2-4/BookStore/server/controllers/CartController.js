const jwt = require('jsonwebtoken')
const {User, Book, CartBook, Purchase} = require("../models/models")
const ApiError = require('../error/ApiError')

class CartController {
    async addToCart(req, res, next) {
        const user = req.user
        const { bookId } = req.body
        const cart = await CartBook.create({ cartId: user.id, bookId })

        return res.json(cart)
    }

    async getCartUser(req, res) {
        const { id } = req.user
        const cart = await CartBook.findAll({ include: { model: Book }, where: { cartId: id } })

        return res.json(cart)
    }

    async deleteFromCart(req, res) {
        const { id } = req.params
        const dropCart = await CartBook.destroy({ where: { id } })

        return res.json(dropCart)
    }

    async purchaseCart(req, res, next) {
        try {
            const { id } = req.user

            const cartItems = await CartBook.findAll({ where: { cartId: id }, include: { model: Book } })

            const totalPrice = cartItems.reduce((sum, item) => sum + item.book.price, 0)

            const user = await User.findByPk(id)

            if (user.balance < totalPrice) {
                return next(ApiError.badRequest('Недостаточно средств для покупки')) 
            }

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i]

                await Purchase.create({
                    total: totalPrice,
                    date: new Date(),
                    userId: id, 
                    cartId: id,  
                    bookId: item.book.id
                });
            }

            user.balance -= totalPrice
            await user.save()
            await CartBook.destroy({ where: { cartId: id } })

            const newToken = jwt.sign(
                { id: user.id, email: user.email, role: user.role, balance: user.balance },
                process.env.SECRET_KEY,
                { expiresIn: '24h' }
            );

            return res.json({ token: newToken, balance: user.balance })

        } catch (e) {
            console.error(e)
            return next(ApiError.internal('Ошибка при покупке')); 
        }
    }
}

module.exports = new CartController()


