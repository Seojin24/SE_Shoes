app.controller('UserCtrl', ['$scope', function($scope){
    //initCart
    //initOrder
    //doOrder
}]);

app.config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  });