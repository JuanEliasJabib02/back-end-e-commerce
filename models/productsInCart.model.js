const { db , DataTypes } = require('../utils/db.util');


const productsInCar = db.define('productsInCar',{
    
    id:{
        allowNull:false,
        unique:true,
        autoIncrement:true,
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    cartId:{
        type :DataTypes.INTEGER,
        allowNull:false
    },
    productId:{
        type :DataTypes.INTEGER,
        allowNull:false
    },
    quantity:{
        type :DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type :DataTypes.STRING,
        allowNull:false,
        defaultValue:"active"
    },

});

module.exports = { productsInCar }