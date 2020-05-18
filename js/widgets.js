;(function(_global){
	var widgets_root = "/html/widgets/"
	var app = _global.app;
	app.controller('t1ctrl',function($scope){
		console.log('t1 loaded',$scope)
		$scope.a = 'wtf'
	})
	app.controller('t2ctrl',function($scope){
		console.log('t2 loaded',$scope)
		$scope.a = 'wtf t2'
	})
	app.controller('t3ctrl',function($scope){
		console.log('t3 loaded')
		$scope.a = 'wtf t3'
	})
	
	
})(window)