define([ 

	'backbone'
	
], function( Backbone ) {
	return Backbone.Model.extend({
		defaults: {
			id: null ,
			username: null ,
			password: null
		}
	}) ;
});

