import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProduct,
} from '../controllers/productController.js';

const router = Router();

router.route('/').get(getAllProducts).post(createProduct);
router.route('/:id').get(getProduct);

export default router;
