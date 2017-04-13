( function() {

	Helpers = {
		tplCompile: function( id ) {
			return _.template( $.trim( $( '#' + id ).html() ) );
		} ,
		getFormVariables: function( $elementsArray ) {
			var values = null ;
			$elementsArray.each(function( index , data )
			{
				if( ! values ) values = {} ;
				values[ data.getAttribute( "id" ) ] = _.isNumber( data.value ) ? parseInt( data.value ) : String( data.value ) || null ;
			}).serializeArray() ;

			return values ;
		}
	} ;
	Main = {
		Models: {} ,
		Views: {} ,
		Collection: null ,
		Router: null ,
		Dispatcher: _.extend( {} , Backbone.Events ) ,
		_dataProvider: [
			{	name: 'Ninja', age: 20, job: 'JavaScript'	} ,
			{	name: 'Олег', age: 24, job: 'Менеджер'	} ,
			{	name: 'Анна', age: 18, job: 'Студентка'	}
		]
	} ;
	Main.Models.Person = Backbone.Model.extend({
		defaults: {
			name: 'без_имени',
			age: 0,
			job: 'без_работы'
		},
		initialize : function() {
			/* debug */ console.warn( "Main.Models.Person.initialize()" , this );
			
			this.validate( this.attributes ) ;
			this.on( "invalid", function( model, error ) {
				/* error */ console.error( "Main.Models.Person.initialize([ error ])" , error );
			});
		},
		validate: function( attrs ) {
			/* debug */ console.log( "Main.Models.Person.validate([ attrs ])" , attrs );
			
			if ( attrs.age && parseInt( attrs.age ) < 0 ) return 'Возраст должен быть положительным!';
			else 
				if ( ! attrs.name || ! Boolean( $.trim( attrs.name ).length ) ) return 'Имя не должно быть пустым' ;
		}
	}) ;
	Main.Views.Person = Backbone.View.extend({
		tagName: "li" ,
		initialize: function() {
			/* debug */ console.warn( "Main.Views.Person.initialize()" , this );
			this.model.on( "change" , this.render , this ) ;
			this.model.on( "destroy" , this.onRemoveEvent, this ) ;
		} ,
		template: "content" ,
		render: function() {
			/* debug */ console.log( "Main.Views.Person.render()" , this );

			var html = Helpers.tplCompile( this.template ) ;
			this.$el.html( html( this.model.toJSON() ) ) ;

			return this ;
		} ,
		events: {
			"click .rename": function( event ) {
				var rename = prompt( 'Введите новое имя:', this.model.get( 'name' ) ) ;
				this.model.set( { name: rename } , { validate : true } ) ;
				/* debug */ console.log( "Main.Views.Person [ click ." + event.currentTarget.className + " ]" , event , this.model.toJSON() );
			} ,
			"click .remove": function( event ) {
				/* debug */ console.log( "Main.Views.Person [ click ." + event.currentTarget.className + "]" , event );
				this.model.destroy() ;
			}
		} ,
		onRemoveEvent: function( event ) {
			/* debug */ console.log( "Main.Views.Person.onRemoveEvent([ event ])" , event );
			this.$el.remove() ;
		} 
	}) ;
	Main.Views.PersonCollection = Backbone.View.extend({
		tagName: "ul" ,
		initialize : function() {
			/* debug */ console.warn( "Main.Views.PersonCollection.initialize()" , this );
			this.collection.on( "add" , this.addChild, this ) ;
		} ,
		render: function() {
			this.collection.each(
				function( model ) {
					/* debug */ console.log( "Main.Views.PersonCollection.render([ model ])" , model );
					this.addChild( model ) ;
				} , this ) ;

			return this ;
		} ,
		addChild: function( model ) {
			var view = new Main.Views.Person( { model: model } ) ;
			this.$el.append( view.render().el ) ;
		} ,

	}) ;
	Main.Views.PersonAdd = Backbone.View.extend({
		el: "#add" ,
		initialize: function() {
			/* debug */ console.warn( "Main.Views.PersonAdd.initialize()" , this );
		} ,
		events: {
			submit: function( event ) {
				event.preventDefault() ;
				/* debug */ console.clear() ;
				/* debug */ console.log( "Main.Views.PersonAdd.events.submit([ event ])" , event ) ;

				var fields = $( event.currentTarget ).find( 'input[ variable ]' ) ;
				var data = Helpers.getFormVariables( fields ) ;
				var model = new Main.Models.Person( data ) ;

				this.collection.add( model ) ;
				
				/* debug */ console.log( "Main.Views.PersonAdd.events.submit([ data ])" , data , this.collection ) ;
				/*
				var fields = $( event.currentTarget ).find( 'input[ type="text" ]' ).each( function( index , item ) {
					console.log( "Main.Views.PersonAdd.events.submit([ id , value ])" , item.getAttribute( "id" ) , item.value );
				} , this ) ;
				*/
			}
		} 
	}) ;
	Main.Views.Errors = Backbone.View.extend({
		el: "#errors" ,
		initialize: function() {
			/* debug */ console.warn( "Main.Views.Errors.initialize()" , this );
			this.$el.html( "errors" ) ;
			Main.Dispatcher.on( "evErrorMessage" , function( event ) {
				//	/* error */ console.error( "[ 404 ]" , event , this );
				this.$el.html( [ "Error: " , event ].join( " " ) ) ;
			} , this ) ;
		} ,
	}) ,
	Main.Collection = Backbone.Collection.extend({
		model: Main.Models.Person
	}) ;
	Main.Router = Backbone.Router.extend({
		routes: {
			'': function() {
				/* debug */ console.log( "Main() Router() - [ / ]" ) ;
			} ,
			'child': function() {
				/* debug */ console.log( "Main() Router() - [ child ]" ) ;
			} ,
			'page': "page" ,
			'page/:id': "page" ,
			'page/:id/:name': "page" , 
			'page/:id/:name/*value': "page" ,
			'*error': function( error ) {
				/* debug */ console.error( "Main() Router() - [ * ]" , error ) ;
				Main.Dispatcher.trigger( "evErrorMessage" , error ) ;
			} ,
		} ,
		page: function( id , name , value ) {
			/* debug */ console.log( "Main() Router() - [ page ]" , id , name , value ) ;
		}
	});

	function run() {
		/* debug */ console.info( "Main()" ) ;

		var model = new Main.Collection( Main._dataProvider ) ;

		new Main.Views.Errors() ;
		new Main.Views.PersonAdd( { collection: model } ) ;

		var view = new Main.Views.PersonCollection( { collection: model } ) ;

		/* 1A */ new Main.Router() ;
		/* 1B */ Backbone.history.start() ;
		
		$( 'body' ).append( view.render().el ) ;
	} ;

	document.addEventListener( "DOMContentLoaded" , run ) ;

})() ;

