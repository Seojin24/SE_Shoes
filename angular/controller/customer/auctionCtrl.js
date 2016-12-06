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
    $scope.bid = function(ev, auction) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
          .title('입찰금을 입력 하십시오.')
          .textContent('현재 입찰금 보다 높은 금액을 입력 해야합니다.')
          .placeholder('Bid price')
          .ariaLabel('Bid price')
          .initialValue(auction.bidPrice+5)
          .targetEvent(ev)
          .ok('입찰')
          .cancel('취소');

        $mdDialog.show(confirm).then(function(result) {
            if(Number.isInteger(parseInt(result)))
            {
                result = parseInt(result);
                if(auction.bidPrice < result){
                    alert('성공적으로 입찰을 하였습니다.');
                    auction.bidPrice = result;

                    /*$http.put('/rest/auction/'+auction.id,{bidPrice:result})
                    .then(function(data){
                        if(data.error == false){
                            alert('성공적으로 입찰을 하였습니다.');
                            auction.bidPrice = result;
                        }
                        else
                            alert('입찰 중에 오류가 발생하였습니다. 다시 시도 해주십시오.');
                    });*/
                }
                else {
                    alert('현재 입찰금 보다 금액이 적습니다.');
                }
            }
            }, function() {
            });
        };
}]);