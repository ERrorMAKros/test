/**
*	Application object
*/

define( [
	'appModels/appModel', 
	'appViews/appView', 
	'appControllers/appController', 
	'jquery', 
	'backbone'
], function(baseModel, View, Controller, $, Backbone) {

	var Application = (function() {

		var self = null;

		var appController;
		var appModel;
		var appView;
		var appTemplates = {
			"mainpage": _.template($('#main-page').html()),
			"page": _.template($('#page').html()),
		};

		// Constructor
		var module = function() {
			self = this;
		};

		// Methods
		module.prototype = {
			constructor: module,
			init: function() {
				self.initModel() ;
				self.initView() ;
				self.initRouter() ;
			},
			initRouter: function() {
				appController = new Controller({ model: appModel});
				Backbone.history.start();
			},

			initView: function() {
				appView = new View({ model: appModel, templates: appTemplates, el: $("#main-content")});
				appModel.trigger("change");
			},

			initModel: function() {
				appModel = new baseModel();
			},
		};
		
		return module;
	})();

	return Application;
});

