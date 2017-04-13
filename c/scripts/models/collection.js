define([ 

	'backbone' ,
	'dataset' ,

], function( Backbone , MDataSet ) {
	return Backbone.Collection.extend({
		model: MDataSet
	}) ;
});

