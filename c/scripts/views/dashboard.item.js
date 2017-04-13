define(
[
	'jquery' ,
	'backbone' ,
	'helpers' ,

], function( $ , Backbone , Helpers ) {
	return Backbone.View.extend({
		tagName: "div" ,
		className: "db-item navbar-form" ,
		template: [ 
			'<div class="form-group hidden">' ,
				'<input data-set="id" type="text" class="form-control">' ,
			'</div>' ,
			'<div class="form-group">' ,
				'<input data-set="username" type="email" class="form-control" placeholder="email">' ,
			'</div>' ,
			'<div class="form-group">' ,
				'<input data-set="password" type="password" class="form-control" placeholder="password">' ,
			'</div>' ,
			'<button id="add" class="btn btn-success"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>' ,
			'<button id="remove" class="btn btn-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>' ,
			'<span id="unlock" class="btn glyphicon glyphicon-eye-close" aria-hidden="true"></span>' ,
		].join( "\n" ) ,
		render: function( options ) {
			this.$el.html( this.template ) ;
			if( options ) {
				if( ! options.add ) { this.$el.find( "#add" ).css( "display" , 'none' ) ; } ;
				if( ! options.remove ) { this.$el.find( "#remove" ).css( "display" , 'none' ) ; } ;
				if( ! options.unlock ) { this.$el.find( "#unlock" ).css( "display" , 'none' ) ; } ;
			} ;

			for( var index in this.model.attributes ) {
				var value = this.model.attributes[ index ] ;
				var element = this.$el.find( 'input[data-set="' + index + '"]' ) ;
				element.val( value ) ;
			} ;

			return this ;
		} ,
		events: {
			"click #unlock": function( event ) {
				var variants = {
					open: {
						icon: "glyphicon-eye-open" ,
						type: "password"
					} ,
					close: {
						icon: "glyphicon-eye-close" ,
						type: "text"
					}
				} ;
				var element = $( event.currentTarget ) ;
				if( element.hasClass( variants.close.icon ) ) {
					element.removeClass( variants.close.icon ).addClass( variants.open.icon ) ;
					this.$el.find( '[data-set="password"]').attr("type" , variants.open ) ;
				} else {
					element.addClass( variants.close.icon ).removeClass( variants.open.icon ) ;
					this.$el.find( '[data-set="password"]').attr("type" , variants.close ) ;
				} ;
			} ,
			"click #add": function( event ) { 
				this.onButtonEvent( event ) ; 
			} ,
			"click #remove": function( event ) { 
				if( this.model.attributes.id && this.collection ) {
					var data = this.getAllFieldsData() ;
					var id = this.model.attributes.id ;
					var record = this.collection.findWhere( { id: id }) ;
					this.collection.remove( record ) ;
					this.remove() ;
				} ;
			} ,
			"input": function( event ) { 
				if( this.model.attributes.id && this.collection ) {
					var data = this.getAllFieldsData() ;
					var id = this.model.attributes.id ;
					var record = this.collection.findWhere( { id: id }) ;
					record.set( data ) ;
				} ;
			} ,
		} ,
		getAllFieldsData: function() {
			var fields = this.$el.find( 'input[data-set]' ) ;
			return Helpers.getFormVariables( fields , 'data-set' ) ;
		} ,
		fireAction: function( action , data ) {
			var result = { action: action , data: data  } ;
			this.trigger( "action" , result , this ) ;
		} ,
		fireError: function( message ) {
			this.trigger( "error" , message , this ) ;
		} ,
		onButtonEvent: function( event ) {

			event.preventDefault() ;

			var element = $( event.currentTarget ) ;
			var action = element.attr( "id" ) ;
			var data = this.getAllFieldsData() ;

			this.model.set( data , { validate: true } ) ;

			!	data || data && ! data.username || data && ! data.password
			?	this.fireError( "All fields must be entered" ) 
			:	this.fireAction( action , data ) ;
		} ,

	})
});
