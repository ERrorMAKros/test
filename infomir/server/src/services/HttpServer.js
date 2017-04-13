import Environments from "./../Environments";
import _ from "lodash";
import express from "express";
import bodyParser from "body-parser";
import formidable from "formidable";
import fs from "fs";
import cors from "cors";

export const SESSION_START = "SESSION_START" ;
export const M3U_CONTENT = "M3U_CONTENT" ;
export const M3U_ERROR = "M3U_ERROR" ;

export default class HttpServer {
	
	constructor( callback ) {
		this.callback = callback ;
		return this.create() ;
	}
	create = () => {
		
		const app = express() ;
		app.use(cors()) ;
		app.use(bodyParser.json());
		app.use(bodyParser.raw());
		app.use(bodyParser.urlencoded({ extended: true })) ;

		app.put( '/', this.onData );
		app.post( '/upload', this.onFiles );
		
		app.listen( Environments.ports.http ) ;
		
		return app ;
	}
	dispatch = ( data , file, response ) => {
		return this.callback ? this.callback( data , file , response ) : false ;
	}
	
	onFiles = (request, response) => {
		
		const form = new formidable.IncomingForm();
		
		form.multiples = false ;
		form.encoding = 'utf-8';
		form.uploadDir = "./uploads" ;
		form.on('error', (error) => this.dispatch( { type: M3U_ERROR , error } , null , response ) );
		form.parse( request , ( error, fields, files ) => {
			
			const file = form.openedFiles.pop() ;
			const { name , size , path } = file ;
			const meta = { name , size } ;

			fs.readFile( path , 'utf8', ( error, content ) => {
				return _.isNull( error )
				? this.dispatch( { type: M3U_CONTENT , ...meta, session_id: request.headers.session_id } , content , response )
				: this.dispatch( { type: M3U_ERROR , error } , null , response ) ;
			});

		});
	}
	onData = ( request, response ) => {
		const data = request.body ;
		switch ( request.method )
		{
			case "PUT" : return ! _.isNull ( data ) ? this.dispatch ( data , null , response ) : false;
			default: return response.end();
		}
	}

}