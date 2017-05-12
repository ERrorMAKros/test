export default class Error {
	
	get id() {
		return this._id ;
	}
	set id( value ) {
		if( value ) this._id = value ;
	}

	get message() {
		return this._message ;
	}
	set message( value ) {
		if( value ) this._message = value ;
	}
	
	constructor( id , message ) {
		this._id = id ;
		this._message = message ;
	}
}