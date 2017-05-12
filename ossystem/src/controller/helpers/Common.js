import Lodash from 'lodash' ;
import MD5 from 'md5' ;

export const setStringVariables = ( string, object ) => {
	const template = Lodash.template( string );
	return template( object );
}
export const getDataByKeyValue = ( /* Array */ array, /* String */ key, /* Integer, String, Boolean */ value ) => {
	if( Lodash.isNull( array ) == false && Boolean( array.length ) && Lodash.isNull( key ) == false )
		for( let i = 0 ; i < array.length ; i++ )
			if( array[ i ].hasOwnProperty( key ) && array[ i ][ key ] === value ) return array[ i ] ;
	
	return null ;
}
export const getRandomId = () => {
	const value = new Array(8).join().replace(/(.|$)/g, () => ( ( Math.random() * 36 ) | 0 ).toString( 36 )[ Math.random()<.5 ? "toString" : "toUpperCase" ]() );
	return MD5( [ value ].join( Math.random( 65535 ).toString() ) ) ;
}
export const formatTime = ( seconds ) => {
	let timeOut = null;
	
	let hours = parseInt(seconds / 3600);
	let mins = parseInt((seconds - (hours * 3600)) / 60);
	let secs = parseInt(seconds % 60);
	if (isNaN(hours) || isNaN(mins) || isNaN(secs)) return "00:00:00";
	let minS = (mins < 10) ? "0" + mins : String(mins);
	minS+=":";
	let secS = (secs < 10) ? "0" + secs : String(secs);
	
	let hourS = (hours < 10) ? "0" + hours : String(hours);
	hourS = (!hourS || hourS == 0) ? "" : hourS + ":";
	
	timeOut = hourS + minS + secS;
	
	return timeOut;
}