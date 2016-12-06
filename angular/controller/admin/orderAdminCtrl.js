app.controller('OrderAdminCtrl', ['$scope', '$q','$http', 'Upload','DTOptionsBuilder', 'DTColumnBuilder','$mdDialog', function($scope, $q, $http, Upload,DTOptionsBuilder, DTColumnBuilder,$mdDialog){
    $scope.initList = function(){
        $scope.orderList = [
            {id:'ORD93746SORNC',price:249.99,discount:100},
            {id:'ORD94WKTNV823',price:249.99,discount:100},
            {id:'ORDEWFFS057DK',price:249.99,discount:100},
            {id:'ORDCP499057DK',price:249.99,discount:100},
            {id:'ORD3RJ29057DK',price:249.99,discount:100}
        ];
    };

    $scope.initView = function(){

    };

   /* $scope.initAdd = function(){
        $q.all([
            $http.get('/rest/brand/'),
            $http.get('/rest/type/')
        ]).then(function(data){
            $scope.brandList = data[0].data;
            $scope.typeList = data[1].data;
        });
    }

    $scope.itemAddSubmit = function(){
        console.log($scope.item);



    }

    $scope.brandAdd = function(ev, brand) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('추가할 브랜드 명을 입력 하십시오.')
            .placeholder('브랜드이름')
            .ariaLabel('Brand title')
            .targetEvent(ev)
            .ok('추가')
            .cancel('취소');

        $mdDialog.show(confirm).then(function(result) {
            if(result==null||result=="")
            {
                alert('다시 입력해주십시요.');
            }
            else{
                alert('성공적으로 추가하였습니다.');
                brand.title = result;
            }
        }, function() {
        });
    };

    $scope.brandModify = function(ev, brand) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('변경할 브랜드 명을 입력 하십시오.')
            // .textContent('현재 입찰금 보다 높은 금액을 입력 해야합니다.')
            .placeholder('Brand title')
            .ariaLabel('Brand title')
            .initialValue(brand.title)
            .targetEvent(ev)
            .ok('변경')
            .cancel('취소');

        $mdDialog.show(confirm).then(function(result) {
            if(result==null||result=="")
            {
                alert('다시 입력해주십시요.');
            }
            else{
                alert('성공적으로 변경하였습니다..');
                brand.title = result;
            }
        }, function() {
        });
    };




    $scope.typeAdd = function(ev, type) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('추가할 타입 명을 입력 하십시오.')
            .placeholder('타입이름')
            .ariaLabel('Type name')
            .targetEvent(ev)
            .ok('추가')
            .cancel('취소');

        $mdDialog.show(confirm).then(function(result) {
            if(result==null||result=="")
            {
                alert('다시 입력해주십시요.');
            }
            else{
                alert('성공적으로 추가하였습니다.');
                type.name = result;
            }
        }, function() {
        });
    };

    $scope.typeModify = function(ev, type) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('변경할 타입 명을 입력 하십시오.')
            // .textContent('현재 입찰금 보다 높은 금액을 입력 해야합니다.')
            .placeholder('Type title')
            .ariaLabel('Type title')
            .initialValue(type.name)
            .targetEvent(ev)
            .ok('변경')
            .cancel('취소');

        $mdDialog.show(confirm).then(function(result) {
            if(result==null||result=="")
            {
                alert('다시 입력해주십시요.');
            }
            else{
                alert('성공적으로 변경하였습니다..');
                type.name = result;
            }
        }, function() {
        });
    };
*/

}]);