const express=require('express')

const router=express.Router()

const {getAll,createRecipe,getOne,updateRecipe,deleteRecipe}=require('../controllers/recipe')

router.post('/',createRecipe)

router.get('/',getAll)

router.get('/:id',getOne)

router.put('/:id',updateRecipe)

router.delete('/:id',deleteRecipe)

module.exports=router