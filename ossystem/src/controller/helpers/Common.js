import MD5 from 'md5' ;
export const getRandomId = () => {
	const value = new Array(8).join().replace(/(.|$)/g, () => ( ( Math.random() * 36 ) | 0 ).toString( 36 )[ Math.random()<.5 ? "toString" : "toUpperCase" ]() );
	return MD5( [ value ].join( Math.random( 65535 ).toString() ) ) ;
}
