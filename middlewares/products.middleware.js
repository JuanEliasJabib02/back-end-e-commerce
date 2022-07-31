const { Product } = require("../models/products.model");
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");


const productExists = catchAsync(
    async (req,res,next) => {
        
        const {id} = req.params; 
      

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

module.exports = { productExists }