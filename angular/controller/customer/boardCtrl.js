app.controller('BoardCtrl', ['$scope','$routeParams', '$http', function($scope, $routeParams, $http){
	/*$scope.initList = function(){
		$http({
	        url: '/rest/board/list/', 
	        method: "GET",
	        params: {
	            type: $routeParams.type            
	        }
	    }).then(function(data){
			$scope.boardList = data;
	    })
	}

	$scope.initView = function(){
		$http.get('/rest/board/post/'+$routeParams.boardId).then(function(data){
			$scope.board = data;
		});
	}

	$scope.initModify = function(){
		var submit={};
		$http.post('/rest/order',submit).then(function(data){
		});
	}
	
	$scope.modifyBoard = function(){
		var submit={};
		$http.post('/rest/order',submit).then(function(data){
		});
	}

	$scope.insertBoard = function(){
		var submit={};
		$http.post('/rest/order',submit).then(function(data){
		});
	}

	$scope.deleteBoard = function(){
		var submit={};
		$http.post('/rest/order',submit).then(function(data){
		});
	}
	*/
}]);

app.config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  });