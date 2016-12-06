app.controller('MainCtrl', ['$scope', '$rootScope', '$http', '$location', '$mdSidenav', '$timeout', function($scope, $rootScope, $http, $location, $mdSidenav, $timeout){
    $scope.orderFilter ="";
    $scope.itemList = [{name:'Bq Aquaris 5 16GB White',price:249.99,image:'assets/img/demo/e_img03.jpg'},
                        {name:'LG 55LA620S 55" LED 3D',price:999.99,image:'assets/img/demo/e_img07.jpg'},
                        {name:'Iphone 5S',price:649.00,image:'assets/img/demo/e_img01.jpg'},
                        {name:'Keyboard Pro Game',price:49.99,image:'assets/img/demo/e_img02.jpg'},
                        {name:'Doogee Voyager DG300 Black',price:99.99,image:'assets/img/demo/e_img04.jpg'},
                        {name:'Gigabyte GeForce GTX 660',price:224.00,image:'assets/img/demo/e_img05.jpg'}];

    //for right-side hamburger toggle in nav.html
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }
    $scope.initMain = function() {
        //popupList 불러오기
        /*$http.get('/popup/today').success(function (res) {
            res.forEach( function (popup) {
                $scope.popupList.push(popup);
                for(var i=0; i<disabledPopup.length; i++) {
                    if( disabledPopup[i] == popup.id ) {
                        $scope.popupList.pop();
                        break;
                    }
                }
            });
        });*/
    }

    /*$scope.closePopup = function(popup_idx, popupId) {
        angular.element('#popup'+popup_idx).hide();
    }

    $scope.closePopupDay = function(popup_idx, popupId) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate()+1);

        var popupCookie = $cookies.getObject('popup');
        if( popupCookie == null )
            popupCookie = [];

        popupCookie.push(popupId, {expires: expireDate});

        $cookies.putObject('popup', popupCookie);
        angular.element('#popup'+popup_idx).hide();
    }*/

    angular.element(document).ready(function(){
        //document.ready 전에 일어나는걸 막는? setTimeout에 감싸야함.
            setTimeout(function(){
                angular.element('#bx5').bxSlider({
                    minSlides: 2,
                    maxSlides: 3,
                    slideWidth: 360,
                    slideMargin: 10,
                    pager: false,
                    ticker: true,
                    speed: 12000,
                    tickerHover: true,
                    useCSS: false
                });
                angular.element('#bx1').bxSlider({
                    adaptiveHeight: true
                });
            });
        });
    

    //for signin, signup, finding
    $scope.initLoginForm = function() {
        if($rootScope.session)
            $location.path( "/" );
        var path = $location.path();
        $scope.tabSelected=-1;
        if(path == '/signin')
            $scope.tabSelected = 0;
        else if(path == '/signup')
            $scope.tabSelected = 1;
        else if(path == '/finding')
            $scope.tabSelected = 2;
    }

    $scope.registrySubmit = function() {
        if($scope.signUpPassword != $scope.confirmPassword) {
            alert("두 비밀번호가 일치하지 않습니다.");
            return;
        }
        else {
            var submit = {
                email:$scope.signUpEmail,
                name:$scope.signUpName,
                password:$scope.signUpPassword,
                phone:$scope.signUpPhone,
                address:$scope.signUpAddress
            }
            $http.post('/rest/user',submit).success(function(data){
                if(data.error == false) {
                    alert('회원가입이 완료되었습니다!');
                    $location.path("/");
                }
            })
        }

    }

    $scope.loginSubmit = function(){
        var submit = {
            email: $scope.signInEmail,
            password: $scope.signInPassword
        };

        $http.post('/login',submit).success(function( data ){
            if( data.error !== true ) {
              $rootScope.session = data;
              $location.path( "/" );
            }
            else {
              alert("ID 또는 비밀번호가 올바르지 않습니다.");
              $scope.signInEmail = "";
              $scope.signInPassword = "";
            }
        });
    };

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