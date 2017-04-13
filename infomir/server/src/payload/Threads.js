import _ from 'lodash' ;
import Environments from '../Environments' ;
import Common from "../common/Common" ;

export default class Threads
{
	static THREADS_CHANGES = "Threads.CHANGES" ;
	static SESSIONS = [] ;

	constructor( DataSource, callback ) {
		this._dataSource = DataSource ;
		this._callback = callback ;
	}
	
	getSessionFilesList = ( session_id ) => {
		const data = this._dataSource.get( session_id ) ;
		const files = _.flatten( _.map( data , value => value.files ) ) ;
		const pending = _.map( files , value => value.status == 0 ? value : null ) ;
		
		return _.reject( pending , _.isNull ) ;
	}
	run = ( session_id ) => {
		let files = this.getSessionFilesList( session_id ) ;
		if( files && Boolean(files.length) ) this.expand( session_id , files ) ;
	}
	expand = ( session_id , files ) => {
		if( ! Threads.SESSIONS[ session_id ] ) Threads.SESSIONS[ session_id ] = [] ;
		
		const busy = Threads.SESSIONS[ session_id ].length ;
		const free = parseInt( Environments.maxThreads ) - busy ;
		
		if( free >= 0 )for( let n = 0 ; n < free ; n++ ) this.thread( session_id , files ) ;
	}
	thread = ( session_id , files ) => {
		const file = files.shift() ;
		
		Threads.SESSIONS[ session_id ].push( [ file.id , file.process_id , file.session_id ] ) ;
		
		const id = setInterval( () => {
			if( file.progress < 100 ) {
				file.progress++ ;
				file.status = 1 ;
				this._callback({ type: Threads.THREADS_CHANGES, file }) ;
				
			} else {

				file.status = 2 ;
				clearInterval( id ) ;
				Threads.SESSIONS[ session_id ].shift() ;
				
				this._callback({ type: Threads.THREADS_CHANGES, file }) ;
				this.run( session_id ) ;
			}

		} , Common.random( 100, 500 ) ) ;
	}
}