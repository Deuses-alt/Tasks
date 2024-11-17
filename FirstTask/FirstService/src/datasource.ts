import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Product } from "./entities/product";
import { Shop } from "./entities/shop";
import { Stock } from "./entities/stock";


dotenv.config();


export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Product, Stock, Shop],
});
