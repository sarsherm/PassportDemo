// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var mongoose      = require('mongoose');
// load up the User model
var User          = mongoose.model('User');

// expose this function to our app using module.exports
module.exports    = function(passport){
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done){
    // User.findById(id, function(err, user) { <-- Line 22 & 23 do the same? Ya
      User.find({_id:id}, function(err, user) {
        done(err, user);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'
  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email.
    usernameField : "email",
    passwordField : "password",
    passReqToCallback : true //allows us to pass back the entire request to the callback
  },
  function(req, email, password, res) { //replace done with 'res'?
    //asynchronous
    //User.findOne wont fire unless data is sent back
    process.nextTick(function() {
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({'local.email' : email}, function(err, user) {
        //if there are any errors return the errors
        if (err) { return res(err); }; //in demo they did not add {}.
        // check to see if theres already a user with that email
        if (user) {
          return res(null, false, req.flash('signupMessage', 'That email is already in use.'));
        } else {
          // if ther is no user with that email, create the user
          var newUser = new User();
          // set the user's local credentials
          newUser.local.email = req.body.email; // req.body.email?
          newUser.local.password = newUser.generateHash(password); // req.body.password?
          newUser.save(function(err) {
            if (err) {
              throw (err);
            } else {
              return res(null, newUser);
            }
          });
        }
      });
    });
  }));
// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'
passport.use('local-login', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, callback){
  // callback with email and password from our form
  // find a user whose email is the same as the forms email
  //we are checking to se if the user tyring to ogin already exists
    User.findOne( {'local.email' : email}, function(err, user){
      console.log('err',err);
      console.log('user', user);
      //if there are any errors, return those errors before anything else
      if(err)
        return callback(err);

      // if no user is found, return the message)
      if (!user)
        return callback(null, false,
                        req.flash('loginMessage', 'No user found.'));
      // if the user is found but the password is wrong
      if (!user.validPassword(password))
        return callback(null, false,
                        req.flash('loginMessage', 'Oops! Wrong password.'));
      // all is well return successful user
      return callback(null, user);
    });
  }));
};
