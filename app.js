const express = require('express');
const passport = require('passport');
const path = require('path');
const nunjucks = require('nunjucks');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

mongoose.connect(process.env.DB_URI,{
  useNewUrlParser : true,
  useUnifiedTopology : true,
})
.then(() => console.log("db connected"))
.catch((err) => console.log(err));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(passport.initialize());

app.use(function(req,res,next) {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});

app.use(function(err,req,res,next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {console.log(`${app.get('port')} 연결`);})