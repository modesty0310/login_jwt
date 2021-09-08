const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/join', async (req, res, next) => {
  const email = req.body.email;
  User.findOne({email})
    .then(user => {
      if (user) res.redirect('/join?error=exist');
      const newUser = new User(req.body);
      newUser.save(err => {
        if(err) console.error(err);
        res.redirect('/')
      })
    })
    .catch(err => console.error(err))
})

router.post('/login', (req, res, next) => {
  const {email, password} = req.body;
  User.findOne({email})
    .then(user => {
      user.checkPassword(password)
      .then(isMatch => {
        if(!isMatch) return res.json({message : "비밀번호가 일치하지 않습니다."})
        user.generateToken()
        .then(user => {
          res.cookie("x_auth", user.token)
          .status(200)
          .redirect('/');
        })
      })
    })
})

router.get('/logout', (req,res) => {
  res.clearCookie('x_auth')
  res.render('main')
})

module.exports = router;
