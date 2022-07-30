const {db, DataTypes} = require('../utils/db.util.js');

const Cart = db.define('cart',{
    id:{
        autoIncrement:true,
        allowNull:null,
        unique:true,
        type: DataTypes.INTEGER,
        primaryKey:true,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull:null,
    },
    status:{
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue:"active"
    },
})

module.exports = { Cart }