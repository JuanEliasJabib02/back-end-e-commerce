// Aqui se hace las relaciones

//Models
const { Cart } = require('../models/carts.model');
const { Category } = require('../models/categories.model');
const { Order } = require('../models/orders.model');
const { productImg } = require('../models/productImgs.model');
const { Product} = require('../models/products.model');
const { productsInCar } = require('../models/productsInCart.model');
const { User } = require('../models/users.model');

const initModels = () => {

    // 1 USER --> M ORDER
    User.hasMany(Order, { foreignKey: 'userId' });
	Order.belongsTo(User);
    // 1 USER --> 1 CART
    User.hasOne(Cart, { foreignKey: 'userId' });
	Cart.belongsTo(User);
    // 1 USER --> M PRODUCTS
    User.hasMany(Product, { foreignKey: 'userId' });
	Product.belongsTo(User);


    //1 Order --> 1 Cart
    Order.hasOne(Cart, {foreignKey: 'orderId'})
    Cart.belongsTo(Order);

    //1 Cart  ---> M productIncarts
    Cart.hasMany(productsInCar, {foreignKey:'cartId'})
    productsInCar.belongsTo(Cart);

    //Product ---> 1 Category
    Product.hasOne(Category, {foreignKey:'producId' })
    Category.belongsTo(Product);
    //Product --- > M productimgs
    Product.hasMany(productImg, {foreignKey:'productId'})
    productImg.belongsTo(Product);
    //Un producto solo puede estar 1 vez en el carro, Product ----> 1 productInCar
    Product.hasOne(Cart, {foreignKey:'cartId'})
    Cart.belongsTo(Product);


};


module.exports = { initModels};