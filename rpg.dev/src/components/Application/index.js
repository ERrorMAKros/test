import React, { Component } from "react";
import { isArray } from "lodash";
import { Player } from "../Player";
import Styles from "./style.scss";

export default class Application extends Component {
	static factory = {
		createTile: ( src, { x,y, width, height, backgroundColor='#9c0000' }) => ({ src, x, y, width, height, backgroundColor }),
		createMap: ( res , map, children ) => {
			const createElement = ( key, { src, width, height, backgroundColor } ) => {
				const style={
					left: `${ pos.left }px`,
					top: `${ pos.top }px`,
					width: `${ width }px`,
					height: `${ height }px`,
					backgroundColor: backgroundColor
				} ;

				return (
					<img key={ key } className={ Styles.Tile } src={ src } style={ style } />
				)
			}

			let items = [] ;
			const pos = {
				left: 0,
				top: 0
			}
			for( let y1 = 0 ; y1 < map.length ; y1++ ) {
				const a = map[y1];
				for( let x1 = 0 ; x1 < a.length ; x1++ ) {
					let b = map[y1][x1];
					b = isArray( b ) ? b : [ b ] ;

					let $width = 0 ;
					let $height = 0 ;

					b.forEach( ( l, index )=>{
						const { src, width, height } = res[l] ;
						const $ui = createElement( `${x1}-${y1}-${index}`, { src, width, height } ) ;
						items.push( $ui ) ;

						$width = width ;
						$height = height ;
					})

					if( x1 != a.length - 1 ) {
						pos.left = pos.left + $width ;
					} else {
						pos.left = 0 ;
						pos.top = pos.top + $height ;
					}
				}
			}


			return (
				<div className={ Styles.Level }>
					{ items }
					{ /* <img src={"/static/map.png"}/> */ }
					{ children }
				</div>
			)

		}
	}
	constructor( props ) {
		super( props ) ;
		/* debug */ console.log( Application.name, this )
	}
	createResources = () => {
		const RES_SIZE = { width: 16, height: 16 } ;
		const RES = [
			/* 01 */ Application.factory.createTile( '/static/a002.png', RES_SIZE ),
			/* 00 */ Application.factory.createTile( '/static/a001.png', RES_SIZE ),
			/* 02 */ Application.factory.createTile( '/static/a003.png', RES_SIZE ),

			/* 03 */ Application.factory.createTile( '/static/b-0-0.png', RES_SIZE ),
			/* 04 */ Application.factory.createTile( '/static/b-0-1.png', RES_SIZE ),
			/* 05 */ Application.factory.createTile( '/static/b-1-0.png', RES_SIZE ),
			/* 06 */ Application.factory.createTile( '/static/b-1-1.png', RES_SIZE ),

			/* 07 */ Application.factory.createTile( '/static/c001.png', RES_SIZE ),
			/* 08 */ Application.factory.createTile( '/static/c002.png', RES_SIZE ),

			/* 09 */ Application.factory.createTile( '/static/d001.png', RES_SIZE ),
		] ;
		const MAP = [
			[0,0,0,0,0,0,0,0,2,2,2,0],
			[0,0,0,0,0,0,0,0,2,2,2,0],
			[0,0,[ 1,9 ],1,[1,8],1,0,0,0,0,0,0],
			[0,0,[ 1,9 ],[ 1,9 ],1,1,0,0,0,0,0,0],
			[0,0,[ 1,9 ],1,1,1,0,0,0,0,0,0],
			[0,0,0,[0,9],[1,9],1,0,0,0,0,0,0],
			[0,0,[0,9],[0,9],[0,9],0,0,0,0,[0,3],[0,4],0],
			[0,0,0,[0,9],0,[0,7],0,0,0,[0,5],[0,6],0],
			[0,0,0,0,0,0,0,0,0,0,0,0],
		] ;

		return {
			RES, MAP
		}
	}
	createMap = ( children ) => {
		const { RES, MAP } = this.createResources() ;
		return Application.factory.createMap( RES, MAP, children ) ;
	}
	createPlayer = () => {
		return (
			<Player key="player"/>
		)
	}

	render() {
		return 	(
			<main className={ Styles.Application }>
				<div className={ Styles.Content }>
					{ this.createMap([
						this.createPlayer()
					]) }
				</div>
			</main>
		)
	}
}