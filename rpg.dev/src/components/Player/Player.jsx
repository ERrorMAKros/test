import React, { Component } from "react";
import Styles from "./style.scss";
import { connect } from "react-redux";
import { setPlayerProperties } from "../../redux/actions/player.actions";
import { bindActionCreators } from "redux";
import { isEmpty, isEqual } from "lodash";

const $players = {
	link: "link",
	badoo: "badoo",
}
const $keyboard = {
	up: "ArrowUp",
	down: "ArrowDown",
	left: "ArrowLeft",
	right: "ArrowRight"
} ;

@connect(
	({ Player }) => ({ Player }),
	dispatch => ( bindActionCreators({ setPlayerProperties }, dispatch ) )
)
export default class Player extends Component {
	static defaults = {
		players: $players,
		keyboard: $keyboard,
		skin: {
			[ $players.link ]: {
				standby: {
					[ $keyboard.up ]: [ "/static/players/link/standby/top.png" ],
					[ $keyboard.down ]: [ "/static/players/link/standby/bottom.png" ],
					[ $keyboard.left ]: [ "/static/players/link/standby/left.png" ],
					[ $keyboard.right ]: [ "/static/players/link/standby/right.png" ],
				},
				movements: {
					[ $keyboard.up ]: [
						"/static/players/link/movements/top/0.png",
						"/static/players/link/movements/top/1.png",
						"/static/players/link/movements/top/2.png",
						"/static/players/link/movements/top/3.png",
						"/static/players/link/movements/top/4.png",
						"/static/players/link/movements/top/5.png",
						"/static/players/link/movements/top/6.png"
					],
					[ $keyboard.down ]: [
						// "/static/players/link/movements/0.png",
						"/static/players/link/movements/bottom/1.png",
						"/static/players/link/movements/bottom/2.png",
						"/static/players/link/movements/bottom/3.png",
						"/static/players/link/movements/bottom/4.png",
						"/static/players/link/movements/bottom/5.png",
						"/static/players/link/movements/bottom/6.png"
					],
					[ $keyboard.left ]: [
						"/static/players/link/movements/left/0.png",
						"/static/players/link/movements/left/1.png",
						"/static/players/link/movements/left/2.png",
						"/static/players/link/movements/left/3.png",
						"/static/players/link/movements/left/4.png",
						"/static/players/link/movements/left/5.png",
						"/static/players/link/movements/left/6.png",
						"/static/players/link/movements/left/7.png"
					],
					[ $keyboard.right ]: [
						"/static/players/link/movements/right/0.png",
						"/static/players/link/movements/right/1.png",
						"/static/players/link/movements/right/2.png",
						"/static/players/link/movements/right/3.png",
						"/static/players/link/movements/right/4.png",
						"/static/players/link/movements/right/5.png",
						"/static/players/link/movements/right/6.png",
						"/static/players/link/movements/right/7.png"
					]
				}
			},
			[ $players.badoo ]: {
				standby: {
					[ $keyboard.up ]: [ "/static/players/badoo/standby/top.png" ],
					[ $keyboard.down ]: [ "/static/players/badoo/standby/bottom.png" ],
					[ $keyboard.left ]: [ "/static/players/badoo/standby/left.png" ],
					[ $keyboard.right ]: [ "/static/players/badoo/standby/right.png" ],
				},
				movements: {
					[ $keyboard.up ]: [
						"/static/players/badoo/movements/top/0.png",
						"/static/players/badoo/movements/top/1.png",
					],
					[ $keyboard.down ]: [
						"/static/players/badoo/movements/bottom/0.png",
						"/static/players/badoo/movements/bottom/1.png",
					],
					[ $keyboard.left ]: [
						"/static/players/badoo/movements/left/0.png",
						"/static/players/badoo/movements/left/1.png",
					],
					[ $keyboard.right ]: [
						"/static/players/badoo/movements/right/0.png",
						"/static/players/badoo/movements/right/1.png",
					]
				}
			},
		}
	}
	state={
		key: null
	}
	constructor( props ) {
		super( props ) ;
		/* debug */ console.log( Player.name, this )
	}

	_addEventListeners() {
		window.document.onkeydown = this.events.onKeyDown ;
		window.document.onkeyup = this.events.onKeyUp ;
	}
	_removeEventListeners() {
		window.document.onkeydown = null ;
	}

	render() {
		const { Player } = this.props ;
		return 	(
			<div ref={ this.initialize } className={ Styles.Player } style={{
				left: `${ Player.x }px`,
				top: `${ Player.y }px`,
			}}>
				{ this.renderers.displayPlayer() }
			</div>
		)
	}
	initialize = () => {
		this._addEventListeners() ;
	}
	componentWillUnmount() {
		this._removeEventListeners() ;
	}
	renderers = {
		displayPlayer: () => {
			const { Player: { name: src, frameIndex } } = this.props ;
			return (
				<img src={ src } className={ Styles.PlayerSprite }/>
			)
		}
	}
	controller = {
		updateAll:( key ) => {
			const position = this.controller.getPosition( key ) ;
			const name = this.controller.getSprite( key ) ;
			return {
				key,
				... position || {},
				... name || {}
			}
		},
		getPosition: ( key ) => {
			const { Player: { x, y, STEP_OFFSET } } = this.props ;
			const _pos = { x, y } ;
			switch ( key ) {
				case Player.defaults.keyboard.up   : { _pos.y = _pos.y - STEP_OFFSET ; break }
				case Player.defaults.keyboard.down : { _pos.y = _pos.y + STEP_OFFSET ; break }
				case Player.defaults.keyboard.left : { _pos.x = _pos.x - STEP_OFFSET ; break }
				case Player.defaults.keyboard.right: { _pos.x = _pos.x + STEP_OFFSET ; break }
				default: { return null }
			} ;

			if( _pos.x < 0 ) _pos.x = 0 ;
			if( _pos.y < 0 ) _pos.y = 0 ;

			return _pos ;
		},
		getSprite: ( key ) => {
			const { player, key: _key, frameIndex: i } = this.props.Player ;
			const skin = Player.defaults.skin[ player ] ;
			if( key != _key && skin.standby.hasOwnProperty( key ) ) {
				const frameIndex = 0 ;
				const [ name ] = skin.standby[ key ] ;
				return { name, frameIndex } ;

			} else if( key == _key ) {

				let name = null ;
				let frameIndex = null ;
				const framesCount = skin.movements[ key ].length ;
				if( i < framesCount ) {
					name = skin.movements[ key ][ i ] ;
					frameIndex = i + 1 ;

					return { name, frameIndex } ;
				} ;

				frameIndex = 0 ;
				name = skin.movements[ key ][ frameIndex ] ;

				return { frameIndex, name } ;
			}

			return {} ;
		},
		setProperties: ( data ) => {

			data = {
				... this.props.Player || {} ,
				... data || {}
			} ;

			const { setPlayerProperties } = this.props ;

			if( isEmpty( data ) ) return ;
			if( isEqual( this.props.Player, data )) return ;

			setPlayerProperties( data ) ;
		}
	}
	events = {
		onKeyDown:( event ) => {
			event.preventDefault() ;
			event.stopPropagation() ;

			const { key } = event ;
			const props = this.controller.updateAll( key ) ;

			this.controller.setProperties( props ) ;
		},
		onKeyUp: ( event ) => {

			const { Player: { player } } = this.props ;

			event.preventDefault() ;
			event.stopPropagation() ;

			const { key } = event ;
			const frameIndex = 0 ;
			const [ name ] = Player.defaults.skin[ player ].standby[ key ] ;

			this.controller.setProperties({ name, frameIndex }) ;
		}
	}
}