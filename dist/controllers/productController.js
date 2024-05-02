import catchAsync from '../utils/catchAsync.js';
import { productValidationSchema, } from '../utils/validations/productValidation.js';
import { idValidationSchema } from '../utils/validations/idValidation.js';
import Product from '../models/productModel.js';
export const getAllProducts = catchAsync(async (req, res) => {
    const products = await Product.findAll();
    res.status(200).json({
        status: 'success',
        data: products,
    });
});
export const getProduct = catchAsync(async (req, res) => {
    await idValidationSchema.validate(req.params);
    const product = await Product.findByPk(req.params.id);
    res.status(200).json({
        status: 'success',
        data: product,
    });
});
export const createProduct = catchAsync(async (req, res) => {
    await productValidationSchema.validate(req.body);
    const product = await Product.create(req.body);
    res.status(200).json({
        status: 'success',
        data: product,
    });
});
