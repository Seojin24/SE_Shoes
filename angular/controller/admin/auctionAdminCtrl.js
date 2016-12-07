app.controller('AuctionAdminCtrl', ['$scope', '$q','$http', 'Upload','DTOptionsBuilder', 'DTColumnBuilder','$mdDialog', function($scope, $q, $http, Upload, DTOptionsBuilder, DTColumnBuilder,$mdDialog){
    $scope.initList = function(){
        $http.get('/rest/auction').then(function(data){
            $scope.auctionList = data.data;
            
            for(i=0; i<$scope.auctionList.length; i++)
                $scope.auctionList[i].endSecond = new Date($scope.auctionList[i].auctionEnd)/1;
        })

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