import { Product } from "../entities/product";
import { AppDataSource } from "../datasource";
import axios from "axios";

export class ProductService {
  private productRepository = AppDataSource.getRepository(Product);

  async createProduct(plu: string, name: string): Promise<Product> {
    const product = this.productRepository.create({ plu, name });
    axios.post("http://localhost:3001/api/logs", {
      action: "CreateProduct",
      payload: {
        plu,
      },
    });
    return this.productRepository.save(product);
  }

  async getProductsByFilter(plu?: string, name?: string): Promise<Product[]> {
    const query = this.productRepository.find({
      where: {
        plu: plu,
        name: name,
      },
    });
    axios.post("http://localhost:3001/api/logs", {
      action: "CreateProduct",
      payload: {
        plu,
      },
    });

    return query;
  }
}
