const uuid = require('uuid')
const path = require('path')
const {Book, BookInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class BookController {
	async create(req, res, next) {
	    try {
	        let { name, author, price, publisherId, genreId, info } = req.body

	        const existingBook = await Book.findOne({ where: { name } })
	        if (existingBook) {
	            return res.status(400).json({ message: 'Книга с таким названием уже существует.' })
	        }

	        const { img } = req.files
	        let fileName = uuid.v4() + ".jpg"
	        img.mv(path.resolve(__dirname, '..', 'static', fileName))

	        const book = await Book.create({ name, author, price, publisherId, genreId, img: fileName })

	        if (info) {
	            info = JSON.parse(info)
	            info.forEach(i =>
	                BookInfo.create({
	                    title: i.title,
	                    description: i.description,
	                    bookId: book.id
	                })
	            )
	        }

	        return res.json(book)

	    } catch (e) {
	        next(ApiError.badRequest(e.message))
	    }
	}


	async getAll(req, res) {
		let {publisherId, genreId, minPrice, maxPrice, price} = req.query
		let books

		if (!publisherId && !genreId) {
			books = await Book.findAndCountAll({})
		}

		if (publisherId && !genreId) {
			books = await Book.findAndCountAll({where:{publisherId}})
		}

		if (!publisherId && genreId) {
			books = await Book.findAndCountAll({where:{genreId}})
		}

		if (publisherId && genreId) {
			books = await Book.findAndCountAll({where:{publisherId,genreId}})
		}

		return res.json(books)
	}

	async getOne(req, res) {
		const {id} = req.params
		const book = await Book.findOne(
			{
				where: {id},
				include: [{model: BookInfo, as: 'info'}]
			}
		)
		
		return res.json(book)
	}

	async delete(req, res, next) {
	    const {id} = req.params

	    try {
	        const book = await Book.findByPk(id);
	        if (!book) {
	            return next(ApiError.notFound('Книга с указанным ID не найдена.'))
	        }
	        await book.destroy();
	        return res.status(200).json({ message: 'Книга успешно удалена.' })
	    } catch (error) {
	        return next(ApiError.internal('Ошибка при удалении книги.'))
	    }
	}
}

module.exports = new BookController()