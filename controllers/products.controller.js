

//Models 

const { Category } = require('../models/categories.model');
const { Product } = require('../models/products.model');
const { User } = require('../models/users.model');

//Utils
const { catchAsync } = require("../utils/catchAsync");


const newProduct = catchAsync(
    async (req,res,next) => {

        const { userActive } = req;

        const {title , description, price, quantity, categoryId} =req.body

        const product = await Product.create({
            title,
            description,
            price,
            quantity,
            categoryId,
            userId: userActive.id,

            attributes:["title","description","price","quantity"]
        })

        res.status(201).json({
            status:"succes",
            product,
        })
    }
);
const getProducts = catchAsync(
    async (req,res,next) => {
        // Solo los que tienen status alive

        const products = await Product.findAll({
            where:{
                status:"avalaible"
            },
            attributes:["id","title","description","quantity","price"],
            include:[{
                model: Category
            }]
        })

        res.status(200).json({
            status:"succes",
            products
        })
    }
);

const getProductById = catchAsync(
    async (req,res,next) => {
        

    }
);

const updateProduct = catchAsync(
    async (req,res,next) => {
        

    }
);

const deleteProduct = catchAsync(
    async (req,res,next) => {
        

    }
);


module.exports = {
    newProduct,getProducts,getProductById,updateProduct,deleteProduct
}