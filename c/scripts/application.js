/**
*	Application
*/

define(
[
	'users' ,
	'dataset' ,
	'collection' ,
	'controller' ,
	'helpers' ,
	'view/index' ,
	'view/login' ,
	'view/registration' ,
	'view/dashboard' ,
	'backbone'

], function( MDB, MDataSet , MCollection , Controller , Helpers , IndexView , LoginView , RegistrationView , DashboardView , Backbone ) {
	var Application = ( function() {

		var self = null ;

		var _model ;
		var _view ;
		var _controller ;
		var _widget ;

		var module = function() {
			self = this ;
		};
		module.prototype = {
			constructor: module ,
			build: function() {
				_model = new MDB() ;
				_model.on( "onAuthorize" , self.onAuthorizeEvent ) ;

				var userCredentials = _model.isAuthorized() ;

				_view = userCredentials ? self.getDashboardView( userCredentials ) : self.getDefaultView() ;

				Backbone.history.start() ;
				Backbone.history.on( 'route' , self.onRouteEvent );

				_controller = new Controller({ model: _model }) ;

			} ,
			setView: function( name ) {
				if( ! name ) _view.$el.find( "#content" ).empty() ;
				else { 
					if( _widget ) {
						_widget.destructor() ;
						_widget.remove() ;
					} ;

					_widget = self.getWidgetInstance( name , _model ) ;
					if( _widget ) _view.$el.find( "#content" ).empty().html( _widget.el ) ;
				}
			} ,
			getDashboardView: function( credentials ) {
				var storage = new MDataSet() ;
				var collection = new MCollection( Backbone.$.isEmptyObject( credentials.data ) ? null : credentials.data ) ;
				var view = new DashboardView( { model: storage  , collection: collection } ) ;

				view.render( credentials ) ;
				view.on( "onLogout" , self.onLogoutEvent , this ) ;
				view.on( "onSave" , self.onSaveEvent , this) ;

				return view ;
			} ,
			getDefaultView: function() {
				return new IndexView( { model: _model } ) ;
			} ,
			getWidgetInstance: function( name , model ) {
				var element ;
				switch( name ) {
					case "login": {
						element = new LoginView( { model: model } ) ;
						element.on( "onRequest" , self.onLoginEvent ) ;
						break ;
					}
					case "registration": {
						element = new RegistrationView( { model: model } ) ;
						element.on( "onRequest" , self.onRegisterEvent ) ;
						break ;
					}
				} ;
				return element ;
			} ,
			onRouteEvent: function( router ) {
				var name = Backbone.history.getFragment() ;
				self.setView( name ) ;
			} ,
			onSaveEvent: function( collection ) {
				var credentials = _model.isAuthorized() ;
				_model.DB.set( credentials.id , credentials.name , collection.toJSON() ) ;
			} ,
			onLogoutEvent: function() {
				Helpers.setCookie( "uid" , null ) ;
				window.location = window.location.pathname ; 
			} ,
			onLoginEvent: function( data ) {
				var uid = Helpers.md5( [ data.username.toLowerCase() , data.password ].join() ) ;
				_model.verifycator( { id: uid } ) ;
			} ,
			onRegisterEvent: function( data ) {
				_model.verifycator( data ) ;
			} ,
			onAuthorizeEvent: function( credentials ) {
				Helpers.setCookie( "uid" , credentials.id ) ;
				var dashboard = self.getDashboardView( credentials ) ;
				_view.$el.find( "#content" ).empty().html( dashboard.el ) ;
			}
		} ;

		return module ;

	})();

	return Application ;
});

