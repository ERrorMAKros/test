define( [

	'backbone' ,
	'helpers'

], function( Backbone , Helpers ) {
	return Backbone.View.extend({
		template: "login-tpl" ,
		initialize: function () {
			this.model.on( "onDBError" , this.onDBErrorEvent ) ;
			this.render() ;
		} ,
		render: function() {
			var compile = Helpers.compile( this.template ) ;

			this.$el.html( compile() ) ;
			this.$el.find( '.alert' ).css( "display" , 'none' ) ;

			return this ;
		} ,
		events: {
			submit: function( event ) {

				event.preventDefault() ;

				var fields = $( event.currentTarget ).find( 'input[data-set]' ) ;
				var data = Helpers.getFormVariables( fields , 'data-set') ;

				this.trigger( "onRequest" , data , this ) ;
			}
		} ,
		destructor: function() {
			this.model.off( "onDBError" , this.onDBErrorEvent ) ;
			this.remove() ;
		} ,
		onDBErrorEvent:function( message ) {
			/* error */ console.error( "Login() onDBErrorEvent([ message ])" , message );
			if( message ) $( ".alert" ).css( "display" , 'block' ).text( message ) ;
		} 
	})
});
