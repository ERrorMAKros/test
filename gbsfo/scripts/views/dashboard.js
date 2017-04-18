define([

	'jquery' ,
	'backbone' ,
	'dataset' ,
	'view/dashboard.item' ,
	'helpers' ,

], function( $ , Backbone , MDataSet , DashboardItemView , Helpers ) {
	return Backbone.View.extend({
		el: "#index" ,
		template: "dashboard-tpl" ,
		initialize: function () {
			this.collection.on( "add" , this.add , this ) ;
			this.collection.on( "change" , this.update , this ) ;
			this.collection.on( "remove" , this.remove , this ) ;
		} ,
		render: function( options ) {
			var compile = Helpers.compile( this.template ) ;
			this.$el.html( compile( options ) ) ; 
			this.collection.each( this.add , this ) ;

			var editor = new DashboardItemView( { model: new MDataSet() } ) ;
			editor.render({
				add: true ,
				unlock: true
			})  ;
			editor.on( "action" , this.onEditorActionEvent , this ) ;
			editor.on( "error" , this.onErrorEvent , this ) ;
			
			this.displayError( false ) ;
			this.$el.find( "#create" ).html( editor.el ) ;

			return this ;
		} ,
		displayError: function( bool ) {
			this.$el.find( '.alert' ).css( "display" , ! bool ? 'none' : 'block' ) ;
		} ,
		events: {
			'click #logout': function( event ) {
				event.preventDefault() ;
				this.trigger( "onLogout" , null , this ) ;
			}
		} ,
		add: function( model ) {
			model.attributes.id = Helpers.genUniqueId() ;
			this.displayError( false ) ;
			var item = new DashboardItemView( { model: model , collection: this.collection} ) ;
			item.render({
				remove: true ,
				unlock: true
			}) ;
			this.$el.find( "ul#list" ).append( item.el ) ;
			this.fireUpdates() ;
		} ,
		remove: function( model ) {
			this.fireUpdates() ;
		} ,
		update: function( model ) {
			this.fireUpdates() ;
		} ,
		fireUpdates: function() {
			this.trigger( "onSave" , this.collection , this ) ;
		} ,
		destructor: function() {
			this.remove() ;
		} ,
		onEditorActionEvent: function( event ) {
			if( event ) switch( event.action ) {
				case "add": this.collection.add( new MDataSet( event.data ) ) ; break ;
			}
		} ,
		onErrorEvent: function( message ) {
			/* error */ console.error( "dashboard() onErrorEvent([ message ])" , message ) ;
			this.displayError( true ) ;
			$( ".alert" ).css( "display" , 'block' ).text( message ) ;
		}
	})
});
