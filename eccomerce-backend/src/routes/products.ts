import express from 'express';
import {
    allReviewsOfProduct,
    deleteProduct,
    deleteReview,
    getAdminProducts,
    getAllCategories,
    getAllProducts,
    getlatestProducts,
    getSingleProduct,
    newProduct,
    newReview,
    updateProduct
} from '../controllers/product.js';
import { adminOnly } from '../middlewares/auth.js';
import { mutliUpload } from '../middlewares/multer.js';

const app = express.Router();

app.post('/new', adminOnly, mutliUpload, newProduct);
app.get('/all', getAllProducts);
app.get('/latest', getlatestProducts);
app.get('/categories', getAllCategories);
app.get('/admin-products', adminOnly, getAdminProducts);
app
    .route('/:id')
    .get(getSingleProduct)
    .put(adminOnly, mutliUpload, updateProduct)
    .delete(adminOnly, deleteProduct);

app.get('/reviews/:id', allReviewsOfProduct);
app.post('/review/new/:id', newReview);
app.delete('/review/:id', deleteReview);

export default app;