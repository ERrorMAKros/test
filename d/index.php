<?php
class R
{
	private $data = [
		"page:show:aup",
		"page:hide:aup",
		"page:show:byodWelcome",
		"page:show:byodSuccess",
		"page:show:byodInstallation",
		"page:show:byodDeviceInformation",
		"page:show:supportInformation",
		"page:hide:byodWelcome",
		"page:hide:byodSuccess",
		"page:hide:byodInstallation",
		"page:hide:byodDeviceInformation",
		"page:hide:supportInformation",
		"editor:show:byodWelcome:global-support-link",
		"editor:show:byodSuccess:global-support-link",
		"editor:show:byodInstallation:global-support-link",
		"editor:show:byodDeviceInformation:global-support-link",
		"editor:hide:byodWelcome:global-support-link",
		"editor:hide:byodSuccess:global-support-link",
		"editor:hide:byodInstallation:global-support-link",
		"editor:hide:byodDeviceInformation:global-support-link"
	];
	public function get() {
		foreach( $this->data as $key => $value ) {
			foreach( ["hide:", "show:"] as $id => $item ) {
				$pattern = '/' . $item . '[^"]+/';
				preg_match( $pattern, $value, $result );
				if ( isset( $result ) && ! empty( $result ) ) {
					$result = explode( ":",  $result[0] );
					if ( isset( $result ) && count( $result ) >= 2 ) {
						$buffer[] = $result[ 1 ] ;
					}
				}
			}
		}

		return
			isset( $buffer ) && ! empty( $buffer )
			? array_values( array_unique( $buffer ) )
			: null ;
	}
}

$r = new R();
header('Content-Type: application/json');
echo json_encode( $r->get() ) ;