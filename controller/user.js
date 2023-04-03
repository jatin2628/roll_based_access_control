const jwt = require('jsonwebtoken');
const models = require('../models');
const User = models.User;
const bcrypt = require('bcrypt');



exports.register = async (req,res) => {
    try {
        const {email,password} = req.body;
        const checkUser = await User.findOne({where:{email:req.body.email}});
        if(checkUser){
            res.status(500).json({message:"Email already exist"});
            return;
        }
        const hashPass = await bcrypt.hash(password,12);
        const user = await User.create(req.body);

        const payload = {
            email: user.email,
            id: user.id
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '15m' });

        res.status(200).json({ status: "true", msg: "register succesfully",data:user,token:token });

    } catch (e) {
        console.log(e)

    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({where: {email:email}});
        if(!user){
            res.status(400).json({message:"Invalid email Credential"});
            return;
        }

        const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                res.status(400).json({message:'Invalid Credential'});
                return;
            }
            const payload = {
                email: user.email,
                id: user.id
            }
    
            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '15m' });
            
            res.status(200).json({success:"ok",msg:"login Successful",data:user,token:token});

    } catch (e) {
        console.log(e)

    }
}

exports.profile = async(req,res)=>{
    try {
        const user = req.user;
        if(!user){
            return res.status(300).json({"success":false,"msg":"please login to continue"});
        }
        return res.status(300).json({"success":false,"data":user});
        
    } catch (e) {
        console.log(e);
        
    }
}

exports.getusers = async(req,res)=>{
    try {

        const data = await User.findAll();
        return res.status(300).json({"success":false,"data":data});
        
    } catch (e) {
        console.log(e);
        
    }
}