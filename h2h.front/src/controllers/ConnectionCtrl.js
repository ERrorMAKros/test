import Constants from "../constants";
import Axios from "axios";
import QueryString from "querystring";

export default class ConnectionController {
  static Get = ( alias, params ) => new Promise(async ( resolve, reject ) =>{
    let _params = "" ;
    if( params ) _params = `/?${ QueryString.decode( params ) }`
    const path = `${ Constants.API }${ alias }${ _params }` ;
    let payload ;
    try { payload = await Axios.get( path ) }
    catch ( error ) { return reject( error ) }
    const { status, data } = payload ;
    return ( +status !== Constants.HTTPSTATUS_CODES.SUCCESS ) ? reject( new Error(`Incorrect http status code: ${ +status }` ) ) : resolve( data ) ;
  } )
  static Post = ( alias, params ) => new Promise(async ( resolve, reject ) =>{
    const path = `${ Constants.API }${ alias }/` ;
    let payload ;
    try { payload = await Axios.post( path, params ) }
    catch ( error ) { return reject( error ) }
    const { status, data } = payload ;
    return ( +status !== Constants.HTTPSTATUS_CODES.CREATED ) ? reject( new Error(`Incorrect http status code: ${ +status }` )) : resolve( data ) ;
  } )
  static Put = ( alias, id, params ) => new Promise(async ( resolve, reject ) =>{
    const path = `${ Constants.API }${ alias }/${ id }/` ;
    let payload ;
    try { payload = await Axios.put( path, params ) }
    catch ( error ) { return reject( error ) }
    const { status, data } = payload ;

    return ( +status !== Constants.HTTPSTATUS_CODES.SUCCESS ) ? reject( new Error(`Incorrect http status code: ${ +status }` )) : resolve( data ) ;
  } )
  static Delete = ( alias, id ) => new Promise(async ( resolve, reject ) =>{
    let payload ;
    const path = `${ Constants.API }${ alias }/${ id }/` ;
    try { payload = await Axios.delete( path ) }
    catch ( error ) { return reject( error ) }
    const { status, data } = payload ;

    return ( +status !== Constants.HTTPSTATUS_CODES.NO_CONTENT ) ? reject( new Error(`Incorrect http status code: ${ +status }` )) : resolve( data ) ;
  } )
}
