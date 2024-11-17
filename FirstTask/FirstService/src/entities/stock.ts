import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product';
import { Shop } from './shop';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantityOnShelf: number;

  @Column()
  quantityInOrder: number;

  @ManyToOne(() => Product, (product) => product.stocks)
  product: Product;

  @ManyToOne(() => Shop, (shop) => shop.stocks)
  shop: Shop;
}
