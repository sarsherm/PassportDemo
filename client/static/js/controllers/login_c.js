ballyCyrk.controller('loginController', function(userFactory, $location){
  var _this = this;

  this.userLogin = function(){
    userFactory.loginUser(_this.user, function(data){
      if (data.message){
        _this.message = data
      } else {
        _this.user = data.user[0];
        console.log('user',_this.user._id);
        $location.path('/profile');
      }
    });
  }

})
