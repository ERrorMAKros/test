/*
 *	Controller
 */

define([

	'backbone' ,

], function( Backbone ) {
	return Backbone.Router.extend({

		initialize: function( options ) {

			this.options = options.model ;
			setTimeout( function() {
				Backbone.history.loadUrl() ;
			} , 256 , Backbone ) ;
		},
		routes: {
			"": function() {} , 
			"login": function() {} , 
			"registration": function() {} , 
		}
	}) ;
});