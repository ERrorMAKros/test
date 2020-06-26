import { template } from "underscore"
import _find from "lodash/find"
import _keys from "lodash/keys"
import _isObject from "lodash/isObject"
import _isEqual from "lodash/isEqual"
import _transform from "lodash/transform"
import _merge from "lodash/merge"
import _indexOf from "lodash/indexOf"
import _unionBy from 'lodash/unionBy'

/**
 * Генератор уникального идентификатора (аналог Lodash.uniqueId()) ;
 *
 * @param prefix
 * @returns {string}
 */
export const genUniqueId = function( prefix = null ) {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function( c ) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor( d / 16 );
		return (c == 'x' ? r : (r & 0x7 | 0x8)).toString( 16 );
	});

	return [ prefix || "", uuid ].join( '' );
}
/**
 *
 * Аналог console.log(.warn/.info и т.п.) с цветовой схемой ;
 */
export const Debug = {
  output: function( text, color, ... variables ) {
    /* debug */ console.log( "%c" + text , `color: ${ color };` , ... variables );
  },
  clear: console.clear,
  error: function( name, text, ... variables ) {
    const color = "#ff2754" ;
    Debug.output( `${ name || "" } ${ text || "" }`, color, ...variables ) ;
  },
  warn: function( name, text, ... variables ) {
    const color = "#ff9a00" ;
    Debug.output( `${ name || "" } ${ text || "" }`, color, ...variables ) ;
  },
  info: function( name, text, ... variables ) {
    const color = "#00ecff" ;
    Debug.output( `${ name || "" } ${ text || "" }`, color, ...variables ) ;
  },
  log: function( name, text, ... variables ) {
    const color = "#edf7ff" ;
    Debug.output( `${ name || "" } ${ text || "" }`, color, ...variables ) ;
  },
  action: function( name, text, ... variables ) {
    const color = "#ff2f87" ;
    Debug.output( `★ ${ name || "" } ${ text || "" }`, color, ...variables ) ;
  },
  reducer: function( name, text, ... variables ) {
    const color = "#00f611" ;
    Debug.output( `✪ ${ name || "" } ${ text || "" }`, color, ...variables ) ;
  },
  request: function( name, text, ... variables ) {
    const color = "#ff4600" ;
    Debug.output( `☯ ${ name || "" } ${ text || "" }`, color, ...variables ) ;
  },
}
/**
 * Получение читабельного вида ошибки в axios response`е,
 * который вернул ошибку
 * @param error: Response
 */
export const parseResponseError = ( error ) => {
	const { response } = error ;
	const { status, data } = response ;
	const { error_description } = data ;
	return {
		id: status,
		message: error_description
	}
}
export const setStringVariables = ( string, object ) => {
	const template = template( string );
	return template( object );
}
export const getLength = ( object ) => {
	if( ! object ) return 0 ;
	const keys = _keys( object ) ;
	return keys.length ;
}
export const keyMirror = ( keys ) => {
	keys = Array.isArray(keys) ? keys : Object.keys(keys);
	let mirror = {};
	keys.forEach(v => mirror[v] = v);

	return mirror;
}
export const arrayUpdate = ( arr, key, data ) => {
  if( _find( arr, key )) {
    const index = _indexOf( arr, _find( arr, key ) );
    arr.splice( index, 1, _merge( arr[ index ], data ) );
  } // else { arr.push(data) }

  return arr ;
}

/**
 * Update array by "field" key
 * @param field: String
 * @param origin: Array
 * @param update: Array
 */
export const mergeArrays = ( fieldname, src, dest ) => {
	return _unionBy(dest, src, fieldname);
}
export const arrayRemove = ( arr, key ) => {
  if( _find( arr, key )) {
    const index = _indexOf( arr, _find( arr, key ) );
    arr.splice( index, 1 );
  }

  return arr ;
}
export const diff = (object, base) => {
	function changes(object, base) {
		return _transform(object, function(result, value, key) {
			if ( !_isEqual(value, base[key])) {
				result[key] = ( _isObject(value) && _isObject(base[key])) ? changes(value, base[key]) : value;
			}
		});
	}
	return changes(object, base);
}
export const jsonToObject = ( json ) => {
	let obj ;
	try { obj = JSON.parse( json ) }
	catch( error ) { return null }

	return obj ;
}
export const compareObjectValues = ( data, values ) => {
	for( const key in values ) {
		const value = values[key];
		const has = data && data.hasOwnProperty(key) && value == data[key]
		if( ! has ) return false ;
	}
	return true ;
}
export const extractObjectValues = ( data, keys ) => {
	let result = null ;
	for( let i = 0; i < keys.length ; i++ ) {
		const key = keys[i] ;
		if( data && data.hasOwnProperty(key)) {
			if( !result) result = { [key]: data[key] } ;
			else result = { ...result, [key]: data[key] }
		}
	}
	return result ;
}
