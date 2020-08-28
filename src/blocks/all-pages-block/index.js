import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { withSelect } = wp.data;

registerBlockType( 'swo-blocks/all-pages-block', {
	title: 'Alle Seiten',
	description: 'Dies ist ein Baustein, der alle Seiten anzeigt (mit Link)',
    icon: 'screenoptions',
	category: 'swo-blocks',
    keywords: ['Seiten', 'Inhalt', 'SWO'],

    edit: withSelect( select => {
        return {
            posts: select( 'core' ).getEntityRecords( 'postType', 'page', {
                order: 'asc',
                orderby: 'title',
                metaKey: 'typeOfPost',
                metaValue: 'type_page'
              } )
        };
    })(({posts, className}) => {
        if( !posts ) {
            return (
                <p className={className}>Seiten werden geladen...</p>
            );
        }
        if( posts.length === 0 ) {
            return (
                <p className={className}>Keine Seiten vorhanden! Bitte erstellen Sie eine neue Seite und fügen Sie einen Inhaltsseiten-Block hinzu.</p>
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
                                    <p className="bottomDivDescription">{post.postDescription}</p>
                                    <a className="svg-button swo-button" href={post.link}>Weiterlesen</a>
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
