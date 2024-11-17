import { Stock } from "../entities/stock";
import { Product } from "../entities/product";
import { Shop } from "../entities/shop";
import { AppDataSource } from "../datasource";
import axios from "axios";

export class StockService {
  private stockRepository = AppDataSource.getRepository(Stock);
  private productRepository = AppDataSource.getRepository(Product);

  async createStock(
    quantityOnShelf: number,
    quantityInOrder: number,
    productId: number,
    shopId: number
  ): Promise<Stock> {
    const stock = this.stockRepository.create({
      quantityOnShelf,
      quantityInOrder,
      product: { id: productId } as Product,
      shop: { id: shopId } as Shop,
    });

    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
    });

    const newStock = await this.stockRepository.save(stock);
    axios.post("http://localhost:3001/api/logs", {
      action: "CreateStock",
      payload: {
        shopId,
        plu: product.plu,
      },
    });
    return newStock;
  }

  async increaseStock(stockId: number, quantity: number): Promise<Stock> {
    const stock = await this.stockRepository.findOne({
      where: {
        id: stockId,
      },
    });
    if (!stock) {
      throw new Error("Stock not found");
    }

    stock.quantityOnShelf += quantity;
    const newStock = await this.stockRepository.save(stock);
    axios.post("http://localhost:3001/api/logs", {
      action: "IncreaseStock",
      payload: {
        shopId: stock.shop.id,
        plu: stock.product.plu,
      },
    });
    return newStock;
  }

  async decreaseStock(stockId: number, quantity: number): Promise<Stock> {
    const stock = await this.stockRepository.findOne({
      where: {
        id: stockId,
      },
    });
    if (!stock) {
      throw new Error("Stock not found");
    }

    stock.quantityOnShelf -= quantity;
    const newStock = await this.stockRepository.save(stock);
    axios.post("http://localhost:3001/api/logs", {
      action: "DecreaseStock",
      payload: {
        shopId: stock.shop.id,
        plu: stock.product.plu,
      },
    });
    return newStock;
  }

  async getStocksByFilter(
    plu?: string,
    shopId?: number,
    quantityOnShelfFrom?: number,
    quantityOnShelfTo?: number,
    quantityInOrderFrom?: number,
    quantityInOrderTo?: number
  ): Promise<Stock[]> {
    const whereCondition: any = {
      plu: plu,
      shopId: shopId,
      quantityOnShelfFrom: quantityOnShelfFrom,
      quantityOnShelfTo: quantityOnShelfTo,
      quantityInOrderFrom: quantityInOrderFrom,
      quantityInOrderTo: quantityInOrderTo,
    };

    const stocks = await this.stockRepository.find({ where: whereCondition });
    axios.post("http://localhost:3001/api/logs", {
      action: "GetStocksByFilter",
      payload: {
        plu,
        shopId,
      },
    });
    return stocks;
  }
}
