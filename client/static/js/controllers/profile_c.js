ballyCyrk.controller('profileController', function(userFactory){
  var _this = this;

  this.signup = function(){
    userFactory.create(_this.user, function(data){
      _this.user = data;
      console.log('SC!', _this.user);
    });
  }
})
