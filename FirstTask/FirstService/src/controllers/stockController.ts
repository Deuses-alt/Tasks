import { Request, Response } from 'express';
import { StockService } from '../services/stockService';

const stockService = new StockService();

export class StockController {
  static async createStock(req: Request, res: Response): Promise<Response> {
    const { quantityOnShelf, quantityInOrder, productId, shopId } = req.body;
    try {
      const stock = await stockService.createStock(
        quantityOnShelf,
        quantityInOrder,
        productId,
        shopId
      );
      return res.status(201).json(stock);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async increaseStock(req: Request, res: Response): Promise<Response> {
    const { stockId, quantity } = req.body;
    try {
      const stock = await stockService.increaseStock(stockId, quantity);
      return res.json(stock);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async decreaseStock(req: Request, res: Response): Promise<Response> {
    const { stockId, quantity } = req.body;
    try {
      const stock = await stockService.decreaseStock(stockId, quantity);
      return res.json(stock);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async getStocks(req: Request, res: Response): Promise<Response> {
    const { plu, shopId, quantityOnShelfFrom, quantityOnShelfTo, quantityInOrderFrom, quantityInOrderTo } = req.query;
  
    try {
      const parsedShopId = shopId ? parseInt(shopId as string, 10) : undefined;
      const parsedQuantityOnShelfFrom = quantityOnShelfFrom ? parseInt(quantityOnShelfFrom as string, 10) : undefined;
      const parsedQuantityOnShelfTo = quantityOnShelfTo ? parseInt(quantityOnShelfTo as string, 10) : undefined;
      const parsedQuantityInOrderFrom = quantityInOrderFrom ? parseInt(quantityInOrderFrom as string, 10) : undefined;
      const parsedQuantityInOrderTo = quantityInOrderTo ? parseInt(quantityInOrderTo as string, 10) : undefined;
  
      const stocks = await stockService.getStocksByFilter(
        plu as string,
        parsedShopId,
        parsedQuantityOnShelfFrom,
        parsedQuantityOnShelfTo,
        parsedQuantityInOrderFrom,
        parsedQuantityInOrderTo
      );
  
      return res.json(stocks);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  
}
