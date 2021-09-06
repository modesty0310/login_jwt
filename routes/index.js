const express = require('express');
const router = express.Router();

router.get('/join', (req,res,next) => {
  res.render('join', { title: '회원가입 - NodeBird' });
})

router.get('/', (req, res) => {
  res.render('main')
})

module.exports = router;