define( [ "backbone" , "jquery" , "SubClass" ], function ( Backbone , $ , SubClass ) {
		return Backbone.View.extend({
			el: "#info" , 
			initialize: function () {
				/* debug */ console.info( 'Application([ SubClass ])' , SubClass ) ;
				this.$el.html( "Application() " + SubClass ) ;
			}
		});
	}
) ;