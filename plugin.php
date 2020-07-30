<?php
/**
 * Plugin Name: Custom swo-blocks
 * Plugin URI: https://phyllon.ch
 * Description: Custom swo-blocks - To support the custom made SWO Theme
 * Author: PHYLLON
 * Author URI: https://phyllon.ch
 * Version: 1.0.0
 *
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
