app.controller('UserCtrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location){
	$scope.initCart = function(){
		$scope.sumPrice = 0;
		$http.get('/rest/cart').then(function(data){
			$scope.cartList = data.data;
			$scope.cartList.forEach(function(cart){
				$scope.sumPrice += cart.price
			});
		});
		$scope.order = {};
	}

	$scope.$watch('order.discount', function(newValue, oldValue){
        console.log(newValue+" "+oldValue);
        if(newValue > $rootScope.session.mileage) {
        	alert('보유 마일리지보다 크게 입력 하였습니다.');
        	$scope.order.discount = oldValue;
        }
        if(($scope.sumPrice - newValue) < 0) {
        	alert('총 가격보다 결제 가격이 더 낮을 수 없습니다.');
        	$scope.order.discount = oldValue;	
        }
       	else
	        $scope.order.price = $scope.sumPrice - newValue;

    })
	/*
	$scope.initOrder = function(){
		$http.get('/rest/order').then(function(data){
			$scope.orderList = data;
		});
	}*/

	$scope.addOrder = function(){
		var submit = {
			price:$scope.order.price,
			discount:$scope.order.discount,
			itemList:$scope.cartList
		};
		console.log(submit);
		$http.post('/rest/order',submit).then(function(data){
			console.log(data);
			if(data.data.error == false) {
				alert("주문이 완료되었습니다!");
				$location.path("/");
			}
		})
	}
}]);

app.config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  });