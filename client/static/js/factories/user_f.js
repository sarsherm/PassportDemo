ballyCyrk.factory('userFactory', function($http){
  var user = {};
  var factory = {};

  factory.create = function(user, callback){
    console.log('Factory!', user);
    $http.post('/signup', user).success(function(output){
      callback(output);
    })
  }

  factory.loginUser = function(user, callback){
    console.log('Factory LOGIN!', user);
    $http.post('/login', user).success(function(output){
      console.log(output);
      callback(output);
    })

  }
  return factory;
})

