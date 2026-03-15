<?php
defined( 'ABSPATH' ) || exit;

register_activation_hook( defined( 'WPCSC_LITE' ) ? WPCSC_LITE : WPCSC_FILE, 'wpcsc_activate' );
register_deactivation_hook( defined( 'WPCSC_LITE' ) ? WPCSC_LITE : WPCSC_FILE, 'wpcsc_deactivate' );
add_action( 'admin_init', 'wpcsc_check_version' );

function wpcsc_check_version() {
	if ( ! empty( get_option( 'wpcsc_version' ) ) && ( get_option( 'wpcsc_version' ) < WPCSC_VERSION ) ) {
		wpc_log( 'wpcsc', 'upgraded' );
		update_option( 'wpcsc_version', WPCSC_VERSION, false );
	}
}

function wpcsc_activate() {
	wpc_log( 'wpcsc', 'installed' );
	update_option( 'wpcsc_version', WPCSC_VERSION, false );
}

function wpcsc_deactivate() {
	wpc_log( 'wpcsc', 'deactivated' );
}

if ( ! function_exists( 'wpc_log' ) ) {
	function wpc_log( $prefix, $action ) {
		$logs = get_option( 'wpc_logs', [] );
		$user = wp_get_current_user();

		if ( ! isset( $logs[ $prefix ] ) ) {
			$logs[ $prefix ] = [];
		}

		$logs[ $prefix ][] = [
			'time'   => current_time( 'mysql' ),
			'user'   => $user->display_name . ' (ID: ' . $user->ID . ')',
			'action' => $action
		];

		update_option( 'wpc_logs', $logs, false );
	}
}