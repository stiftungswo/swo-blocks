import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { withSelect } = wp.data;

registerBlockType( 'swo-blocks/all-projects-block', {
	title: 'Alle Projekte',
	description: 'Dies ist ein Baustein, der alle Projekte anzeigt (mit Link)',
    icon: 'dashicons-screenoptions',
	category: 'swo-blocks',
    keywords: ['Projekte', 'Inhalt', 'SWO'],

    edit: withSelect( select => {
        return {
            posts: select( 'core' ).getEntityRecords( 'postType', 'page', {
                // per_page: 4,
                metaKey: 'typeOfPost', // filter by metadata
                metaValue: 'type_project' // filter by metadata
              } )
        };
    })(({posts, className}) => {
        if( !posts ) {
            return (
                <p className={className}>Projekte werden geladen...</p>
            );
        }
        if( posts.length === 0 ) {
            return (
                <p className={className}>Keine Projekte vorhanden! Bitte erstellen Sie eine neue Seite und fügen Sie einen Inhaltsseiten-Block hinzu.</p>
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
                                    <p>{post.postDescription}</p>
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
