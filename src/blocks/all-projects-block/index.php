<?php

add_action( 'plugins_loaded', 'register_all_projects_block' );

function register_all_projects_block() {
    register_block_type('swo-blocks/all-projects-block', [
            'render_callback' => 'render_all_projects_block'
    ]);
}

function render_all_projects_block() {

    $latest_posts = wp_get_recent_posts( [
        'orderby'       => 'post_title',
        'order'         => 'ASC',
        'post_type'     => 'page',
        'post_status'   => 'publish',
        'meta_key'      => 'typeOfPost',
        'meta_value'    => 'type_project'
    ] );

    if( empty($latest_posts) ) {
        return '<p>Aktuell sind keine Projekte vorhanden</p>';
    }

    $posts_output = '<section class="boxes-container-menu"><ul>';
    foreach( $latest_posts as $post) {
        $post_id = $post['ID'];
        $post_titel = get_the_title( $post_id );
        $post_description = get_post_meta( $post_id, 'postDescription', true);
        $post_thumbnail = get_post_meta( $post_id, 'signatureImage', true );
        $post_permalink = get_permalink( $post_id );

        $posts_output .= '
        <li class="wrap-boxes">
            <div class="imageDiv img-background" style="background-image: url('.$post_thumbnail.')"></div>
            <div class="imageDiv bottomDiv classic-text">
                <h1>
                    '. $post_titel .'
                </h1>
                <p>
                    '. $post_description .'
                </p>
                <a class="svg-button" href="'. $post_permalink .'">Weiterlesen</a>
            </div>
        </li>';
    }
    $posts_output .= '</ul></section>';

    return $posts_output;
}