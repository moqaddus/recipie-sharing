const mongoose=require('mongoose');
//const {JWT_SECRET}=require('../config/index')
const jwt=require('jsonwebtoken');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  ingredients: [{
    name: {
      type: String,
      required: [true, 'Ingredient name is required'],
      trim: true,
    },
    quantity:{
      type: String
    },
    measurementUnit:{

     type:String,
    }
  }],

  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  cuisine: {
    type: String,
    required: [true, 'Cuisine is required'],
    trim: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User', // Reference to the User schema
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category', // Reference to the Category schema
    required: true,
  },
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
