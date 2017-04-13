define( [ 

	'backbone' , 
	'underscore' , 
	'jquery', 
	'bootstrap' ,
	'helpers'

], function( Backbone , _ , $ , Bootstrap , Helpers ) {
	return Backbone.View.extend({
		el: "#index" ,
		template: "index-tpl" ,
		initialize: function () {
			this.render() ;
		} ,
		render: function() {
			var html = Helpers.compile( this.template ) ;
			this.$el.html( html( this.model.toJSON() ) ) ;
			return this ;
		}
	})
});
