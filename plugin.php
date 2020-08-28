<?php
/**
 * Plugin Name: SWO-Plugin
 * Plugin URI: https://davidkessler.ch
 * Description: Mit dem SWO-Plugin kann die neue Wordpress Seite der SWO sicher und der Corporate Identity entsprechend aufgebaut und verwaltet werden.
 * Author: David Kessler
 * Author URI: https://davidkessler.ch
 * Version: 1.0.0
 * 
 * Credits NICHT entfernen, dies wurde so abgesprochen. Danke. Sie können mich hier konntaktieren: me@davidkessler.ch oder 076 308 42 22
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
