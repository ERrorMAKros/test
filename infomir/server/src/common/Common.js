export default class Common
{
	static uniqueId = () => {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
		{
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == 'x' ? r : (r&0x7|0x8)).toString(16);
		});
		
		return uuid;
	};
	static random = (min, max) => {
		min = Math.ceil( min );
		max = Math.floor( max );
		return Math.floor( Math.random() * ( max - min ) ) + min ;
	};
}