import Moment from 'moment';
import { MINUTES_MAX } from  './Environment' ;
import _ from 'underscore' ;

export default class Timer {
	
	constructor( onDisplayCallback, onTimerEndCallback = null ){
		this.onDisplay = onDisplayCallback;
		this.onEnd = onTimerEndCallback;
		this.reset();
	}
	
	start =()=> {
		
		const now = new Date();
		
		this.info.start = Moment( now );
		this.info.end = Moment( this.info.start ).add( MINUTES_MAX / 60, 'minutes' );
		this.counter = 0;
		this.tick = setInterval( this.onTimer, 1000 );
	}
	reset =()=> {
		if( ! _.isNull( this.id ))clearInterval( this.id );
		if( ! _.isNull( this.tick ))clearInterval( this.tick );
		
		this.id = null;
		this.tick = null;
		this.info = {
			start: null,
			end: null,
			display: null
		}
		
	}
	displayCounterDown =()=> {
		
		const start = this.info.start.toDate().getTime();
		const end = this.info.end.toDate().getTime();
		
		const x = Moment(( end - start )* 60 );
		const a = Moment( this.counter * 1000 );
		
		const a1 = x.unix();
		const a2 = a.unix();
		const a3 = a1 - a2;
		
		const z = Moment( a3 * 1000 )
		
		return z.format( "mm:ss" );
	}
	
	onTimer =()=> {
		
		if( _.isNull( this.id ))this.id = setTimeout( this.onTimerFinished,( MINUTES_MAX * 60 )* 1000 );
		this.counter ++;
		this.info.display = this.displayCounterDown();
		this.onDisplay( this.info.display );
		
		//  /* debug */ console.log( Moment( new Date()).format( 'mm:ss' ) , "Timer()onTimer()" , this.info.display );
	}
	onTimerFinished =()=> {
		this.reset();
		this.onEnd();
	}
	
}