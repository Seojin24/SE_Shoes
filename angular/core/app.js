var app = angular.module('mainApp', [
    'ngRoute',
    'ngAnimate',
    'ngMaterial',
    'ngMessages'
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
        controller: 'MainCtrl',
        templateUrl: '/views/customer/main.html'
    })
    .when('/signin', {
        controller: 'MainCtrl',
        templateUrl: '/views/customer/signin.html'
    })
    .when('/signup', {
        controller: 'MainCtrl',
        templateUrl: '/views/customer/signin.html'
    })
    .when('/finding', {
        controller: 'MainCtrl',
        templateUrl: '/views/customer/signin.html'
    })
    .when('/item/list', {
        controller: 'ItemCtrl',
        templateUrl: '/views/customer/item/list.html'
    })
    .when('/item/view/:itemId', {
        controller: 'ItemCtrl',
        templateUrl: '/views/customer/item/view.html'
    })
    .when('/auction/list', {
        controller: 'AuctionCtrl',
        templateUrl: '/views/customer/auction/list.html'
    })
    .when('/auction/view/:itemId', {
        /*controller: 'ItemCtrl',*/
        templateUrl: '/views/customer/auction/view.html'
    })
    .when('/board/list/:type', {
        /*controller: 'ItemCtrl',*/
        templateUrl: '/views/customer/board/list.html'
    })
    .when('/board/view/:type/:boardId', {
        /*controller: 'ItemCtrl',*/
        templateUrl: '/views/customer/board/view.html'
    })
    .when('/user/cart', {
        /*controller: 'MainCtrl',*/
        templateUrl: '/views/customer/user/cart.html'
    })
    .when('/user/order', {
        controller: 'UserCtrl',
        templateUrl: '/views/customer/user/order.html'
    })
    .when('/user/modify', {
        controller: 'UserCtrl',
        templateUrl: '/views/customer/user/modify.html'
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