const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('./middleware');


router.get('/join', (req,res,next) => {
  res.render('join', { title: '회원가입 - NodeBird' });
})

router.get('/', jwt, (req,res,next) => {
  res.render('main', {user: req.user})
  }
)

module.exports = router;