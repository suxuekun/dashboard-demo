;(function(_global){

	var app =angular.module('app',['gridstack-angular']);
	_global.app = app
	var config = {
		webRoot:"",
		api:"apis/"
	}

	app
	.config(function(){

	})
	.run(function($rootScope){
		$rootScope.config = config;

	})
	.controller('widget',function($scope,$http,$rootScope,$log,$q){
		console.log('wtf')
		$scope.options = {
			cellHeight: 40,
			width:12,
			verticalMargin: 10
		};
		$scope.myWidgetAPI = $rootScope.config.api+'mywidget.json';
		$scope.widgets=[{
			id:1,
			name:'test',
			url:'testwidget.html',
		},{
			id:2,
			name:'test2',
			url:'testwidget2.html',
		},{
			id:3,
			name:'test3',
			url:'testwidget3.html',
		}]
		$scope.dashboardWidgets=[{
			widget:1,
			x:0,
			y:0,
			width:2,
			height:6,
		}]

		
		// $scope.apis = [
		// 	{
		// 		api:$rootScope.config.api+'all.json',
		// 		handler:function(res){
		// 			$scope.widgets = res.data.result;
		// 		}
		// 	},{
		// 		api:$scope.myWidgetAPI,
		// 		handler:function(res){
		// 			$scope.dashboardWidgets = res.data;
		// 		}
		// 	}
			
		// ]
		// $scope.widgets is widgets avaliable for user
		// $scope.userWidgets is the widgets show on dashboard
		$scope.createDashboards = function(){
			$scope.userWidgets = []
			$scope.widget_idx = {}
			$scope.userWidget_idx = {}
			for (var key in $scope.widgets){
				var widget = $scope.widgets[key];
				$scope.widget_idx[widget.id] = widget;
				widget.url = $rootScope.config.webRoot+"widgets/" + widget.url
			}
			for (var key in $scope.dashboardWidgets){
				var dashboardWidget = $scope.dashboardWidgets[key]
				var widget = $scope.widget_idx[dashboardWidget.widget]
				$scope.userWidget_idx[dashboardWidget.id] = dashboardWidget
				if (widget){
					dashboardWidget.info = widget
					widget.checked = true;
					$scope.userWidgets.push(dashboardWidget)
				}
			}
			
		}
		$scope.toggleWidget = function(w){
			if (w.checked){
				$scope.widgetOff(w)
			}else{
				$scope.widgetOn(w)
			}
		}
		
		$scope.widgetOn = function(w){
			console.log('on',w)
			var userWidget = {
					x:0,y:0,width:4,height:6,
					widget:w.id,
					autopos:true,
					info:w
			}
			$scope.addUserWidget(userWidget)
	    }
		$scope.addUserWidget = function(userWidget){
			setTimeout(function(){
				
				$scope.userWidgets.push(userWidget);
				$scope.userWidget_idx[userWidget.id] = userWidget
				userWidget.info.checked = true;
				$scope.adding = true
				$scope.$apply()
				console.log($scope.userWidgets)
			},10)
			// var promise = $http({
			// 	url:$rootScope.config.api+"addUserWidget",
			// 	method:'post',
			// 	data:userWidget
			// })
			// promise.then(function(res){
				
			// 	userWidget.id = res.data.result.id;
			// 	userWidget.user = res.data.result.user;
			// 	$scope.userWidgets.push(userWidget);
			// 	$scope.userWidget_idx[userWidget.id] = userWidget
			// 	userWidget.info.checked = true;
			// 	$scope.adding = true
			// })
			// return promise
		}
		$scope.widgetOff = function(w){
			console.log('off',w)
			for (var key in $scope.userWidgets){
				var userWidget = $scope.userWidgets[key];
				if (userWidget.widget == w.id){
					$scope.removeWidget(userWidget)
					break;
				}
			}
			
		}
        $scope.removeWidget = function(userWidget) {

        	setTimeout(function(){
        		var index = $scope.userWidgets.indexOf(userWidget);
				userWidget.info.checked = false;
                $scope.userWidgets.splice(index, 1);
                console.log($scope.userWidgets)
                $scope.$apply()
        	},10)
        		
   //      	var promise = $http({
			// 	url:$scope.myWidgetAPI+userWidget.id+"/",
			// 	method:'delete',
			// })
			// promise.then(function(res){
			// 	var index = $scope.userWidgets.indexOf(userWidget);
			// 	userWidget.info.checked = false;
   //              $scope.userWidgets.splice(index, 1); 
			// })
			// return promise
        };
        
        $scope.updateWidget = function(widget,item){
            	widget.x = item.x
    			widget.y = item.y
    			widget.width = item.width
    			widget.height = item.height

    			// save position to backend

    			// $http({
    			// 	url:$scope.myWidgetAPI+widget.id +"/",
    			// 	method:'patch',
    			// 	data:widget,
    			// }).then(function(res){
    				
    			// })
        }
		
		
	    
	    
	    $scope.changeWidget = function(event,items){
		   
        		for (var key in items){
        			var item = items[key];
        			var elid = item.el[0].id;
        			var id = elid.substring(5)
        			var userWidget = $scope.userWidget_idx[id];
        		
        			$scope.updateWidget(userWidget,item)
        		}
	    	
	    }
	    
        $scope.onChange = function(event, items) {
        		
        		// so the initial setting will not fire a real change
        		// the initial setting will not update the widget
        		if ($scope.changing){
        			$scope.changeWidget(event,items)
        			$scope.changing = false
        		}
        			
           
        };
        $scope.onDragStart = function(event, ui) {
            $scope.changing = true
        };
        
        $scope.onResizeStart = function(event, ui) {
        		$scope.changing = true
        };
        $scope.onResizeStop = function(event, ui) {
        		
        };
        $scope.onDragStop = function(event, ui) {
    		
        };
        $scope.onItemAdded = function(userWidget,item) {
        		
        		if ($scope.adding){
        			$scope.adding = false;
        			$scope.updateWidget(userWidget,item)
        		}
        };
        $scope.onItemRemoved = function(item) {
        		
        };
		$scope.start = function(){
			
			// var promises = []
			// for (var key in $scope.apis){
			// 	var api = $scope.apis[key].api;
			// 	promises.push($http.get(api))
			// }
			// $q.all(promises).then(function(ress){
			// 	for (var key in ress){
			// 		var res = ress[key];
			// 		$scope.apis[key].handler(res)
			// 	}
			// 	
				
			// },function(res){
			// 	// something wrong
			// })
			$scope.createDashboards()
			
			
			
		}
		$scope.start()
	})
	
})(window)



