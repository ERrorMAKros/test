require.config({
	baseUrl: './scripts',
	shim: {
		bootstrap: { deps :[ 'jquery' ] }
	},
	paths: {
		jquery: 'vendors/jquery.2.2.4' ,
		underscore: 'vendors/underscore.1.8.3' ,
		backbone: 'vendors/backbone.1.3.3' ,
		bootstrap: 'vendors/bootstrap.3.3.6' ,
		md5: 'vendors/md5' ,
		helpers: 'vendors/helpers' ,
		users: './models/users' ,
		dataset: './models/dataset' ,
		collection: './models/collection' ,
		view: './views' ,
		controller: './controllers/controller' ,
	} ,
}) ;

require([ "application" ], function( Application ) {
	$( document ).ready( function() {
		var application = new Application() ;
		application.build() ;
	});
} ) ;