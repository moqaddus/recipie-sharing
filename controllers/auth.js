
const UserSchema=require('../models/User')
const {JWT_SECRET}=require('../config/index')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const register=async(req,res,next)=>{
  //if already registered(email)

  const {username,email,password}=req.body
  try {
    //if already registered
    const emailInUse=await UserSchema.exists({email});
    if(emailInUse)
    {
      res.status(401).json({message:'Already registered with thi email'})
    }
    else
    {


    //hashed passowrd
    const hashedPassword=await bcrypt.hash(password,10);
    const user=new UserSchema({username:username,email:email,password:hashedPassword})
    await user.save();
    res.status(201).json({user:user})
    }
  } catch (error) {
    console.log({error});
    
  }
  
//making a temp user and with name and email same as above user 
  //but password including addittional bit string
  //const salt=await bcrypt.genSalt(10);//randombytes
  //const hashedPassword=await bcrypt.hash(password,salt)
  //const tempUser={name,email,password:hashedPassword}
  //const user=await User.create({...req.body})
  //const token=user.createJWT()
  //res.status(StatusCodes.CREATED).json({user:{name:user.name},token})

}
const login=async(req,res,next)=>{

  const {email,password}=req.body
  try {
    const foundUser=await UserSchema.findOne({email:email})
    //console.log('password:', password);
    //console.log('foundUser.password:', foundUser.password);
    if(!foundUser)
    {
      res.status(401).json({message:'User not found(invalid email'})
    }
    else
    {

      const match=await bcrypt.compare(password,foundUser.password);
      if(!match)
      {
        res.status(401).json({message:'Wrong password'})
      }
      else
      {
        //access token for that login
        try {
          const token=foundUser.createJWT();
          res.cookie('access_token', token, { httpOnly: true });
          res.status(200).json({name:foundUser.username,token})


         // res.status(200).json({foundUser})
          
        } catch (error) {
          console.log(error);
        }
        
      }
    }
  } catch (error) {

    console.log(error)
    
  }



}

const logout=async (req,res,next)=>{
  /*
  try {
    
    res.clearCookie('access_token');
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.json({ message: 'Unsuccessful' });
  }
*/
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'Unsuccessful' });
  }

  try {
    /*
    const payload=jwt.verify(token,process.env.JWT_SECRET)
    req.user={userId:payload.userId,name:payload.name}
    res.clearCookie('access_token');
    return res.status(200).json({ name:req.user.name});
    */

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    res.clearCookie('access_token');
    return res.status(401).json({message:'LOGOUT SUCCESSFUL'} );

  })
  } catch (error) {
    return res.status(401).json({ message: 'Unsuccessfull' });
  }

  



}




module.exports={
  register,
  logout,
  login
}