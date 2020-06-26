import { Player } from "../../components/Player"

const STEP_OFFSET = 2 ;

const player = Player.defaults.players.link ;
const frameIndex = 0 ;
const key = Player.defaults.keyboard.up ;
const name = Player.defaults.skin[player].standby[ key ][ frameIndex ] ;
const x = 0 ;
const y = 0 ;


export default {
	STEP_OFFSET,
	frameIndex,
	player,
	name,
	key,
	x,
	y
} ;