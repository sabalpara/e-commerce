import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './confing/mongodb.js';
import connectCloudinary from './confing/cloudinary.js';
import path from 'path';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRout.js';
import upload from './middleware/multer.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;
const myDir = path.resolve('D:/javascript/appointment/backend');
// Connect DB and Cloudinary
connectDb();
connectCloudinary(); // ✅ make sure this is called

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))
 // ✅ this is important for accessing image URLs
app.use(express.static(path.join(myDir,"public")));

app.set('view engine', 'ejs');
// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

// app.get('/', (req, res) => {
//   res.send("API Working");
// });

app.get('/', (req, res) => {
    res.render('upload');
});

// app.post('/uploads', upload.fields([
//     { name: 'image1', maxCount: 1 },
//     { name: 'image2', maxCount: 1 },
//     { name: 'image3', maxCount: 1 },
//     { name: 'image4', maxCount: 1 }
//   ]), (req, res) => {
//   console.log("ALL FILE:", req.files);  
//   res.json({ file: req.files });
// });




app.listen(port, () => console.log(`server started on port:${port}`));
