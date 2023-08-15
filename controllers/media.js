const mongoose=require('mongoose')
const fs = require('fs');
const {PORT}=require('../config/index')
const Media=require('../models/media')
const Recipe=require('../models/Recipe')

const uploadMedia=async(req,res,next)=>{

  try {


    const {recipeId}=req.params
    const foundRecipe=await Recipe.findById({_id:recipeId})
    if(!foundRecipe)
    {
      return res.status(404).json({message:'No recipe with this id found'})
    
    }
    let messageStr=''
    let newImages = [];
    try {
      for (const file of req.files) {
        const isPresent =await Media.findOne({filename:file.originalname,recipeId})
        if(!isPresent)
        {
          const newImage = await Media.create({
            mediaPath: `http://localhost:${PORT}/upload/${file.filename}`,
            recipeId,
            filename: file.originalname,
          });
          newImages.push(newImage);
        }
        else
        {
          messageStr=`${messageStr} .\n file with name:${file.originalname} is already present`
        }
      }
    } catch (error) {

      console.log(error)
      
    }
    

    return res.status(200).json({messageStr, newImages });


  } catch (error) {
    console.log(error)
    res.json({message:error})
  }



}

const deleteMedia=async(req,res,next)=>{
  const {recipeId,mediaId}=req.params

  const foundMedia=await Media.findOneAndDelete({recipeId,_id:mediaId})
  if(!foundMedia)
  {
    return res.status(404).json({message:'Media Not found'})
  }
  let filePath=foundMedia.mediaPath.split('/')[4]
  filePath=`./upload/${filePath}`
  
  fs.unlinkSync(filePath);

  res.status(200).json({msg:'Media deleted successfully'})



}

module.exports={
  uploadMedia,
  deleteMedia
}