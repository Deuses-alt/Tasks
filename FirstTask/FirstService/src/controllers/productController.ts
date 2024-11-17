import { Request, Response } from 'express';
import { ProductService } from '../services/productService';

const productService = new ProductService();

export class ProductController {
  static async createProduct(req: Request, res: Response): Promise<Response> {
    const { plu, name } = req.body;
    try {
      const product = await productService.createProduct(plu, name);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async getProducts(req: Request, res: Response): Promise<Response> {
    const { plu, name } = req.query;
    try {
      const products = await productService.getProductsByFilter(plu as string, name as string);
      return res.json(products);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
