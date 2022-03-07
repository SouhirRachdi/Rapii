const mongoose = require('mongoose');
const express = require('express');
const UserModel=require('./models/User')
const User =require ('./models/User')

const app = express();
const port =5000;
require("dotenv").config({path:'./config/.env'})
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI).then (() => {
    console.log('db connected')
  })
  .catch(err => {
    console.error(err)
  });

  app.use(express.json());

  //RETURN ALL USERS 
 app.get('/',async(req,res)=>{
  try{
    const allUser= await User.find({})
    res.send({allUser})
  }
  catch(err){
   res.status(400).send(err.message);
 }

  })


// ADD A NEW USER TO THE DATABASE  
  app.post('/Create',async(req,res)=>{
    try{
      const newUser=new UserModel(req.body)
      await newUser.save()
      res.status(200).send('newUser here')
    }
    catch(err){
      res.status(400).send(err.message);
    }
  })

//EDIT A USER BY ID 
  app.put('/users/:id',(req,res)=>{
    console.log(req.params.id) ;
    User.findOneAndUpdate({_id:req.params.id},{
      $set:{
      name:req.body.name,
      email:req.body.email
    }
    })
    .then(result=>{
      res.status(200).json({
        updated_User:result
      })
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error:err.message
      })
    })
   
  })

//REMOVE A USER BY ID
  app.delete('/delete/:id',async(req,res)=>{
    try{
      const deleteUser= await User.findByIdAndRemove({_id:req.params.id})
      res.send({deleteUser})
    }
    catch(err){
     res.status(400).send(err.message);
   }
  
    })

  
 
  const createAndSavePerson=async(req,res)=>{
    try{

  const arrayOfPeople=[{ name: 'Will Riker', age:25, adress:"gafsa",email:"will@gmail.com" },
   { name: 'Mary', age:60, adress:"nabeul",email:"mary@gmail.com" },
   { name: 'cillian Murphy', age:30,adress:"London",email:"cillian@gmail.com"  },
   { name: 'Mary', age:4, adress:"paris",email:"maryem@gmail.com" }];
    
   User.create(arrayOfPeople,(err,data)=>{
      if (err) return [err];
      return [null,data];
    });
}
catch(err ) {
  console.error(err);
}
  }

  //createAndSavePerson()

app.listen(port, function(){
    console.log(`Lostening to the server on http://localhost:${port}`)});




   