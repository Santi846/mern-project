import express from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getProducts, getUniqueProduct, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';

const Productsrouter = express.Router();

//auth can be re used on different routes as middleware auth
Productsrouter.get('/Products', authRequired, getProducts);
Productsrouter.get('/Product/:id', authRequired, getUniqueProduct);
Productsrouter.post('/Product', authRequired, createProduct);
Productsrouter.delete('/Product/:id', authRequired, deleteProduct);
Productsrouter.put('/Product/:id', authRequired, updateProduct);

export default Productsrouter;