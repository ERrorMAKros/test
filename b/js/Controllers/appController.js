/*
 *	Application Controller
 */

define(['backbone'], function(Backbone){

	var Controller = Backbone.Router.extend({
			initialize: function( options ) {
				this.appModel = options.model;
			},
			routes: {
				"": "showMainPage", 
				"result": "showResultPage", 
				"page/:page": "showPage"
			},
			showMainPage: function() {
				this.appModel.set({ type: "mainpage", page: 0 });
			},
			showResultPage: function() {
				this.appModel.set({ type: "resultpage", page: 0 });
			},
			showPage: function( index ) {
				this.appModel.set({ type: "page", page: index });
			},
	})

	return Controller;
});
	
