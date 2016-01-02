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
    $http.post('/login', user).success(function(output){
      console.log(output);
      callback(output);
    })
  }

  factory.facebook = function(callback){
    $http.get('/auth/facebook').success(function(output){
      callback(output);
    })
  }

  factory.google = function(callback){
      $http.get('/auth/google').success(function(output){
      callback(output);
    })
  }

  factory.show = function(id, callback){
    $http.get('/user/'+id).success(function(output){
      callback(output);
    })
  }

  return factory;
})

