import _ from "lodash";

export const SESSION_START = "SESSION_START" ;
export const M3U_CONTENT = "M3U_CONTENT" ;
export const PLAYLIST_UPDATE = "PLAYLIST_UPDATE" ;
export const PLAYLIST_ITEM_UPDATE = "PLAYLIST_ITEM_UPDATE" ;

const DEFAULTS = {
	session_id: null ,
	provider: null ,
	host: null ,
	type: null ,
	error: null ,
	playlist: [] ,
} ;

export default function Connect( state = DEFAULTS , action ) {
	switch( action.type )
	{
		case SESSION_START: {
			return { ...state , ...action } ;
		}
		case PLAYLIST_UPDATE: {
			const playlist = state.playlist.concat( action.data ) ;
			return { ...state , playlist } ;
		}
		case PLAYLIST_ITEM_UPDATE: {
			
			const playlist = _.clone( state.playlist ) ;
			const { id , process_id , session_id } = action.file ;
			
			for( let y = 0 ; y < playlist.length ; y++ ) {
				for( let x = 0 ; x < playlist[ y ].files.length ; x++ ) {
					let file = playlist[ y ].files[ x ] ;
					if( file.id == id && file.process_id == process_id && file.session_id == session_id ) {
						playlist[ y ].files[ x ] = action.file ;
						return { ...state , playlist } ;
					}
				}
			}
			
			return state ;
		}
		default: { return state ; }
	}
}