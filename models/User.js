const mongoose=require('mongoose');
const {JWT_SECRET}=require('../config/index')
const jwt=require('jsonwebtoken');


//Setting the schema
const UserSchema=new mongoose.Schema({
  username:{
    type:String,
    required:[true,'must provide name'],
    trim:true,
    //maxlength:[20,'name too large']
  },
  password:{
    type:String,
    required:[true,'must provide password'],
    trim:true,
    //maxlength:[20,'name too large']
  },
  email:{
    type:String,
    required:[true,'must provide name'],
    trim:true,
    //maxlength:[20,'name too large']
  },
})

UserSchema.methods.createJWT=function(){
  return jwt.sign({userId:this._id,name:this.name},JWT_SECRET,{
    expiresIn:'30d',
  })
}

module.exports=mongoose.model('User',UserSchema)