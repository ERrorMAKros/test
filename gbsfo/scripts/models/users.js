define( [ 

	'backbone' ,
	'helpers'

], function( Backbone , Helpers ) {
	return Backbone.Model.extend({
		verifycator: function( data ) {
			var credentials ;
			if( data.id ) {

				credentials = this.auth( data.id ) ;
				if( credentials ) this.fireAuthorization( credentials ) ;
				else return this.fireError( 'The email address or password you entered is not valid ..!' ) ;

			} else
				if( data.username && data.password ) {
					var uid = Helpers.md5( [ data.username.toLowerCase() , data.password ].join() ) ;
					credentials = this.register( uid , data.username ) ;

					if( credentials ) this.fireAuthorization( credentials ) ;
					else return this.fireError( 'User already registered ..!' ) ;

				} else return this.fireError( 'All fields required' ) ;
		} ,
		isAuthorized: function() {
			var uid = Helpers.getCookie( "uid" ) ;
			var verify = this.auth( uid ) ; 
			return verify ;
		} ,
		auth: function( uid ) {
			var data = this.DB.get() ;
			return uid && data && data.hasOwnProperty( uid ) == true ? data[ uid ] : null ;
		} ,
		register: function( uid , username ) {
			var data = this.DB.set( uid , username , {} , true ) ;
			return data ;
		} ,
		DB: {
			get: function()
			{
				if( ! localStorage.getItem( "pm" ) ) localStorage.setItem( "pm" , JSON.stringify( {} ) ) ;
				var data = JSON.parse( localStorage.getItem( "pm" ) ) ;
				return  data ;
			} ,
			set: function( uid , username , storage , isCheckRewrites)
			{
				var data = this.get() ;
				if( isCheckRewrites && data.hasOwnProperty( uid ) ) return false ;

				data[ uid ] = {
					id: uid ,
					name: username ,
					data: storage || {}
				}

				try {
					localStorage.setItem( "pm" , JSON.stringify( data ) ) ;
				} catch( error ) {
					data = null ;
				} 
				return data[ uid ] ;
			}
		} ,
		fireError: function( message ) {
			this.trigger( "onDBError" , message , this ) ;
			return message ;
		} ,
		fireAuthorization: function( credentials ) {
			this.trigger( "onAuthorize" , credentials , this ) ;
		} ,
	}) ;
});

