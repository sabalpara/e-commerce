import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
// Route for user login

const createToken=(id)=>{

    return jwt.sign({id},process.env.JWT_SECRATE)
}

const loginUser = async (req, res) => {

    try {
        const {email,password}=req.body;
        
        //validate;
        console.log("i am in login ");
        

        const exist= await userModel.findOne({email});

        if(!exist){
             return res.json({success:false,message:"please register first"})
        }
       const isMatch=await  bcrypt.compare(password,exist.password)
          if(!isMatch){
             return res.json({success:false,message:"please enter a valid password"})
          }

          const token=createToken(exist._id);
           res.json({success:true,token})

    } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
    }
   
}

// Route for user register
const registerUser = async (req, res) => {
  try {
    
    const {name,email,password}=req.body;

    const  exists =await userModel.findOne({email})

    console.log("i am in sign in");
    

    if(exists){
        return res.json({success:false,message:"user alerady exist"})
    }

    if(!validator.isEmail(email)){
        return res.json({success:false,message:"please enter a valid email"})
    }
      
    if(password.length<8){
        return res.json({success:false,message:"please enter a strong password"})
    }
    
    //hashing user password

    const salt=await bcrypt.genSalt(10)

    const hashedPassword=await bcrypt.hash(password,salt)
 
    const newUser= new userModel({
        name,
        email,
        password:hashedPassword
    })
    
    const user=await newUser.save()

    const  token=createToken(user._id)

    res.json({success:true,token})
   
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
    
  }
}

// Route for admin login
const adminLogin = async (req, res) => {
try {
    
    const{email,password}=req.body;

    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
        const token=jwt.sign(email+password,process.env.JWT_SECRATE);
        res.json({success:true,token});
    }else{
        res.json({success:false,message:"Invalid credentials"});
    }

} catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
}
}

export { loginUser, registerUser, adminLogin };
