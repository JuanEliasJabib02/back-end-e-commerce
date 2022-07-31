
//Models 

const { Category } = require('../models/categories.model');
const { Product } = require('../models/products.model');
const { User } = require('../models/users.model');

//Utils
const { catchAsync } = require("../utils/catchAsync");

const { AppError } = require('../utils/appError')


const newCategory = catchAsync(
    async (req,res,next) => {
        
        const { name  } = req.body

        if (name.length === 0) {
            return next(new AppError('Name cannot be empty', 400));
        }

        const category = await Category.create({
            name,
        })  

        res.status(201).json({
            status:"succes",
            category
        })

    }
);



const getCategories = catchAsync(
    async (req,res,next) => {

        const categories = await Category.findAll({
            where:{
                status:"active"
            },
            attributes: ["name","id",],
        })

       
        res.status(200).json({
            status:"succes",
            categories
        })
    }
);

const updateCategory = catchAsync(
    async (req,res,next) => {
        //Only name

        const {newName} = req.body;

        if (newName.lengt === 0) {
            return next ( new AppError('name cant be empty'),400)
            
        }
        const {id} = req.params;

        const category = await Category.findOne({
            where:{
                status:"active",
                id           }
        })

        if (!category) {
            return next( new AppError('Category does not exist with given id'), 404)
        }

        await category.update({
            name: newName
        })

        res.status(200).json({
            status:"succes"
        })
    }
);


module.exports = {
    newCategory,getCategories,updateCategory,
}