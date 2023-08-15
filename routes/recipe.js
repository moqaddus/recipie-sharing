const express=require('express')

const router=express.Router()

const {getAll,createRecipe,getOne,updateRecipe,deleteRecipe}=require('../controllers/recipe')

router.post('/',createRecipe)

router.get('/',getAll)

router.get('/:id',getOne)

router.put('/:id',updateRecipe)

router.delete('/:id',deleteRecipe)


const { uploadImages,uploadMedia,deleteMedia }=require('../controllers/media')
const upload=require('../middleware/media')

router.post('/:recipeId/images',upload.array('images'),uploadMedia)

router.post('/:recipeId/videos',upload.array('videos'),uploadMedia)

router.delete('/:recipeId/media/:mediaId',deleteMedia)

module.exports=router