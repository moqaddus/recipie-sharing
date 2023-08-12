const mongoose=require('mongoose')
const {JWT_SECRET}=require('../config/index')
const jwt=require('jsonwebtoken')
const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

module.exports=authMiddleware