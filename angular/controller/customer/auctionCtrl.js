app.controller('AuctionCtrl', ['$scope','$http','$location', '$routeParams', '$sce','$q', '$mdDialog', function($scope, $http, $location, $routeParams, $sce, $q, $mdDialog){
    $scope.orderFilter ="";

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
        $q.all([
            $http.get('/rest/brand/'),
            $http.get('/rest/type/'),
            $http.get('/rest/auction/')
        ]).then(function(data){
            $scope.brandList = data[0].data;
            $scope.typeList = data[1].data;
            $scope.auctionList = data[2].data;

            for(i=0; i<$scope.auctionList.length; i++)
                $scope.auctionList[i].endSecond = new Date($scope.auctionList[i].auctionEnd)/1;
        });
    }

    $scope.setBrand=function(brand){
        if(brand) {
            $scope.brandFilter=brand.id;
        }
        else {
            $scope.brandFilter='';
        }
    }
    $scope.setType=function(type){
        if(type) {
            $scope.typeFilter=type.id;
        }
        else {
            $scope.typeFilter='';
        }
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