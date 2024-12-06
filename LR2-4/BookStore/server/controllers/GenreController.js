const {Genre, Book} = require('../models/models')
const ApiError = require('../error/ApiError')

class GenreController {

	async create(req, res) {
	    try {
	        const { name } = req.body

	        const existingGenre = await Genre.findOne({ where: { name } })
	        if (existingGenre) {
	            return res.status(400).json({ message: 'Жанр с таким названием уже существует.' })
	        }

	        const genre = await Genre.create({ name });

	        return res.json(genre);
	    } catch (error) {
	        console.error(error);
	        return res.status(500).json({ message: 'Ошибка при создании жанра.' })
	    }
	}

	async getAll(req, res) {
		const genres = await Genre.findAll()

		return res.json(genres)
	}

	async delete(req, res, next) {
	    try {
	        const { id } = req.params

	        const genre = await Genre.findByPk(id)
	        if (!genre) {
	            return next(ApiError.notFound('Жанр с указанным ID не найден.'))
	        }

	        const relatedBooks = await Book.findAll({ where: { genreId: id } })
	        if (relatedBooks.length > 0) {
	            return next(ApiError.badRequest('Жанр имеет связь с книгами, невозможно удалить.'))
	        }

	        await Genre.destroy({ where: { id } })
	        return res.status(200).json({ message: 'Жанр успешно удален.' })

	    } catch (error) {
	        console.error(error)
	        return next(ApiError.internal('Ошибка при удалении жанра.'))
	    }
	}



}

module.exports = new GenreController()