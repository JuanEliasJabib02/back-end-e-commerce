const { db, DataTypes } = require('../utils/db.util.js');
    
const User = db.define('user',{

    id:{
        primaryKey:true,
        unique:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false
    },
    username:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    role:{
        type: DataTypes.STRING,
        defaultValue:"client",
        allowNull:true
    }

})

module.exports = { User }