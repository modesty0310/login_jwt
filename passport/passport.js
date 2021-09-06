const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = () => {
  //Local strategy
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await User.find({ email: email });
      if (user) {
        const result = await bcrypt.compare(password, user.password);
        if (result) done(null, user);
        else done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
      } else {
        done(null, false, {message: '아이디가 존재하지 않습니다.'});
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }
  ))

  //JWT Strategy
  passport.use(new JWTStrategy({
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET
  },
  async (jwtPayload, done) => {
    try {
      
    } catch (error) {
      
    }
  }
  ))
}
