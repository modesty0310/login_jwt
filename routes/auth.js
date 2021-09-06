const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/join', async (req, res, next) => {
  const { email, nick, password } = req.body;
  User.findOne({email})
    .then(user => {
      console.log(user);
      if (user) return res.redirect('/join?error=exist');
      const newUser = new User(req.body);
      newUser.save(err => {
        if(err) console.error(err);
        return res.status(200).json({success: true});
      })
    })
    .catch(err => console.error(err))
})

module.exports = router;

// const hash = bcrypt.hash(password, 12);
//       User.create({
//         email: email,
//         nick : nick,
//         password: hash,
//       })
//       .then(() => res.redirect('/'))
//       .catch(err => console.error(err))