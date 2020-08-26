<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** ----------------------- Add SWO Categories - PAGES */

function swo_pages_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'swo-pages',
				'title' => 'Seiten SWO',
                'icon'  => 'awards',
			),
		)
	);
}
add_filter( 'block_categories', 'swo_pages_category', 10, 2);

/** ----------------------- Add SWO Categories - BLOCKS */

function swo_blocks_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'swo-blocks',
				'title' => 'Blöcke SWO',
                'icon'  => 'awards',
			),
		)
	);
}
add_filter( 'block_categories', 'swo_blocks_category', 10, 2);

/** ----------------------- Add SWO Categories - ELEMENTS */

function swo_elements_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'swo-elements',
				'title' => 'Elemente SWO',
                'icon'  => 'awards',
			),
		)
	);
}
add_filter( 'block_categories', 'swo_elements_category', 10, 2);



function swo_adding_meta( $args, $request ) {
	if ( $meta_key = $request->get_param( 'metaKey' ) ) {
        $args['meta_key'] = $meta_key;
        $args['meta_value'] = $request->get_param( 'metaValue' );
    }
    return $args;
}
add_filter( 'rest_page_query', 'swo_adding_meta', 10, 2);



function swo_blocks_cgb_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'swo_blocks-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'swo_blocks-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-data', 'wp-compose' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'swo_blocks-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'swo_blocks-cgb-block-js',
		'cgbGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
			// Add more data here that you want to access from `cgbGlobal` object.
		]
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'cgb/block-swo-blocks', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'swo_blocks-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'swo_blocks-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'swo_blocks-cgb-block-editor-css',
		)
	);
}

// Hook: Block assets.
add_action( 'init', 'swo_blocks_cgb_block_assets' );

include(plugin_dir_path(__FILE__).'blocks/recent-projects-block/index.php');
include(plugin_dir_path(__FILE__).'blocks/all-projects-block/index.php');
include(plugin_dir_path(__FILE__).'blocks/all-pages-block/index.php');

//adding meta-fields of different blocks
function gutenberg_my_block_init() {
    register_meta( 'post', 'typeOfPost', array(
		'show_in_rest' => true,
		'type'         => 'string'
    ) );
    register_meta( 'post', 'signatureImage', array(
		'show_in_rest' => true,
		'type'         => 'string'
    ) );
    register_meta( 'post', 'postDescription', array(
		'show_in_rest' => true,
		'type'         => 'string'
	) );
	register_meta( 'post', 'areaColor', array(
		'show_in_rest' => true,
		'type'         => 'string'
    ) );
}
add_action( 'init', 'gutenberg_my_block_init' );

function add_metadata_swo() {
    register_rest_field( 'page',
        'signatureImage',
        array(
            'get_callback'      => 'rest_get_metadata',
            'update_callback'   => null,
            'schema'            => null,
        )
    );
    register_rest_field( 'page',
        'postDescription',
        array(
            'get_callback'      => 'rest_get_metadata',
            'update_callback'   => null,
            'schema'            => null,
        )
    );
}

add_action( 'rest_api_init', 'add_metadata_swo' );


function rest_get_metadata( $post, $field_name, $request ) {
    return get_post_meta( $post[ 'id' ], $field_name, true );
}