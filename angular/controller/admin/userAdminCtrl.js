app.controller('UserAdminCtrl', ['$scope','$http','$location', '$routeParams', function($scope, $http, $location, $routeParams){
    //initList
    $scope.initList = function(){
        $scope.userList=[
            {
            id:"1",
            name:"김동민",
            phone:"010-0000-0000",
            email:"haracejob@github.com",
            wallet:"0",
            mileage:"0",
            address:"수원시 장안구 서부로 2066 성균관대학교 제1공대 22221호",
            type:"admin"
            },
            {
                id:"2",
                name:"김동민",
                phone:"010-0000-0000",
                email:"haracejob@github.com",
                wallet:"0",
                mileage:"0",
                address:"수원시 장안구 서부로 2066 성균관대학교 제1공대 22221호",
                type:"user"
            },
            {
                id:"3",
                name:"김동민",
                phone:"010-0000-0000",
                email:"haracejob@github.com",
                wallet:"0",
                mileage:"0",
                address:"수원시 장안구 서부로 2066 성균관대학교 제1공대 22221호",
                type:"user"
            },
            {
                id:"4",
                name:"김동민",
                phone:"010-0000-0000",
                email:"haracejob@github.com",
                wallet:"0",
                mileage:"0",
                address:"수원시 장안구 서부로 2066 성균관대학교 제1공대 22221호",
                type:"user"
            },
            {
                id:"5",
                name:"김동민",
                phone:"010-0000-0000",
                email:"haracejob@github.com",
                wallet:"0",
                mileage:"0",
                address:"수원시 장안구 서부로 2066 성균관대학교 제1공대 22221호",
                type:"user"
            },
            {
                id:"6",
                name:"김동민",
                phone:"010-0000-0000",
                email:"haracejob@github.com",
                wallet:"0",
                mileage:"0",
                address:"수원시 장안구 서부로 2066 성균관대학교 제1공대 22221호",
                type:"user"
            }
        ];


        $http.get('/rest/popup').then(function(data){
            $scope.popupList = data;
        });
    }

    //initView
    $scope.initView = function(){

    }


    $scope.userInfo="";
    //initModify

    $scope.initModify = function(){
        $scope.user=  {
            id:"6",
            name:"김동민",
            phone:"010-0000-0000",
            email:"haracejob@github.com",
            wallet:"0",
            mileage:"0",
            address:"수원시 장안구 서부로 2066 성균관대학교 제1공대 22221호",
            type:"user"
        };
    }

    //modifyUser

    $scope.modifyUser = function(user){
        $scope.userInfo=user;
        $location.path( "/user/modify/"+user.id );
    }


}]);