const { db , DataTypes } = require('../utils/db.util');


const ProductImg = db.define('productImg',{
    id:{
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        type: DataTypes.INTEGER,
    },
    productId:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    imgUrl:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    status:{
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue:"active"
    }

});

module.exports = { ProductImg }