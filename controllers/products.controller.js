
const { ref, uploadBytes, getDownloadURL} = require('firebase/storage');
//Models 

const { Category } = require('../models/categories.model');
const { Product } = require('../models/products.model');
const { User } = require('../models/users.model');
const { ProductImg } = require('../models/productImgs.model');

//Utils
const { catchAsync } = require("../utils/catchAsync");
const { storage } = require("../utils/firebase.util");

const newProduct = catchAsync(
    async (req,res,next) => {

        const { userActive } = req;

        const {title , description, price, quantity, categoryId} =req.body

        const imgRef = ref(storage, `products/${Date.now()}_${req.file.originalname}`)

        const imgUpload = await uploadBytes(imgRef, req.file.buffer)
    
         const product = await Product.create({
            title,
            description,
            price,
            quantity,
            categoryId,
            userId: userActive.id,
        })

        const url = await ProductImg.create({
            productId: product.id,
            imgUrl: imgUpload.metadata.fullPath,
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
            include:[
                { model: Category, attributes: ['name']},
                { model: User, attributes:['username', "email"]}
            ]
        })

        res.status(200).json({
            status:"succes",
            products
        })
    }
);

const getProductById = catchAsync(
    async (req,res,next) => {

        const { id } = req.params

        const product = await Product.findOne({
            where:{
                status:"avalaible",
                id
            },
            attributes:["id","title","description","price","status"],

            

            include:[
                {model:ProductImg},
                {model:Category, attributes:["name"]},
              
            ]   

        
        })

        const imgRef = ref(storage, product.productImgs[0].imgUrl);

        const imgUrlNice = await getDownloadURL(imgRef)

        product.productImgs[0].imgUrl = imgUrlNice;


       res.status(200).json({
            status:"sucess",
            product
       })
    }
);

const updateProduct = catchAsync(
    async (req,res,next) => {

        const { product}  =req;

        const { newName } = req.body;
        
        await product.update({
            title: newName
        })

        res.status(200).json({
            status:"succes"
        })
    }
);

const deleteProduct = catchAsync(
    
    async (req,res,next) => {
        //soft delete
        const { product } = req;

        console.log( product )

        await product.update({
            status:"removed"
        })

        res.status(200).json({
            status:"succes"
        })
    }
);


module.exports = {
    newProduct,getProducts,getProductById,updateProduct,deleteProduct
}