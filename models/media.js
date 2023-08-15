const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

const MediaSchema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Types.ObjectId,
    ref: 'Recipe', // Reference to the Category schema
    required: true,
  },
  filename:{
    type:String,
    required:true,
  },
  mediaPath: {
    type: String,
    required: [true, 'path if this media not specified'],
    trim: true,
  },

  // Add other properties here...
}, { timestamps: true });

const  Media= mongoose.model('Media', MediaSchema);

module.exports = Media;