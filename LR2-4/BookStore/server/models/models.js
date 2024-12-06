const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    balance: { type: DataTypes.INTEGER, defaultValue: 0 } 
})

const Cart = sequelize.define('cart', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const CartBook = sequelize.define('cart_book', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const Book = sequelize.define('book', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    author: { type: DataTypes.STRING, unique: false, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false }
})

const Genre = sequelize.define('genre', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Publisher = sequelize.define('publisher', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const BookInfo = sequelize.define('book_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false }
})

const GenrePublisher = sequelize.define('genre_publisher', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const Purchase = sequelize.define('purchase', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    total: { type: DataTypes.INTEGER, allowNull: false }, 
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }, 
})

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.hasMany(CartBook)
CartBook.belongsTo(Cart)

Genre.hasMany(Book)
Book.belongsTo(Genre)

Publisher.hasMany(Book)
Book.belongsTo(Publisher)

Book.hasMany(CartBook)
CartBook.belongsTo(Book)

Book.hasMany(BookInfo, { as: 'info' })
BookInfo.belongsTo(Book);

Genre.belongsToMany(Publisher, { through: GenrePublisher })
Publisher.belongsToMany(Genre, { through: GenrePublisher })

User.hasMany(Purchase)
Purchase.belongsTo(User)

Cart.hasMany(Purchase)
Purchase.belongsTo(Cart)

Book.hasMany(Purchase);
Purchase.belongsTo(Book)

module.exports = {
    User,
    Cart,
    CartBook,
    Book,
    Genre,
    Publisher,
    GenrePublisher,
    BookInfo,
    Purchase
};
