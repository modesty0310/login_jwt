const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  nickName: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //dhsdb 1541 @naver.com 을 dhsdb1541@naver.com로 trim
    unique: 1,
  },
  password: {
    type: String,
    minLength: 5,
  },
});

module.exports = mongoose.model('User', userSchema)