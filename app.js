const express = require('express');
require('dotenv').config();
const app = express();


const userRouter = require('./routes/user');
const userdRouter = require('./routes/userd');
const roleRouter = require('./routes/role');
const perRouter = require('./routes/permission');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(userRouter);
app.use(userdRouter);
app.use(perRouter);
app.use(roleRouter);

app.listen(3000,()=>{
    console.log("App is listeing on 3000");
})