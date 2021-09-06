const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
});

userSchema.pre("save", function (next) { 
  //~.pre()를 통해 해당 스키마에 데이터가 저장되기전(.save) 수행할 작업들을 지정해줄 수 있다.
  var user = this;
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

userSchema.methods.checkPassword = function(guess,done){
  bcrypt.compare(guess,this.password,function(err,isMatch){
      done(err,isMatch);
  });
};


module.exports = mongoose.model('User', userSchema)