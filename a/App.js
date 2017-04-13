angular.module( "Main" ).directive( 'application' , function( $compile )
{
	return {
		restrict: "E" ,
		template:  [
			'<div ng-init="initialize()">' ,
				'<div ng-if="data" ng-repeat="item in data" id="{{ item.id }}" ng-class="item.class">{{ item.name }}</div>' ,
			'</div>'
		].join( "\n" ) ,
		link: function( $scope , element , $attrs ) {
			/* debug */ console.info( "application → [ $scope , element , $attrs ]" , { 
				$scope: $scope , 
				$attrs: $attrs , 
				element: element
			} ) ;
		} ,
		controller: [ 
			'$scope' , 
			'$attrs' , 
			'$timeout' ,
			function( $scope , $attrs , $timeout )
			{
				//
				/* debug */ console.info( "application → controller → [ scope , attrs ]" , { $scope: $scope , $attrs: $attrs } ) ;
				//
				function initialize() {
					//
					/* debug */ console.log( "application → controller → initialize" ) ;
					//
					// Данные приехали позже
					//
					$timeout(
						function() {
						//
						/* debug */ console.warn( "application → controller → initialize → [ * ]" , Main.data ) ;
						//
						$scope.data = Main.data ;
						//
					} , 100 ) ;
				} ;
				//
				$scope.data = null ; // will be latter..
				$scope.initialize = initialize ;
			} 
		]
	}
} ) ;	