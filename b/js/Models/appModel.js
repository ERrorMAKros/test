/**
*	Application Model
*/

define(['backbone'], function(Backbone){

	var baseModel = Backbone.Model.extend({
		defaults: {
			type : "mainpage",
			action: "show"
		}
	});

	 return baseModel;
});

