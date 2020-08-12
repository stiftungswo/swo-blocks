import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { withSelect, select } = wp.data;
const { RichText, PlainText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { Dropdown } = wp.components;
const { SelectControl } = wp.components;



registerBlockType( 'swo-blocks/recent-projects-block', {
	title: 'Letzte 4 Projekte',
	description: 'Dies ist ein Baustein, der die 4 neusten Projekte anzeigt (mit Link)',
    icon: 'dashicons-screenoptions',
	category: 'swo-blocks',
    keywords: ['Projekte', 'Inhalt', 'SWO'],

    edit: withSelect( select => {
        return {
            posts: select('core').getEntityRecords('postType', 'post', {per_page: 4})
        };
    })(({posts, className}) => {
        if( !posts ) {
            return (
                <p className={className}>Loading recent posts</p>
            );
        }
        if( posts.length === 0 ) {
            return (
                <p className={className}>No posts</p>
            );
        }
            return (
                <ul className={className}>
                    {posts.map( post => {
                        return (
                            <li>
                                <img src={post.fimg_url} width="100%"></img>
                                <a href={post.link}>
                                    {post.title.rendered}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            );
    }),

    save ( props ) {
        return null //This block is rendered on PHP.
    },

} );
