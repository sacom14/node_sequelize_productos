import 'dotenv/config';
import express from 'express';
import productRouter from './routes/productRoutes.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

sequelize.sync().then(() => {
    app.use('/products', productRouter);

    app.listen(PORT, () => {
        console.log('Server is running on port 3000');
    });
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});
