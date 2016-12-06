var app = angular.module('adminApp', [
    'ngRoute',
    'ngAnimate',
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
    //auction
    .when('/auction/list/:type', {
        controller: 'BoardAdminCtrl',
        templateUrl: '/views/admin/auction/list.html'
    })
    .when('/auction/add/:type', {
        controller: 'BoardAdminCtrl',
        templateUrl: '/views/admin/auction/add.html'
    })
    //board
    .when('/board/list/:type', {
        controller: 'BoardAdminCtrl',
        templateUrl: '/views/admin/board/list.html'
    })
    .when('/board/add/:type', {
        controller: 'BoardAdminCtrl',
        templateUrl: '/views/admin/board/add.html'
    })
    .when('/board/view/:type/:boardId', {
        controller: 'BoardAdminCtrl',
        templateUrl: '/views/admin/board/view.html'
    })
    .when('/board/modify/:type/:boardId', {
        controller: 'BoardAdminCtrl',
        templateUrl: '/views/admin/board/modify.html'
    })
    //item
    .when('/item/list/', {
        controller: 'ItemAdminCtrl',
        templateUrl: '/views/admin/item/list.html'
    })
    .when('/item/add/', {
        controller: 'ItemAdminCtrl',
        templateUrl: '/views/admin/item/add.html'
    })
    .when('/item/view/:itemId', {
        controller: 'ItemAdminCtrl',
        templateUrl: '/views/admin/item/view.html'
    })
    .when('/item/modify/:boardId', {
        controller: 'ItemAdminCtrl',
        templateUrl: '/views/admin/item/modify.html'
    })
    //brand
    .when('/brand/list', {
        controller: 'ItemAdminCtrl',
        templateUrl: '/views/admin/brand/list.html'
    })
    .when('/brand/add', {
        controller: 'ItemAdminCtrl',
        templateUrl: '/views/admin/brand/add.html'
    })
    //type
    .when('/type/list', {
        controller: 'ItemAdminCtrl',
        templateUrl: '/views/admin/type/list.html'
    })
    .when('/type/add', {
        controller: 'ItemAdminCtrl',
        templateUrl: '/views/admin/type/list.html'
    })
    //order
    .when('/order/list', {
        controller: 'OrderAdminCtrl',
        templateUrl: '/views/admin/order/list.html'
    })
    .when('/order/view/:orderId', {
        controller: 'OrderAdminCtrl',
        templateUrl: '/views/admin/order/view.html'
    })
    .when('/order/statistics', {
        controller: 'OrderAdminCtrl',
        templateUrl: '/views/admin/order/statistics.html'
    })
    //popup
    .when('/popup/list', {
        controller: 'PopupAdminCtrl',
        templateUrl: '/views/admin/popup/list.html'
    })
    .when('/popup/add', {
        controller: 'PopupAdminCtrl',
        templateUrl: '/views/admin/popup/add.html'
    })
    .when('/popup/modify/:popupId', {
        controller: 'PopupAdminCtrl',
        templateUrl: '/views/admin/popup/modify.html'
    })
    //user
    .when('/user/list', {
        controller: 'UserAdminCtrl',
        templateUrl: '/views/admin/user/list.html'
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