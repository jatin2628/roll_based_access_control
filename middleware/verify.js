const jwt = require('jsonwebtoken');
const models = require('../models');
const User = models.User;



const verifyUser = async (req,res,next)=>{
    const token = req.headers['authorization'];
    if(!token){
        res.status(500).json('Please login o continue');
    }else{
        const bearer = token.split(" ");
        const dem = bearer[1];
        const user = jwt.verify(dem,process.env.SECRET_KEY);
        if(!user){
            return res.json({"msg":"please login to continue"})
        }
        const userda = await User.findOne({where:{id:user.id}});
        req.user = userda;
    }
    next();
    
}

module.exports = verifyUser;