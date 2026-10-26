const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { getUserByUsername, getUserById } = require('../db/queries/userQueries');

// this was the hardest part
passport.use(
  // we are using the local strategy (there is a lot of strategies)
  new LocalStrategy(async (username, password, done) => {
    // passport js takes username and password automatically from req (just like express validator)
    try {
      // get same user with username
      const [user] = await getUserByUsername(username);
      //done(null, ""false""" means fail then we give the session a message
      if (!user) return done(null, false, { message: 'Invalid username or password. Please try again.' });

      // looking for the "encrypted" password in the db (passport encrypt then look)
      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: 'Invalid username or password. Please try again.' });

      // if no err then we give our done() func our user
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

// this create a session
passport.serializeUser((user, done) => done(null, user.id));

// this makes the session last - id is user id those two func are related
// so we only pass "id" not "user.id" the func/session already know which user
passport.deserializeUser(async (id, done) => {
  try {
    // we get that user by id
    const [user] = await getUserById(id);
    // if success then we pass it to done
    // this func is needed when the user is going through our web pages
    // so he stay logged in
    done(null, user);
  } catch (err) {
    done(err);
  }
});
module.exports = passport;
