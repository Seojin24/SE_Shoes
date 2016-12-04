var app = angular.module('mainApp', [
    'ngRoute',
    'ngAnimate'
]);

/*var app = angular.module('mainApp', [
    'ngRoute', 
    'ngFileUpload',   
    'ngCookies', 
    'ngSanitize',
    'ngAnimate'
]);*/
/*app.run(['$rootScope', '$http', '$cookies', '$location', '$controller', '$sce', function($rootScope, $http, $cookies, $location, $controller, $sce) {*/
app.run(['$rootScope', '$http', '$location', '$controller', function($rootScope, $http, $location, $controller) {
    /*$http.get('/getSession').success(function(data) {
        if(data)
            $rootScope.session = data;
    })*/

    /*//로그인 상태인지 체크
    $rootScope.loginInterceptor = function() {
        if(!$rootScope.session)
            $location.path( "/#/login" );
    };
    //로그아웃 상태인지 체크
    $rootScope.logoutInterceptor = function() {
        if($rootScope.session)
            $location.path( "/#/" );
    };*/
    $rootScope.orderFilter ="";
    $rootScope.itemList = [{name:'Bq Aquaris 5 16GB White',price:249.99,image:'assets/img/demo/e_img03.jpg'},
                        {name:'LG 55LA620S 55" LED 3D',price:999.99,image:'assets/img/demo/e_img07.jpg'},
                        {name:'Iphone 5S',price:649.00,image:'assets/img/demo/e_img01.jpg'},
                        {name:'Keyboard Pro Game',price:49.99,image:'assets/img/demo/e_img02.jpg'},
                        {name:'Doogee Voyager DG300 Black',price:99.99,image:'assets/img/demo/e_img04.jpg'},
                        {name:'Gigabyte GeForce GTX 660',price:224.00,image:'assets/img/demo/e_img05.jpg'}]
}]);

app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        /*controller: 'mainCtrl',*/
        templateUrl: '/views/customer/main.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}]);

//unsafe javascript:void(0) 앞 unsafe 딱지 때줌
app.config(function($compileProvider){
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
});