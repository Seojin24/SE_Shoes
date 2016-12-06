app.controller('ItemAdminCtrl', ['$scope', '$q','$http', 'Upload','DTOptionsBuilder', 'DTColumnBuilder','$mdDialog', function($scope, $q, $http, Upload,DTOptionsBuilder, DTColumnBuilder,$mdDialog){
	$scope.initList = function(){
		$scope.itemList = [{name:'Bq Aquaris 5 16GB White',price:249.99,image:'assets/img/demo/e_img03.jpg'},
                        {name:'LG 55LA620S 55" LED 3D',price:999.99,image:'assets/img/demo/e_img07.jpg'},
                        {name:'Iphone 5S',price:649.00,image:'assets/img/demo/e_img01.jpg'},
                        {name:'Keyboard Pro Game',price:49.99,image:'assets/img/demo/e_img02.jpg'},
                        {name:'Doogee Voyager DG300 Black',price:99.99,image:'assets/img/demo/e_img04.jpg'},
                        {name:'Gigabyte GeForce GTX 660',price:224.00,image:'assets/img/demo/e_img05.jpg'}];
	
        $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(10)
        .withOption('bLengthChange', false);
	}

    $scope.brandList=[
        {id:1,
            title:"나이끼"},{
            id:2,
            title:"푸먀"
        }
    ];

    $scope.typeList=[
        {id:1,
            name:"타입1"},
        {
            id:2,
            name:"타입2"
        }
    ];



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

	$scope.itemAddSubmit = function(){
		console.log($scope.item);

		/*$scope.uploadPic = function (file) {
        file.upload = Upload.upload({
            url: '/slide',
            method: 'POST',
            fields: {
                title: $scope.title,
                link: $scope.link,
                seq: $scope.number
            },
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
            $location.path("/slide/list");
        });}*/
        
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