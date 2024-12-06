const {Purchase, Book} = require('../models/models');
const ApiError = require('../error/ApiError'); 

class PurchasesController {
    async fetchPurchases(req, res, next) {
        try {
            const { id } = req.user 
            const purchases = await Purchase.findAll({
                where: { userId: id },
                include: { model: Book }, 
                order: [['date', 'DESC']], 
            });

            if (!purchases || purchases.length === 0) {
                return next(ApiError.notFound('Покупки не найдены')) 
            }

            return res.json(purchases)
        } catch (err) {
            console.error(err)
            return next(ApiError.internal('Ошибка при получении покупок')) 
        }
    }
}

module.exports = new PurchasesController()
