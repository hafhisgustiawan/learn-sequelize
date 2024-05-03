import { Router } from 'express';
import { createProduct, getAllProducts, getProduct, validateProduct, } from '../controllers/productController.js';
const router = Router();
router.route('/').get(getAllProducts).post(validateProduct, createProduct);
router.route('/:id').get(getProduct);
export default router;
