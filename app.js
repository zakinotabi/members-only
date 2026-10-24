require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const homeRouter = require('./routes/homeRouter');
const userRouter = require('./routes/userRouter');
const postsRouter = require('./routes/postsRouter');
const session = require('express-session');
const passport = require('./config/passport');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'some-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/posts', postsRouter);
app.use('/', homeRouter);

app.listen(PORT, () => {
  console.log('running');
});
