const { db, DataTypes } = require('../utils/db.util.js');

const Product = db.define('product',{
    id:{
        unique:true,
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
    },
    title:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull:false,
    },
    categoryId:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    status:{
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue:"avalaible"
    },
})

module.exports = { Product }