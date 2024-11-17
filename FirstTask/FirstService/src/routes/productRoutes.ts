import { Router } from 'express';
import { ProductController } from '../controllers/productController';

const router = Router();

router.post('/', ProductController.createProduct as any);
router.get('/', ProductController.getProducts as any);

export default router;
