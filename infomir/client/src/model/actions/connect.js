import { SESSION_START } from "../reducers/connect";
import Http from "axios";

export default class ConnectActions {
	constructor( dispatcher ) {
		this._dispatch = dispatcher ;
	}
	sessionStart = ( host ) => {
		const data = { type: SESSION_START , host } ;
		const onPassed = ( payload ) => this._dispatch( { ...data , ...payload.data } ) ;
		const onError = ( error ) => this._dispatch( { ...data , error } ) ;
		
		Http.put( host, data ).then( onPassed ).catch( onError ) ;
	}

	update = ( data ) => this._dispatch( data )
} ;