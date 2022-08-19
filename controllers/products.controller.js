
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

        const {title , description, price, quantity, categoryId} = req.body

        
    
         const product = await Product.create({
            title,
            description,
            price,
            quantity,
            categoryId,
            userId: userActive.id,
        })


        //Upload Images

        if(req.files.length > 0) {
            const filesPromises = req.files.map(async file => {
                const imgRef = ref(storage, `products/${Date.now()}_${file.originalname}`);
                const imgUpload = await uploadBytes(imgRef,file.buffer);
    
                return await ProductImg.create({
                productId: product.id,
                imgUrl: imgUpload.metadata.fullPath,
            });
            })
    
            await Promise.all(filesPromises);
        }
        
   
        
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
                {model:ProductImg, attributes:["imgUrl"]},
                {model:Category, attributes:["name"]},
              
            ]   

        
        })

        //Map Async

        
       
            const productImgsPromises = product.productImgs.map(async productImg => {
                const imgRef = ref(storage, productImg.imgUrl);
                const imgUrlNice = await getDownloadURL(imgRef)
                productImg.imgUrl = imgUrlNice;
            })
            await Promise.all(productImgsPromises);
            
       
       

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