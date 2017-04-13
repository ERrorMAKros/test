angular.module( "Main" ).directive( "usersMod" , 
	function() {
		return {
			scope: {
			  id: "@" ,
			  class: "@"
			},
			restrict: "ECA",
			template: '<div>#{{ id }} {{ class }}</div>' ,
			controller:  [
				'$scope' , 
				'$attrs' , 
				'$compile', 
				function( $scope , $attrs , $http , $compile ) {
					/* debug */ console.warn( "usersmod → controller → [ $scope , element , $attrs ]" , { 
						$scope: $scope , 
						$attrs: $attrs , 
					} ) ; 
				}
			] ,
			link: function( $scope , element , $attrs ) {
				/* debug */ console.warn( "usersmod → link → [ $scope , element , $attrs ]" , { 
					$scope: $scope , 
					$attrs: $attrs , 
					element: element
				} ) ;
			} ,
		};
	}
) ;