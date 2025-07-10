
// function for add product
import {v2 as cloudinary} from 'cloudinary';
import ProductModel from '../models/productModel.js';
import productModel from '../models/productModel.js';
const addProduct=  async(req,res)=>{
try {

    const { name,description,price,category,subCategory,sizes,bestSeller}=req.body;

// console.log('Request Content-Type:', req.headers['content-type']);
// console.log('req.files:', req.files);
// console.log('req.body:', req.body);

    // console.log(bestSeller+"  iam in the backend");
    
    const image1=req.files.image1&&   req.files.image1[0];
    const image2=req.files.image2 && req.files.image2[0];
    const image3=req.files.image3&&  req.files.image3[0];
    const image4=req.files.image4&&  req.files.image4[0];

    const images=[image1,image2,image3,image4].filter((item)=>item !=undefined)

    let images_url=await Promise.all(
        images.map(async (item)=>{
            let res= await cloudinary.uploader.upload(item.path,{resource_type:'image'})
            return res.secure_url
        })
    )

    // console.log( name,description,price,category,subCategory,sizes,bestSeller);

    // console.log(images_url);

    const product_data={
        
        name,
        description,category,
        price:Number(price),
        subCategory,
        bestSeller:bestSeller==="true"?true:false,
        sizes:JSON.parse(sizes),
        image:images_url,
        date:Date.now(),
        reviews: []
    }

    const product=new ProductModel(product_data)
     await product.save();
    // console.log(product_data);
    
    
    res.json({success:true,message:"product added"});
    
    
} catch (error) {

    console.log(error);
    res.json({
        success:false,
        msg:error.message
    })
}


}

//function for list product

const listProducts=  async(req,res)=>{
    try {
        
        const products= await ProductModel.find({});
        res.json({success:true, products})


    } catch (error) {
        console.log(error);
        
        res.json({success:false, message:error})
    }


}

const removProducts=  async(req,res)=>{
    
    try {

        await ProductModel.findByIdAndDelete(req.body.id)

        res.json({success:true, message:"product removed"})
        
    } catch (error) {
         console.log(error);
        
        res.json({success:false, message:error})
    }

}


const singleProduct=  async(req,res)=>{
    try {
        const {productId}=req.body

        const product=await ProductModel.findById(productId);

        res.json({success:true ,product})
    } catch (error) {
         console.log(error);
        
        res.json({success:false, message:error})
    }
}

const addReview= async (req,res)=>{
  try {
    console.log("hiiii");
    
    const {email,productId,rating,comment}=req.body;
    const product=await productModel.findById(productId);
    console.log(product.reviews);
    
    await productModel.findByIdAndUpdate(productId,{
        $push:{
            reviews: {
            email,
            comment,
            star:rating,
            date: new Date()
          }
        }
    })
    console.log(product.reviews);
    
   
    
    res.json({success:true,message:"Thanks for your comment"});
  } catch (error) {
     console.log(error);
        
 res.json({success:false, message:error})
  }
}

export {listProducts,addProduct,removProducts,singleProduct,addReview}