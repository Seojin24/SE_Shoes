app.controller('UserCtrl', ['$scope', '$http', function($scope, $http){
	$scope.initCart = function(){
		$scope.sumPrice = 0;
		$http.get('/rest/cart').then(function(data){
			$scope.cartList = data.data;
			$scope.cartList.forEach(function(cart){
				$scope.sumPrice += cart.price
			});
		});
	}
	/*
	$scope.initOrder = function(){
		$http.get('/rest/order').then(function(data){
			$scope.orderList = data;
		});
	}

	$scope.addOrder = function(){
		var submit={};
		$http.post('/rest/order',submit).then(function(data){
		});
	}*/
}]);

app.config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  });