app.controller('MainCtrl', ['$scope', '$mdSidenav', '$timeout', function($scope, $mdSidenav, $timeout){
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
        });
    });
}]);