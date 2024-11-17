import express from 'express';
import productRoutes from './routes/productRoutes';
import stockRoutes from './routes/stockRoutes';
import { AppDataSource } from './datasource';

const app = express();
app.use(express.json());


app.use('/products', productRoutes);
app.use('/stocks', stockRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database');
    
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
