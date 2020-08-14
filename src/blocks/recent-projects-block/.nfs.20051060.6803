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
            posts: select( 'core' ).getEntityRecords( 'postType', 'page', {
                // Default args.
                per_page: 4,
              
                // Custom args.
                metaKey: 'typeOfPost', // filter by metadata
                metaValue: 'type_project' // not "true" unless the database value is exactly "true" (string)
              } )
        };
    })(({posts, className}) => {
        if( !posts ) {
            return (
                <p className={className}>Projekte der SWO werden geladen...</p>
            );
        }
        if( posts.length === 0 ) {
            return (
                <p className={className}>Keine Projekte der SWO vorhanden! Bitte erstellen Sie eine neue Seite und fügen Sie einen Inhaltsseiten-Block hinzu.</p>
            );
        }
        return (
            <section className="boxes-container-menu">
                <ul>
                    {posts.map( post => {
                        return (
                            <li class="wrap-boxes">
                                <div class="imageDiv img-background" 
								    style={{ backgroundImage: `url(${post.signatureImage})`}}>
                                </div>
                                <div class="imageDiv bottomDiv classic-text">
                                    <h1>{post.title.rendered}</h1>
                                    <p>{post.title.rendered}</p>
                                    <a className="svg-button" href={post.link}>Weiterlesen</a>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </section>
        );
    }),

    save ( props ) {
        return null //This block is rendered on PHP.
    },

} );
