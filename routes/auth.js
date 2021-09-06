const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/join', async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = User.find({email : email});
    if (exUser) return res.redirect('/join?error=exist');
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email: email,
      nickName : nick,
      password: password,
    });
    return res.redirect('/')
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;
