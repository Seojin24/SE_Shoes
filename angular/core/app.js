var app = angular.module('mainApp', [
    'ngRoute',
    'ngAnimate',
    'ngTouch',
    'ngMaterial'
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
}]);

app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'MainCtrl',
        templateUrl: '/views/customer/main.html'
    })
    .when('/signin', {
        /*controller: 'MainCtrl',*/
        templateUrl: '/views/customer/signin.html'
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