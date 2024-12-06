const {Publisher, Book} = require('../models/models')
const ApiError = require('../error/ApiError')

class PublisherController {

	async create(req, res) {
	    try {
	        const { name } = req.body;

	        const existingPublisher = await Publisher.findOne({ where: { name } });
	        if (existingPublisher) {
	            return res.status(400).json({ message: 'Издательство с таким названием уже существует.' });
	        }

	        const publisher = await Publisher.create({ name });

	        return res.json(publisher);
	    } catch (error) {
	        console.error(error);
	        return res.status(500).json({ message: 'Ошибка при создании издателя.' });
	    }
	}

	async getAll(req, res) {
		const publishers = await Publisher.findAll()
		
		return res.json(publishers)
	}

	async delete(req, res, next) {
	    try {
	        const { id } = req.params

	        const publisher = await Publisher.findByPk(id)
	        if (!publisher) {
	            return next(ApiError.notFound('Издательство с указанным ID не найдено.')) 
	        }

	        const relatedBooks = await Book.findAll({ where: { publisherId: id } })
	        if (relatedBooks.length > 0) {
	            return next(ApiError.badRequest('Издательство имеет связь с книгами, невозможно удалить.')) 
	        }

	        await Publisher.destroy({ where: { id } })
	        return res.json({ message: 'Издательство успешно удалено.' })

	    } catch (error) {
	        console.error(error);
	        return next(ApiError.internal('Ошибка при удалении издательства.')) 
	    }
	}
}

module.exports = new PublisherController()