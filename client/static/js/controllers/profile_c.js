ballyCyrk.controller('profileController', function(userFactory, $routeParams){
  var _this = this;

  this.currentUser = function(){
    userFactory.show($routeParams.id, function(data){
      _this.user = data;
      console.log('PC!', _this.user);
    });
  }

  this.currentUser();
})
