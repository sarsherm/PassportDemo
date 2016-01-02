var mongoose      = require('mongoose');
var User          = mongoose.model('User');

module.exports ={
  fail: function(req, res){
    req.body.error = "That email is already in use.";
    console.log('req', req.sessionStore.sessions);
    console.log('Login', req.body);
    res.json({ message: req.body.error });
  },
  nolog: function(req, res){
    req.body.error = "Email/Password incorrect.";
    console.log('req', req.sessionStore.sessions);
    console.log('NOLOG', req.body);
    res.json({ message: req.body.error });
  },
  get: function(req, res){
    User.findOne({_id: req.params.id}, function(err, user){
      if (err) {
        res.json(err);
      } else {
        res.json(user);
      }
    });
  }
};


