const Category=require('../models/Category')
const {JWT_SECRET}=require('../config/index')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose');


const getAllCategories=async (req,res,next)=>{

  try {

    const categories=await Category.find({})
   return res.status(200).json({categories})
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({message:'errorrr'})
  }

}

const updateCategory=async (req,res,next)=>{
  try {
    const {id:_id}=req.params
    const category=await Category.findOneAndUpdate({_id},req.body)
    return res.status(200).json({category})
  } catch (error) {
    console.log(error)
    return res.status(400).json({message:error})
  }
}

const createCategory=async (req,res,next)=>{
  try {
    const {name,description}=req.body
    const newCategory = await Category.create({
      name,
      description
    });
    return res.status(200).json({newCategory})
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({error:error})
  }
}

const deleteCategory=async (req,res,next)=>{
  try {
    const {id:_id}=req.params
    const category=await Category.findOneAndDelete({_id})
    return res.status(200).json({message:'DELETED SUCCESFULLY'})
  } catch (error) {
    console.log(error)
    return res.status(400).json({message:error})
  }
}

module.exports={
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
}