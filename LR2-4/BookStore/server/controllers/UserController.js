const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Cart} = require('../models/models')

const generateJwt = (id, email, role, balance) => {
	return jwt.sign({id, email, role, balance}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class UserController {

	async registration(req, res, next) {
		const {email, password, role, balance} = req.body

		if (!email || !password) {
			return next(ApiError.badRequest('Некорректный email или пароль.'))
		}

		const candidate = await User.findOne({where: {email}})
		if (candidate) {
			return next(ApiError.unauthorized('Пользователь с таким email уже существует.'))
		}

		const hashPassword = await bcrypt.hash(password, 5)
		const user = await User.create({email, role, balance, password: hashPassword})
		const cart = await Cart.create({userId: user.id})
		const token = generateJwt(user.id, user.email, user.role, user.balance)

		return res.json({token})
	}

	async login(req, res, next) {
		const {email, password} = req.body

		const user = await User.findOne({where: {email}})
		if (!user) {
			return next(ApiError.unauthorized('Пользователь с таким email не найден.'))
		}

		let comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) {
			return next(ApiError.badRequest('Указан неверный пароль.'))
		}

		const token = generateJwt(user.id, user.email, user.role, user.balance)

		return res.json({token})
	}

	async check(req, res, next) {
		const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.balance)

		return res.json({token})
	}
}

module.exports = new UserController()