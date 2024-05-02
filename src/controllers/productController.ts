import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync.js';
import {
  IProductValidation,
  productValidationSchema,
} from '../utils/validations/productValidation.js';
import { idValidationSchema } from '../utils/validations/idValidation.js';
import Product from '../models/productModel.js';

export const getAllProducts = catchAsync(
  async (req: Request, res: Response) => {
    const products = await Product.findAll();

    res.status(200).json({
      status: 'success',
      data: products,
    });
  }
);

export const getProduct = catchAsync(
  async (req: Request<{ id: string }>, res: Response) => {
    await idValidationSchema.validate(req.params);

    const product = await Product.findByPk(req.params.id);

    res.status(200).json({
      status: 'success',
      data: product,
    });
  }
);

export const createProduct = catchAsync(
  async (req: Request<any, any, IProductValidation>, res: Response) => {
    await productValidationSchema.validate(req.body);

    const product = await Product.create(req.body);

    res.status(200).json({
      status: 'success',
      data: product,
    });
  }
);
