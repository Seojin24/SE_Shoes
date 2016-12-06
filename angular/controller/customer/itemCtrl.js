app.controller('ItemCtrl', ['$scope','$http','$location', '$routeParams', '$sce','$q', function($scope, $http, $location, $routeParams, $sce, $q){
    $scope.orderFilter ="";
    $scope.itemList = [{name:'Bq Aquaris 5 16GB White',price:249.99,image:'assets/img/demo/e_img03.jpg'},
                        {name:'LG 55LA620S 55" LED 3D',price:999.99,image:'assets/img/demo/e_img07.jpg'},
                        {name:'Iphone 5S',price:649.00,image:'assets/img/demo/e_img01.jpg'},
                        {name:'Keyboard Pro Game',price:49.99,image:'assets/img/demo/e_img02.jpg'},
                        {name:'Doogee Voyager DG300 Black',price:99.99,image:'assets/img/demo/e_img04.jpg'},
                        {name:'Gigabyte GeForce GTX 660',price:224.00,image:'assets/img/demo/e_img05.jpg'}];

    $scope.item = {
        id : 1,
        title : '신발',
        size : 280,
        price : 17000,
        photo : 'assets/img/demo/e_img07.jpg',
        explain : '참 조은 신발',
        ItemBrandName : '나이끼',
        ItemBrandId : 1,
        ItemTypeName : '운동화',
        ItemTypeId : 2
    }

    //item/view 페이지 initialize
    $scope.initView = function(){
        console.log('success_view');

        /*$http.get('/rest/item/'+$routeParams.itemId).then(function(data){
            $scope.item = data;
            $scope.item.explain = $sce.trustAsHtml($scope.item.explain);
        });*/
        //cookies에 방문 추가
    }

    //item/list 페이지 initialize
    //cookies에서 방문한곳 리스팅(limit 4), brandList, typeList, itemList
    $scope.initList = function(){
        console.log('success_list');

        $q.all([
            $http.get('/rest/brand/'),
            $http.get('/rest/type/'),
            $http.get('/rest/item/')
        ]).then(function(data){
            $scope.brandList = data[0].data;
            $scope.typeList = data[1].data;
            $scope.itemList = data[2].data;
        });
    };

    $scope.setBrand=function(brand){
        if(brand){$scope.brandFilter=brand.id;}else{$scope.brandFilter='';}
    }
    $scope.setType=function(type){
        if(type){$scope.typeFilter=type.id;}else{$scope.typeFilter='';}
    }



    $scope.addCart = function(itemId){
        $http.post('/rest/cart/',{ItemId:itemId}).then(function(data){
            console.log(data);
            if(data.data.error == false){
                alert('상품을 장바구니에 담았습니다.');
            }
            else{
                console.log(data);
                if(data.data.msg == 'doLogin')
                    $location.path("#/signin")  
            } 
        });
    };


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