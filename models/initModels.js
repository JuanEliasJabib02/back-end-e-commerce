// Aqui se hace las relaciones

//Models
const { Cart } = require('../models/carts.model');
const { Category } = require('../models/categories.model');
const { Order } = require('../models/orders.model');
const { ProductImg } = require('../models/productImgs.model');
const { Product} = require('../models/products.model');
const { ProductInCart } = require('../models/productsInCart.model');
const { User } = require('../models/users.model');

const initModels = () => {

     // 1 User <--> M Product
  User.hasMany(Product);
  Product.belongsTo(User);

  // 1 User <--> M Order
  User.hasMany(Order);
  Order.belongsTo(User);

  // 1 User <--> 1 Cart
  User.hasOne(Cart);
  Cart.belongsTo(User);

  // 1 Product <--> M ProductImg
  Product.hasMany(ProductImg);
  ProductImg.belongsTo(Product);

  // 1 Category <--> 1 Product
  Category.hasOne(Product);
  Product.belongsTo(Category);

  // 1 Cart <--> M ProductInCart
  Cart.hasMany(ProductInCart);
  ProductInCart.belongsTo(Cart);

  // 1 Product <--> 1 ProductInCart
  Product.hasOne(ProductInCart);
  ProductInCart.belongsTo(Product);

  // 1 Order <--> 1 Cart
  Cart.hasOne(Order);
  Order.belongsTo(Cart);

};
   




module.exports = { initModels};