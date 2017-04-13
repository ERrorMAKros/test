<?php
	class TT
	{
		public function __construct() {
			echo "<pre>" ;
			print_r([
				[
					$this->spam( 1 ) ,
					$this->spam( 6 ) ,
					$this->spam( 14 ) 
				] ,
				$this->solution( "camelCasingText" ) 
			]) ;
			echo "</pre>" ;
		}
		
		/* String */ protected function spam( /* int */ $number ) {
		/*
			Other, slowly variant:
			return implode( "" , array_fill( 0 , $number , "hue" ) ) ;
		*/
			return str_repeat( "hue" , $number );
		}
		/* String */ protected function solution( /* String */ $string ) {
		/*
			[ ! ] javascript version:
			return string.replace( /([a-z0-9])([A-Z])/g, "$1 $2" ) ;
		*/
			return preg_replace( '/([a-z0-9])([A-Z])/' , "$1 $2", $string );
		}
	}

	new TT() ;
?>