import express from 'express';
import { loginUser, registerUser, adminLogin,subscribe,IsSubscribe,subscribeVerify,info,addUserImage,likeItem,remove,addtocart } from '../controllers/userController.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/edit', adminLogin);
userRouter.post('/subscribeRazor',subscribe);
userRouter.post('/IsSubscribe',IsSubscribe);
userRouter.post('/subscribeVerify',subscribeVerify);
userRouter.post('/info',info);
userRouter.post('/addUserImage',upload.single('image1'),addUserImage);
userRouter.post('/likeItem',likeItem);
userRouter.post('/remove',remove);
userRouter.post('/addtocart',addtocart);
export default userRouter;
