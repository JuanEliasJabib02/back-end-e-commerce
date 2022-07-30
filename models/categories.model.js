const { db , DataTypes } = require('../utils/db.util');


const Category = db.define('category',{
    id:{
        primaryKey:true,
        unique:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    status:{
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue:"active",
    },
});

module.exports = { Category }