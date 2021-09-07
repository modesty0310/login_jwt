const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  nick: {
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
  token: {
    type: String
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) { 
  //~.pre()를 통해 해당 스키마에 데이터가 저장되기전(.save) 수행할 작업들을 지정해줄 수 있다.
  let user = this;
  if (user.isModified("password")) { //패스워드가 변경될때만 해싱작업이 처리됨.
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function(plainPassword){
  return bcrypt
    .compare(plainPassword, this.password)
    .then(isMatch => isMatch)
    .catch(err => err);
};

userSchema.methods.generateToken = function () {
  // let user = this;
  const token = jwt.sign(this._id.toHexString(), "secretToken");
  this.token = token;
  return this.save()
    .then((user) => user)
    .catch((err) => err);
};

userSchema.statics.findByToken = function (token) {
  let user = this;
  //secretToken을 통해 user의 id값을 받아오고 해당 아이디를 통해
  //Db에 접근해서 유저의 정보를 가져온다
  return jwt.verify(token, "secretToken", function (err, decoded) {
    return user
      .findOne({ _id: decoded, token: token })
      .then((user) => user)
      .catch((err) => err);
  });
};


module.exports = mongoose.model('User', userSchema)