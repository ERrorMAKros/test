import React, { Component } from "react" ;
import "../../../styles/view/uploader.less" ;
import { connect } from "react-redux" ;
import {  Row, Col, Tooltip, Progress, Table, Upload, message, Button } from 'antd';
import Debug from "../../controller/helpers/Debug" ;
import { M3U_CONTENT } from "../../model/reducers/connect" ;
import ConnectActions from "../../model/actions/connect" ;
import SocketClient , { SOCKET_DATA_UPDATE, SOCKET_HANDSHAKE_ECHO } from "../../controller/net/SocketClient" ;
import { PLAYLIST_UPDATE, PLAYLIST_ITEM_UPDATE } from "../../model/reducers/connect" ;
import _ from "lodash" ;
import { formatTime } from "../../controller/helpers/Common" ;

const FIXED_WIDTH_SMALL = 100 ;

@connect( ( model ) => { return { Connect: model.Connect } } )

export default class Uploader extends Component {
	constructor( props ) {
		super( props ) ;
	}
	componentWillMount() {
		this._connectionAction = new ConnectActions( this.props.dispatch ) ;
		this._socket = new SocketClient(
			this.props.Connect.provider ,
			this.props.Connect.session_id ,
			{
				onConnect: event => this._socket.handshake() ,
				onDisconnect: event => this.displayMessage( null , "Socket Disconnected" ) ,
				onError: error => this.displayMessage( null , JSON.stringify( error ) ) ,
				onData: this.onSocketData
			} ) ;
	}
	render() {
		const columns = [
			{ title: 'name', dataIndex: 'name', key: 'name' , className:"playlist-name" } ,
			{ title: 'count', dataIndex: 'count', key: 'count', width: FIXED_WIDTH_SMALL } ,
		];
		return (
			<Table
				rowClassName={ this.getRowClass }
				rowKey="process_id"
				pagination={ false }
				size="small"
				title={ this.headerRenderer }
				className="uploader-table"
				expandedRowRender={ this.expandedRowRender }
				columns={columns}
				bordered={ true }
				dataSource={ this.props.Connect.playlist }
			/>
		) ;
	}
	headerRenderer = () => {
		const uploaderOptions = {
			multiple: false ,
			showUploadList: false ,
			action: [ this.props.Connect.host , "upload" ].join("/") ,
			headers: {
				type: M3U_CONTENT ,
				session_id: this.props.Connect.session_id
			},
			onChange: this.onUploader
		} ;
		return (
			<Row>
				<Col span={22}>M3U PLAYLIST UPLOADER</Col>
				<Col span={2}>
					<Upload { ...uploaderOptions }>
						<Tooltip placement="leftBottom" title="Click for upload">
							<Button className="button-upload-file" icon="upload">UPLOAD</Button>
						</Tooltip>
					</Upload>
				</Col>
			</Row>
		) ;
	}
	durationRenderer = ( value ) => formatTime( value )
	progressRenderer = ( value ) => <Progress percent={ value } />
	statusRenderer = ( value ) => {
		
		let text = "" ;
		switch( value )
		{
			case 0: text = "pending" ; break ;
			case 1: text = "processed" ; break ;
			case 2: text = "finished" ; break ;
			default: text = "..." ; break ;
		}
		
		return <p className={ [ "uploading-item" , `status-${value}` ].join(" ") }>{ text }</p>
	}
	getRowClass = () => "m3u-list lightbar" ;
	expandedRowRender = ( data ) => {
		
		const columns = [
			{ title: 'progress', dataIndex: 'progress', key: 'progress' , render: this.progressRenderer,  width: FIXED_WIDTH_SMALL * 3 } ,
			{ title: 'title', dataIndex: 'title', key: 'title' } ,
			{ title: 'duration', dataIndex: 'duration', key: 'duration' , render: this.durationRenderer, width: FIXED_WIDTH_SMALL, className: "m3u-file-name"  } ,
			{ title: 'status', dataIndex: 'status', key: 'status' ,  width: FIXED_WIDTH_SMALL , render: this.statusRenderer } ,
		];
		
		return <Table
			rowKey="id"
			className="table-expanded"
			rowClassName={ this.getRowClass }
			showHeader={false}
			size="small"
			bordered={ false }
			columns={ columns }
			dataSource={ data.files }
		/>
		
	}
	displayMessage = ( text , error = null ) => {
		_.isNull( error ) ? message.success( text ) : message.error( error ) ;
	}
	
	onUploader = ( info ) => {
		
		if ( info.file.status === 'done' )
		{
			const { response, name } = info.file ;
			! response.error ? this.displayMessage( `${ info.file.name } file uploaded successfully` ) : this.displayMessage( null , response.error ) ;
			
		} else
			if( info.file.status === 'error' ) this.displayMessage( null , "[2] Uploading failed!" ) ;
	}
	onSocketData = ( json ) => {
		
		const event = JSON.parse( json.data ) ;
		
		switch( event.type )
		{
			case SOCKET_HANDSHAKE_ECHO: break ;
			case PLAYLIST_UPDATE: {
				return this._connectionAction.update( event ) ;
			}
			case SOCKET_DATA_UPDATE: {
				const type = PLAYLIST_ITEM_UPDATE ;
				return this._connectionAction.update( { ...event, type } ) ;
			}
			default: {
				Debug.error( "Uploader()" , `onSocketData([ ${event.type} ])` ) ;
			}
		}
		
		
		
	}
}