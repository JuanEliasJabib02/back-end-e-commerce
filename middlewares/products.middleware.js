const { Product } = require("../models/products.model");
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");


const productExists = catchAsync(
    async (req,res,next) => {
        
        const { id } = req.params; 
      
        const product = await Product.findOne({
            where:{
                status:"avalaible",
                id,
            }
        })

        if (!product) {
            return next (new AppError('could not find product',404));
            
        }

        req.product = product;
        next();
    }
)


const productOwner = catchAsync(

    async (req,res,next) => {

        const { product } =req;

        const { userActive } = req;

        if (product.userId !== userActive.id) {
            return next(new AppError('This product dont belong to you'),400)
        }

        next();

    }
)

module.exports = { productExists , productOwner}