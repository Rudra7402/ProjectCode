const User = require("../models/user");
const validate = require("../utils/validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');


const register = async (req,res)=>{
    try{
        
        validate(req.body);

        const {firstName,emailId,password}=req.body;

        req.body.password = await bcrypt.hash(password,10);
        req.body.role = 'user';
        const user = await User.create(req.body);
         
        const token = jwt.sign({_id:user._id , emailId:emailId, role:'user'},process.env.JWT_KEY,{expiresIn:60*60});

        const reply={
            firstName:user.firstName,
            emailId:user.emailId,
            _id:user._id
        }

        res.cookie('token',token,{maxAge: 60*60*1000});
        res.status(201).json({
            user:reply,
            message:"Loggin Successfully"
        });        
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}

const login = async (req,res)=>{ 
     
    try{
        

        const {emailId,password} = req.body;


        if(!emailId){
            throw new Error("Invalid credentials");
        }
        if(!password){
            throw new Error("Invalid credentials");
        }

        const user = await User.findOne({emailId});

        const match = await bcrypt.compare(password,user.password); 

        if(!match){
            throw new Error("Invalid credentials");
        }

        const reply={
            firstName:user.firstName,
            emailId:user.emailId,
            _id:user._id
        }
        
        const token = jwt.sign({_id:user._id , emailId:emailId, role:user.role},process.env.JWT_KEY,{expiresIn:60*60});
        res.cookie('token',token,{maxAge: 60*60*1000});
        res.status(200).json({
            user:reply,
            message:"Loggin Successfully"
        });
    }
    catch(err){
        res.status(401).send("Error: "+err.message);
    }
}

const logout = async (req,res)=>{
    
    try{
        const {token} = req.cookies;
        const payload = jwt.decode(token);

        await redisClient.set(`token:${token}`,'Blocked');
        await redisClient.expireAt(`token:${token}`,payload.exp);
        res.cookie('token',null,{expires: new Date(Date.now())}); 
        res.send("Logged out successfully");
    }
    catch(err){
        res.status(503).send("Error: "+err);
    }
}

const adminRegister = async (req,res)=>{
    try{
        
        validate(req.body);

        const {firstName,emailId,password}=req.body;

        req.body.password = await bcrypt.hash(password,10);
        // req.body.role = 'admin';
        const user = await User.create(req.body);
         
        //const token = jwt.sign({_id:user._id , emailId:emailId, role:user.role},process.env.JWT_KEY,{expiresIn:60*60});
        //res.cookies('token',token,{maxAge: 60*60*1000});
        res.status(201).send("Admin registered successfully");
        
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}
module.exports = {register, login, logout, adminRegister};