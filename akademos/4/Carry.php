<?php
	class Carry
	{
		public function __construct() {
			echo implode( "<br/>" , [
				$this->solve( "123 456" ) ,
				$this->solve( "555 555" ) ,
				$this->solve( "123 594" )
			] ) ;
		}
		private function solve( $input ) {
			$threshold = 10 ;
			$amount = $buff = $sum = 0 ;
			
			$input = explode( " " , $input ) ;
			$a = array_shift( $input ) ;
			$b = array_pop( $input ) ;

			while( $a != 0 || $b != 0 )
			{
				$sum = $buff + ( $a % $threshold ) + ( $b % $threshold );
	
				( $sum >= $threshold ) ? $amount++ : false ;
				
				$buff = $sum / $threshold ;
				$a = $a / $threshold ;
				$b = $b / $threshold ;
			}

			if( ! $amount  ) return "No carry operation"  ;
			else if( $amount > 1 ) return "{$amount} carry operations" ;
				else if ( $amount == 1 ) return "1 carry operation" ;
					else return "Ooops ;(" ;
		}
	} ;

	new Carry() ;
?>