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

// this is fo vercel deployment
const isProduction = process.env.NODE_ENV === 'production';
// we tell Express to trust Vercel's proxy
app.set('trust proxy', 1);

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//our cookie so we added httpOnly & secure & sameSite for some security
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'some-secret-key',
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      httpOnly: true, // Prevents client-side JavaScript (XSS) from reading the cookie
      secure: isProduction, // Only sends the cookie over encrypted HTTPS connections
      sameSite: 'lax', // Restricts cross-site sending to protect against CSRF
      maxAge: 1000 * 60 * 60 * 2, // 2 hours
    },
  }),
);
// for passport js
app.use(passport.initialize());
app.use(passport.session());

// our routes
app.use('/user', userRouter);
app.use('/posts', postsRouter);
app.use('/', homeRouter);

app.listen(PORT, () => {
  console.log('running');
});
