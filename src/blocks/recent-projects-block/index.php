<?php


function register_dynamic_block_action ( ) {

    // Registering the block
    register_block_type(
        'swo-blocks/recent-projects-block',
        [
            // Enqueue blocks.style.build.css on both frontend & backend.
			'style'           => 'swo_blocks-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script'   => 'swo_blocks-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
            'editor_style'    => 'swo_blocks-cgb-block-editor-css',
            // The render callback
            'render_callback' => ['block_dynamic_render_cb'],
        ]
    );

}

function block_dynamic_render_cb ( $att ) {

    // // Coming from RichText, each line is an array's element
    // $summe = $att['number1'][0] + $att['number2'][0]; 

    // $html = "<h1>$summe</h1>";

    // return $html;

    return "<h1>Hello SWO</h1>";
}

add_action( 'init', 'register_dynamic_block_action' );