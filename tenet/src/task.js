(function() {
	/**
	 * @description TeNeT Task, native javascript only
	 *
	 */
	
	var onWaitForBodyBuildingComplete = function( event ) {
		
		var onReadyHandler = function() {
			
			var TeNeT = {
				ATTRIBUTES: {
					BORDER: [ "outline: 1px solid red", "opacity: .5" ].join(";")
				} ,
				ROUTES: {
					LEFT: "left" ,
					RIGHT: "right" ,
					UP: "top" ,
					DOWN: "bottom" ,
				} ,

				_selected: {
					styles: null ,
					item: null
				} ,
				
				get: function() {
					return this._selected
				},
				set: function( item ) {
					
					if( item ) {
					
						if( this._selected.styles && this._selected.item ) this._selected.item.setAttribute( "style", this._selected.styles ) ;
						
						this._selected.styles = item.getAttribute("style") ;
						this._selected.item = item ;
						this._selected.item.setAttribute( "style", this._selected.styles + this.ATTRIBUTES.BORDER ) ;

					} else this._selected = {
								styles: null ,
								item: null
							}
				} ,
				
				init: function() {
					
					var item = document.getElementsByTagName( 'div' ).item( 0 ) ;
					if( ! item ) return console.error( "No one element(s) found" ) ;
					else {
						this.set( item ) ;
						document.addEventListener( "keydown", this.onKeyDownHandler.bind(this), false ) ;
					}
					
				} ,
				find: function ( route ) {
					
					var current = this.get() ;
					var bounds = {
						item: current.item.getBoundingClientRect() ,
						body: document.body.getBoundingClientRect()
					}
					
					switch ( route )
					{
						case this.ROUTES.LEFT: {
							
							for( var offsetY = bounds.item.top ; offsetY <= bounds.item.bottom ; offsetY++ )
							for( var offsetX = bounds.item.left ; offsetX >= bounds.body.left ; offsetX-- )
							{
								var target = document.elementFromPoint( offsetX , offsetY ) ;
								if( target && target.tagName.toLowerCase() == "div" && target != this.get().item ) return target ;
							}
							
							break ;
						}
						case this.ROUTES.RIGHT: {
							
							for( var offsetY = bounds.item.top ; offsetY <= bounds.body.height ; offsetY++ )
							for( var offsetX = bounds.item.right ; offsetX <= bounds.body.width ; offsetX++ )
							{
								var target = document.elementFromPoint( offsetX , offsetY ) ;
								if( target && target.tagName.toLowerCase() == "div" && target != this.get().item ) return target ;
							}
							
							break ;
						}
						case this.ROUTES.UP: {
							
							for( var offsetX = bounds.item.left ; offsetX <= bounds.item.right ; offsetX++ )
							for( var offsetY = bounds.item.top ; offsetY >= bounds.body.top ; offsetY-- )
							{
								var target = document.elementFromPoint( offsetX , offsetY ) ;
								if( target && target.tagName.toLowerCase() == "div" && target != this.get().item ) return target ;
							}
							
							break;
						}
						case this.ROUTES.DOWN: {
					
							for( var offsetX = bounds.item.left ; offsetX <= bounds.item.right ; offsetX++ )
							for( var offsetY = bounds.item.bottom ; offsetY <= bounds.body.bottom ; offsetY++ )
							{
								var target = document.elementFromPoint( offsetX , offsetY ) ;
								if( target && target.tagName.toLowerCase() == "div" && target != this.get().item ) return target ;
							}
							
							break ;
						}
					}
					
					return current.item ;
				},

				onKeyDownHandler: function ( event ) {
					var item = null ;
					switch ( event.keyCode )
					{
						case 37: item = this.find( this.ROUTES.LEFT ) ;
						break;
						
						case 38: item = this.find( this.ROUTES.UP ) ;
						break;
						
						case 39: item = this.find( this.ROUTES.RIGHT ) ;
						break;
						
						case 40: item = this.find( this.ROUTES.DOWN ) ;
						break;
						
						case 13: return console.info( { selected: this.get().item.innerHTML } ) ;
						break;
					}
					
					if( item ) this.set( item ) ;
				}
			} ;
			
			TeNeT.init() ;
			
		} ;
		
		if( document.readyState != "complete" ) document.addEventListener( "DOMContentLoaded", onReadyHandler ) ;
		else onReadyHandler() ;
		
	} ;

	// wait for page render all own items
	setTimeout( onWaitForBodyBuildingComplete, 1000 ) ;
	
})();