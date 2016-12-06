app.controller('UserAdminCtrl', ['$scope','$http','$location', '$routeParams', function($scope, $http, $location, $routeParams){
    //initList
    $scope.initList = function(){
        $http.get('/rest/popup').then(function(data){
            $scope.popupList = data;
        });
    }

    //initView
    $scope.initView = function(){

    }

    //initModify

    //modifyUser
}]);