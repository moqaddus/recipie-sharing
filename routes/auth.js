const express=require('express')

const router=express.Router()

const {register,login,logout}=require('../controllers/auth')


router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)

/*
const {getAll,createRecipe,getOne,updateRecipe,deleteRecipe}=require('../controllers/recipe')

router.post('/recipe',createRecipe)

router.get('/recipe',getAll)

router.get('/recipe/:id',getOne)

router.put('/recipe/:id',updateRecipe)

router.get('/recipe/:id',deleteRecipe)
*/

const {getAllCategories,updateCategory,createCategory, deleteCategory}=require('../controllers/category')

router.get('/category',getAllCategories)
router.post('/category',createCategory)
router.put('/category/:id',updateCategory)
router.delete('/category/:id',deleteCategory)

module.exports=router
