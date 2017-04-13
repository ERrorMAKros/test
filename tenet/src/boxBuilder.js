(function() {
	
	/**
	 * @description Box Builder
	 *
	 */
	
	window.BoxBuilder = function() {
		
		var OPTIONS = {
			BOX_BOXES: 50 ,
			STYLES_CLASSES: [ "size21" , "size22" , "size23" , "size31" , "size32", "size33" ]
		} ;
		var intRandom = function( min, max ) {
			var rand = min + Math.random() * ( max - min ) ;
			rand = Math.round( rand ) ;
			return rand ;
		} ;
		var stage = $( "body" ) ;
		for( var index = 0 ; index < OPTIONS.BOX_BOXES ; index++ ) stage.append( '<div class="box ' + OPTIONS.STYLES_CLASSES[ intRandom( 0, OPTIONS.STYLES_CLASSES.length - 1 ) ] + '">' + index + '</div>' ) ;
		stage.nested( {animate: false, gutter: 4 } );
		
	}
	
	
})();