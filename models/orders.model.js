const { db, DataTypes } = require('../utils/db.util.js');
    
const Order = db.define('order',{

    id:{
        primaryKey:true,
        unique:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false
    },
    userId:{ // Este valor funciona como una foreight key 
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    cartId:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    totalPrice:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull:false,
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"active"
    },

})

module.exports = { Order }