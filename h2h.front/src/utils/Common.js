function output( name, text, color, ... data ) {
  if( ! name ) name = " "; else name += " ";
  if( ! text ) text = " "; else text += " ";
  console.log( "%c" + name + text , "color: " + color + ";", ... data );
} ;
export const Debug = {
	clear:   console.clear ,
	error: ( name, text, ... data ) => output( name, text, "#ff1f00", ... data ) ,
	log:   ( name, text, ... data ) => output( name, text, "#00d500", ... data ) ,
	info:  ( name, text, ... data ) => output( name, text, "#ff8908", ... data ) ,
	warn:  ( name, text, ... data ) => output( name, text, "#00bcff", ... data )
}
