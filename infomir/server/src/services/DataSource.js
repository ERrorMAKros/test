export const PLAYLIST_UPDATE = "PLAYLIST_UPDATE" ;
export default class DataSource
{
	constructor( callback ) {
		this._store = [];
		this._callback = callback ;
	}
	add = ( session_id, data ) => {
		if( ! this._store.hasOwnProperty( session_id ) ) this._store[ session_id ] = [] ;
		this._store[ session_id ].push( data ) ;
		this.dispatcher( PLAYLIST_UPDATE , session_id, data ) ;
	}
	get = ( id = null ) => {
		return id ? this._store[ id ] : this._store ;
	}
	dispatcher = ( type, session_id , data = null ) => {
		this._callback({ type , session_id , data: data }) ;
	}
}