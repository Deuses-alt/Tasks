import { Router } from 'express';
import { StockController } from '../controllers/stockController';

const router = Router();

router.post('/', StockController.createStock as any);
router.put('/increase', StockController.increaseStock as any);
router.put('/decrease', StockController.decreaseStock as any);
router.get('/', StockController.getStocks as any);

export default router;
