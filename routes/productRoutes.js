import express from 'express';
import { Product } from '../models/product.js';  //con sequelize
import redisClient from '../redis.js'; //con redis

const router = express.Router();

// GET únicamente con sequelize
// router.get('/', async (req, res) => {
//     try {
//         const products = await Product.findAll();
//         res.json(products);
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

router.get('/', async (req, res) => {

    try {
        const cachekey = 'products:all';
        const cachedProducts = await redisClient.get(cachekey);

        if (cachedProducts) {
            console.log('Returning cached products');
            return res.json(JSON.parse(cachedProducts));
        }

        const products = await Product.findAll();
        await redisClient.set(cachekey, JSON.stringify(products), {
            EX: 1800
        });
        res.json(products);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST únicamente con sequelize
// router.post('/', async (req, res) => {
//     const { name, description, price } = req.body;

//     try {
//         const product = await Product.create({ name, description, price });
//         res.status(201).json(product);
//     } catch (error) {
//         console.error('Error creating product:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
router.post('/', async (req, res) => {
    const { name, description, price } = req.body;

    try {
        // Eliminar caché antes de crear un nuevo producto
        await redisClient.del('products:all'); 
        // Creamos el nuevo producto
        const product = await Product.create({ name, description, price });
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        product.name = name;
        product.description = description;
        product.price = price;
        await product.save();
        res.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await product.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;