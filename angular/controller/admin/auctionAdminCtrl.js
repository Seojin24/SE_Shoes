app.controller('AuctionAdminCtrl', ['$scope', '$q','$http', 'Upload','DTOptionsBuilder', 'DTColumnBuilder','$mdDialog', function($scope, $q, $http, Upload, DTOptionsBuilder, DTColumnBuilder,$mdDialog){
    $scope.initList = function(){
        $scope.auctionList = [
            {name:'갤럭시4',bidPrice:249.99,auctionStart:'2016-09-03',auctionEnd:'2016-12-08', endSecond:1481155200000},
            {name:'갤럭시7',bidPrice:249.99,auctionStart:'2016-09-03',auctionEnd:'2016-11-28', endSecond:1481155200000},
            {name:'고구마7',bidPrice:249.99,auctionStart:'2016-09-03',auctionEnd:'2016-11-28', endSecond:1481155200000},
            {name:'고구마4',bidPrice:249.99,auctionStart:'2016-09-03',auctionEnd:'2016-11-28', endSecond:1481155200000},
            {name:'계란라면',bidPrice:249.99,auctionStart:'2016-09-03',auctionEnd:'2016-11-28', endSecond:1481155200000},
            {name:'썬더치킨',bidPrice:249.99,auctionStart:'2016-09-03',auctionEnd:'2016-11-28', endSecond:1481155200000},
            {name:'토마토',bidPrice:249.99,auctionStart:'2016-09-03',auctionEnd:'2016-11-28', endSecond:1481155200000}  
        ];

        $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(10)
        .withOption('bLengthChange', false);
    }

    $scope.initView = function(){

    }

    $scope.initAdd = function(){
        $http.get('/rest/item').then(function(data){
            $scope.itemList = data.data;
        })
    }

    $scope.addAuction = function(){
        $scope.auction.ItemId = $scope.item.ItemId;
        console.log($scope.auction);
        $http.post('/rest/auction/admin',$scope.auction).then(function(data){
            console.log(data);
        })
    }

    $scope.$watch('item.idx', function(newValue, oldValue){
        if(newValue) {
            $scope.item.ItemId = $scope.itemList[newValue].id;
            $scope.item.photo = $scope.itemList[newValue].photo;
        }
    })
}]);