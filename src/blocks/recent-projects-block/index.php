<?php

add_action( 'plugins_loaded', 'register_recent_projects_block' );

function register_recent_projects_block() {
    register_block_type('swo-blocks/recent-projects-block', [
            'render_callback' => 'render_recent_projects_block'
    ]);
}

function render_recent_projects_block() {

    $latest_posts = wp_get_recent_posts( [
        'numberposts'   => 4,
        'orderby'       => 'post_date',
        'order'         => 'DESC',
        'post_type'     => 'page',
        'post_status'   => 'publish',
        'meta_key'      => 'typeOfPost',
        'meta_value'    => 'type_project'
    ] );

    if( empty($latest_posts) ) {
        return '<p>No posts</p>';
    }

    $posts_output = '<section class="boxes-container-menu"><ul>';
    foreach( $latest_posts as $post) {
        $post_id = $post['ID'];
        $post_thumbnail = get_post_meta( $post_id, 'signatureImage', true );
        $posts_output .= '
        <li class="wrap-boxes">
            <div class="imageDiv img-background" style="background-image: url('.$post_thumbnail.')"></div>
            <div class="imageDiv bottomDiv classic-text">
                <h1>
                    '.get_the_title( $post_id ).'
                </h1>
                <p>
                    '.get_the_title( $post_id ).'
                </p>
                <a class="svg-button" href="'.get_permalink( $post_id ).'">Weiterlesen</a>
            </div>
        </li>';
    }
    $posts_output .= '</ul></section>';

    return $posts_output;
}



add_action( 'rest_api_init', 'register_rest_images' );

function register_rest_images() {
    register_rest_field( array('post'),
        'fimg_url',
        array(
            'get_callback'      => 'get_rest_featured_image',
            'update_callback'   => null,
            'schema'            => null,
        )
    );
}

function get_rest_featured_image( $object, $field_name, $request) {
    if( $object['featured_media'] ) {
        $img = wp_get_attachment_image_src( $object['featured_media'], 'app-thumb' );
        return $img[0];
    }
    return false;
}



function add_metadata_swo() {
    register_rest_field( 'page',
        'signatureImage',
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