const Recipe=require('../models/Recipe')
const {JWT_SECRET}=require('../config/index')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose');


const getAll=async(req,res,next)=>{
  try {
    const Recipes=await Recipe.find({});
    res.status(200).json({Recipes});
    
  } catch (error) {
    console.log(error)
    return res.status(409).json(error);
    
  }
}

const createRecipe = async (req, res) => {
  try {
    /*
    try{
      

      const token = req.cookies.access_token;

      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        //return res.status(401).json( req.user );
      });
    }
    catch(error){
      console.log(error);
      return res.status(200).json({ error:error });
    }
    */

    const { name, ingredients, description, cuisine } = req.body;
    const createdBy=req.user.userId
    console.log(req.user.userId);
    const newRecipe = await Recipe.create({
      name,
      ingredients,
      description,
      cuisine,
      createdBy,
    });

    res.status(201).json({ recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the recipe' });
  }
}

const getOne=async(req,res,next)=>{

  try {
    const{id:_id}=req.params
    const foundRecipe=await Recipe.findOne({_id});
    if(!foundRecipe)
    {
      return res.status(200).json({message:'Recipe Not found'})
    }
    return res.status(200).json({foundRecipe});
    
  } catch (error) {
    console.log(error)
    return res.status(409).json(error);
    
  }

}

const updateRecipe=async (req,res,next)=>{
  /*
  try{

    const token = req.cookies.access_token;
    if(!token)
    {
      return res.status(404).json({ message: 'No token found!' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = decoded;
      //return res.status(401).json( req.user );
    });
  }
  catch(error){
    console.log(error);
    return res.status(400).json({ error:error });
  }
  */

  const{id:_id}=req.params
  let userId=req.user.userId

  try {
    
  let foundRecipe=await Recipe.findOne({_id})
  if(!foundRecipe)
  {
     return res.status(200).json({message:'Recipe Not found'})
  }
  userId =new mongoose.Types.ObjectId(userId);
  if(!userId.equals(foundRecipe.createdBy))
  {
    console.log(foundRecipe.createdBy)
    console.log(userId)
    return res.status(409).json({message:'You cannot update others recipe'})
  }
    
  } catch (error) {
    console.log(error)
    return res.status(409).json({message:'DONT KNOW'})
  }

  try {
    foundRecipe=await Recipe.updateOne({_id},req.body)
    return res.status(200).json({message:'Update successfully'});

  } catch (error) {
    console.log(error)
    return res.status(400).json({message:'Unable to update'})
    
  }

  


}

const deleteRecipe=async (req,res,next)=>{

  /*
  try{

    const token = req.cookies.access_token;
    if(!token)
    {
      return res.status(404).json({ message: 'No token found!' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = decoded;
      //return res.status(401).json( req.user );
    });
  }
  catch(error){
    console.log(error);
    return res.status(400).json({ error:error });
  }
  */

  const{id:_id}=req.params
  let userId=req.user.userId

  try {
    
  let foundRecipe=await Recipe.findOne({_id})
  if(!foundRecipe)
  {
     return res.status(200).json({message:'Recipe Not found'})
  }
  userId =new mongoose.Types.ObjectId(userId);
  if(!userId.equals(foundRecipe.createdBy))
  {
    console.log(foundRecipe.createdBy)
    console.log(userId)
    return res.status(409).json({message:'You cannot delete others recipe'})
  }
    
  } catch (error) {
    console.log(error)
    return res.status(409).json({message:'DONT KNOW'})
  }

  try {
    await Recipe.deleteOne({_id})
    return res.status(200).json({message:'Deleted successfully'})
  } catch (error) {
    console.log(error)
    return res.status(409).json({message:'Unable to delete'})
    
  }


}
module.exports={
  getAll,
  createRecipe,
  deleteRecipe,
  getOne,
  updateRecipe
}

