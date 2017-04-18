define( [
	'jquery' , 
	'underscore' ,
	'md5'
] , function( $ , _ , md5 ) {
	return {
		compile: function( id ) {
			return _.template( $.trim( $( '#' + id ).html() ) );
		} ,
		getFormVariables: function( arr , selector ) {
			var values = null ;
			arr.each(function( index , data ) {
				if( ! values ) values = {} ;
				values[ data.getAttribute( ! selector ? "id" : selector ) ] = _.isNumber( data.value ) ? parseInt( data.value ) : String( data.value ) || null ;
			}).serializeArray() ;

			return values ;
		} ,
		md5: function( text ) {
			return md5( text );
		} ,
		setCookie: function( name, value , expires , path , domain , secure ) {
			  document.cookie = name + "=" + escape( value ) +
				((expires) ? "; expires=" + expires : "") +
				((path) ? "; path=" + path : "") +
				((domain) ? "; domain=" + domain : "") +
				((secure) ? "; secure" : "");
		},
		getCookie: function( name ) {
			var cookie = " " + document.cookie;
			var search = " " + name + "=";
			var setStr = null;
			var offset = 0;
			var end = 0;
			if (cookie.length > 0) {
				offset = cookie.indexOf(search);
				if (offset != -1) {
					offset += search.length;
					end = cookie.indexOf(";", offset)
					if (end == -1) {
						end = cookie.length;
					}
					setStr = unescape(cookie.substring(offset, end));
				}
			}
			return(setStr);
		} ,
		genUniqueId: function() {
			var d = new Date().getTime();
			var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = (d + Math.random() * 16) % 16 | 0;
				d = Math.floor(d / 16);
				return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
			});

			return uuid;
		}
	}
});
