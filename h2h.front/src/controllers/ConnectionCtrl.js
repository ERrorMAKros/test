import Constants from '../constants'
import Axios from 'axios'
import QueryString from 'querystring'
import { Debug } from "../utils/Common"

export default class ConnectionController {
  static Get = ( alias, params ) => new Promise(async ( resolve, reject ) =>{
    let _params = "" ;
    if( params ) _params = `/?${ QueryString.decode( params ) }`
    const path = `${ Constants.API }${ alias }${ _params }` ;

    let payload ;
    try { payload = await Axios.get( path ) }
    catch ( error ) { return reject( error ) }

    const { status, data } = payload ;

    return ( +status != Constants.HTTPSTATUS_CODES.SUCCESS ) ? reject( new Error('Incorrect http status') ) : resolve( data ) ;
  } )
  static Post = ( alias, params )=>{

  }
  static Put = ( alias, params )=>{

  }
  static Delete = ( alias, params )=>{

  }
}
