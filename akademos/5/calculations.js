(
	function()
	{
		Calculations = function()
		{
			var self = this ;
			
			/* debug */ console.info( self ) ;
			
			self._operator = function( a , data ) {
				switch( data.action )
				{
					case "+" : return a + data.source ;
					case "-" : return a - data.source ;
					case "/" : return a / data.source ;
					case "*" : return a * data.source ;
				} ;
			} ;
			self._combinator = function( value , data ) {
				return data ? self._operator( value , data ) : value ;
			} ;
			
			self.zero = function( x ) { return self._combinator( 0 , x ) ; }
			self.one = function( x ) { return self._combinator( 1 , x ) ; }
			self.two = function( x )  { return self._combinator( 2 , x ) ; }
			self.three = function( x ) { return self._combinator( 3 , x ) ; }
			self.four = function( x ) { return self._combinator( 4 , x ) ; }
			self.five = function( x ) { return self._combinator( 5 , x ) ; }
			self.six = function( x ) { return self._combinator( 6 , x ) ; }
			self.seven = function( x ) { return self._combinator( 7 , x ) ; }
			self.eight = function( x ) { return self._combinator( 8 , x ) ; }
			self.nine = function( x ) { return self._combinator( 9 , x ) ; }

			self.plus = function( x ) {
				return { action: "+" , source: x } ;
			}
			self.minus = function( x ) {
				return { action: "-" , source: x } ;
			}
			self.times = function( x ) {
				return { action: "*" , source: x } ;
			}
			self.dividedBy = function( x ) {
				return { action: "/" , source: x } ;
			}

			/* 01 */ self.checkCalculations = function() {
				/* debug */ console.log( self.three( self.times( self.five() ) ) ) ;
				/* debug */ console.log( self.four( self.plus( self.eight() ) ) ) ;
				/* debug */ console.log( self.eight( self.minus( self.two() ) ) ) ;
				/* debug */ console.log( self.six( self.dividedBy( self.three() ) ) ) ;
			}
		}
	}
)();