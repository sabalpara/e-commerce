import express from 'express'
import {listProducts,addProduct,removProducts,singleProduct} from'../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
const productRouter =express.Router();

productRouter.post('/add',upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),adminAuth, addProduct);

productRouter.post('/remove',adminAuth,removProducts);
productRouter.post('/single',singleProduct);
productRouter.get('/list',listProducts);

export default productRouter;