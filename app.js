
//require('express-async-errors');

const express = require('express');
const app = express();
const cookieParser=require('cookie-parser')
const {connectionString}=require('./config/index')
const connectDB=require('./database/index')
const authMiddleware=require('./middleware/auth')

const mainRouter=require('./routes/auth')
const recipeRouter=require('./routes/recipe')

app.use(express.json());

app.use(cookieParser());


app.use('/upload',express.static('upload'))
app.use('/api/',mainRouter)///
app.use('/api/recipe',authMiddleware,recipeRouter)///

const port = 5000;

const start = async () => {
  try {
    await connectDB(connectionString)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
