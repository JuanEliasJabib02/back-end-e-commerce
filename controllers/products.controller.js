

//Models 

const { Category } = require('../models/categories.model');
const { Product } = require('../models/products.model');

//Utils
const { catchAsync } = require("../utils/catchAsync");


const newCategory = catchAsync(
    async (req,res,next) => {
        
        const { name  } = req.body

        const category = await Category.create({
            name,
        })  

        res.status(200).json({
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
            include:[{
                model: Product,
                attributes:["title","price"]
            }]
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
    }
);
const newProduct = catchAsync(
    async (req,res,next) => {

        console.log("making product")

    }
);
const getProducts = catchAsync(
    async (req,res,next) => {
        // Solo los que tienen status alive

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
    newCategory,getCategories,updateCategory,
    newProduct,getProducts,getProductById,updateProduct,deleteProduct
}