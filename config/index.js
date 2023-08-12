const dotenv=require('dotenv').config();

const connectionString=process.env.connectionString
const JWT_SECRET=process.env.JWT_SECRET
module.exports={
  connectionString,
  JWT_SECRET
}