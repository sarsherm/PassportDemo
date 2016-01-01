ballyCyrk.controller('signupController', function(userFactory, $location){
  var _this = this;

  this.signup = function(){
    userFactory.create(_this.user, function(data){
      console.log('data', data);
      if (data.message){
        _this.message = data;
      } else {
        _this.user = data.user[0];
        console.log('user',_this.user._id);
        $location.path('/profile');
      }
    });
  }
})

