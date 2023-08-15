const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },

}, { timestamps: true });

const  Category= mongoose.model('Category', CategorySchema);

module.exports = Category;
