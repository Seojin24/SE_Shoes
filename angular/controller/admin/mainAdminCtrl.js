app.controller('MainAdminCtrl', ['$scope', '$rootScope', '$http', '$location', '$mdSidenav', '$timeout', function($scope, $rootScope, $http, $location, $mdSidenav, $timeout){
    //for right-side hamburger toggle in nav.html
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }

    $scope.logout = function() {
        $http.get('/logout').success(
            function(data){
                if(data.error == false) {
                    $rootScope.session = null;
                    
                }
            })
        $location.path("/");
    }
}]);