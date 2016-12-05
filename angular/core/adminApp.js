var app = angular.module('adminApp', [
    'ngRoute',
    'ngAnimate',
    'ngTouch',
    'ngMaterial',
    'ngMessages',
    'datatables'
]);

app.run(['$rootScope', '$http', '$location', '$controller', function($rootScope, $http, $location, $controller) {
    $http.get('/getSession').success(function(data) {
        if(!data.error)
            $rootScope.session = data;
    })

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
        controller: 'MainAdminCtrl',
        templateUrl: '/views/admin/main.html'
    })
    .when('/brand/list', {
        controller: 'ItemAdminCtrl',
        templateUrl: '/views/admin/brand/list.html'
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