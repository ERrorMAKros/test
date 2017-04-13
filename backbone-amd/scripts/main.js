require.config({
	paths: {
		"jquery": 'vendor/jquery.3.0.0' ,
		"underscore": 'vendor/underscore.1.8.3' ,
		"backbone": 'vendor/backbone.1.3.3' ,
		"Application" : 'views/application' ,
		"SubClass" : 'views/subclass' ,
	}
}) ;

require( [ "Application" ] , function( Application ) {
	/* debug */ console.info( 'Main()' ) ;
	new Application() ;
} ) ;