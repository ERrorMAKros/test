(
	function()
	{
		AutoComplete = function()
		{
			var self = this ;
			
			/* debug */ console.info( self ) ;
			
			self._dictionary = [ 'cde' , 'airplane', 'cd' , 'ball', 'airport', 'cdef' , 'input' , 'search' , 'c' , 'apple', 'record' ] ;
			
			/* 01 */ self.initialize = function( /* Object */ options ) {
				self.$label = document.getElementById( options.label ) ;
				self.$input = document.getElementById( options.input ) ;
				self.$input.onkeyup = self.onInputChangeHandler ;
				self.$output = document.getElementById( options.output ) ;
			} ;
			/* 02 */ self.onInputChangeHandler = function() {
				var text = self.$input.value.replace(/\W/g, '').replace(/[0-9]/g, '' ).toLowerCase() ;
				var data = self.autocomplete( text , self._dictionary ) ;
				self.layout( text , data ) ;
			} ;
			/* 03 */ /* Array */ self.autocomplete = function( /* String */ input , /* Array */ dictionary ) {
				return dictionary
				.filter( function( item ) {
					return Boolean( item.indexOf( input ) + 1 ) ;
				})
				.sort( function( a , b ) {
					return a > b ;
				} ) ;
			} ;
			/* 04 */ self.layout = function( /* String */ text , /* Array */ data ) {
				self.$label.innerText = [ 'Search for: ' , '"' , text , '"' ].join( "" ) ;
				while ( self.$output.firstChild ) {
					self.$output.removeChild( self.$output.firstChild );
				} ;
				data.forEach(
					function( item , index , data ) {
						var li = document.createElement( 'li' ) ;
						li.innerText= item ;
						self.$output.appendChild( li ) ;
					} );
			} ;
		}
	}
)();