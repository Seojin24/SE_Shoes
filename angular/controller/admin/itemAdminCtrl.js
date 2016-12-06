app.controller('ItemAdminCtrl', ['$scope', '$q','$http', '$location', 'Upload','DTOptionsBuilder', 'DTColumnBuilder','$mdDialog', function($scope, $q, $http, $location, Upload ,DTOptionsBuilder, DTColumnBuilder,$mdDialog){
	$scope.initList = function(){
		$http.get('/rest/item').then(function(data){
			$scope.itemList = data.data;
		})

        $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(10)
        .withOption('bLengthChange', false);
	}

    $scope.initView = function(){

	}

	$scope.initAdd = function(){
		$q.all([
            $http.get('/rest/brand/'),
            $http.get('/rest/type/')
        ]).then(function(data){
            $scope.brandList = data[0].data;
            $scope.typeList = data[1].data;
        });
	}
	$scope.itemAddSubmit = function(file){
        file.upload = Upload.upload({
            url: '/rest/item',
            method: 'POST',
            fields: $scope.item,
            file: file,
            fileFormDataName: 'photo'
        });
        file.upload.then(function (response) {
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });
        file.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
        file.upload.success(function (data, status, headers, config) {
            // file is uploaded successfully
            alert('상품을 등록하였습니다.')
            $location.path("../");
        });
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


}]);

app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);