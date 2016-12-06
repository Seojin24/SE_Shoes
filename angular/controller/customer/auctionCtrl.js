app.controller('AuctionCtrl', ['$scope','$http','$location', '$routeParams', '$sce','$q', '$mdDialog', function($scope, $http, $location, $routeParams, $sce, $q, $mdDialog){
    $scope.orderFilter ="";
    $scope.auctionList = [{
        id : 1,
        title : '신발',
        size : 280,
        price : 17000,
        bidPrice : 10000,
        photo : 'assets/img/demo/e_img07.jpg',
        explain : '참 조은 신발',
        brandName : '나이끼',
        typeName : '운동화',
        itemId : 1,
        auctionStart : '2016-12-03',
        auctionEnd : '2016-12-09'
    }]

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

        /*$q.all([
            $http.get('/rest/item/'),
            $http.get('/rest/brand/'),
            $http.get('/rest/type/')
        ]).then(function(data){
            $scope.itemList = data[0];
            $scope.brandList = data[1];
            $scope.typeList = data[2];
        });*/
    }

    $scope.bid = function(bidPrice) {
        console.log(1);
    }

    $scope.showPrompt = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
          .title('What would you name your dog?')
          .textContent('Bowser is a common name.')
          .placeholder('Dog name')
          .ariaLabel('Dog name')
          .initialValue('Buddy')
          .targetEvent(ev)
          .ok('Okay!')
          .cancel('I\'m a cat person');

        $mdDialog.show(confirm).then(function(result) {
          $scope.status = 'You decided to name your dog ' + result + '.';
        }, function() {
          $scope.status = 'You didn\'t name your dog.';
    });
  };
}]);