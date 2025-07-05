import jwt from 'jsonwebtoken'


const adminAuth= async (req,res,next)=>{
   try {
    // console.log("hi my name is jay ...;qfjqekkfhkehkjefh");
    
    const {token}=req.headers;
    if(!token){
       return res.json({success:false,message:"Not Authorised Login Again"})
    }

    const token_decode=jwt.verify(token,process.env.JWT_SECRATE);

    if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
        return res.json({success:false,message:"Not Authorised Login Again"})
    }
     next()
   } catch (error) {
    console.log(error);
    res.json({success:false,error})
   }
}

export default adminAuth;