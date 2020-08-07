import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { withSelect, select } = wp.data;
const { RichText, PlainText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;

registerBlockType( 'swo-pages/area-page', {
	title: 'Bereichsseite',
	description: 'Dies ist eine Seite um Inhalte von Bereichen anzuzeigen.',
	icon: 'media-default',
	category: 'swo-pages',
	keywords: ['Inhalt', 'Inhalt', 'SWO'],
	attributes: {
		imgURL: {
			type: 'string'
		},
		imgID: {
			type: 'number'
		},
		imgAlt: {
			type: 'string',
			source: 'attribute',
			attribute: 'alt',
			selector: 'img'
		},
		titleString: {
			type: 'string',
			selector: '.bereich-title h1'
		},
		boxContent: {
			type: 'string',
			selector: '.bereich-title p'
		}
	},

	edit: function( props ) {

		const onFileSelect = (img) => {
			props.setAttributes({
				imgURL: img.url,
				imgID: img.id,
				imgAlt: img.alt
			});
		}
		const onRemoveImg = () => {
			props.setAttributes({
				imgURL: null,
				imgID: null,
				imgAlt: null
			});
		}

		const onChangeTitle = (newTitle) => {
			props.setAttributes({
				titleString: newTitle
			});
		}

		var GetTitle = function GetTitle(props) {
			const title = select("core/editor").getEditedPostAttribute( 'title' );
			onChangeTitle(title);
			return <h1>{props.title}</h1>;
		};

		const selectTitle = withSelect(select => ({
			title: select("core/editor").getEditedPostAttribute( 'title' )
		}));
		const PostTitle = selectTitle(GetTitle);

		return (
			<div>
				<div>
					{
						(props.attributes.imgURL) ? (

                            <header className="has-text-align-center bereich-header"
								style={{ backgroundImage: `url(${props.attributes.imgURL})`}}>

								{ (props.isSelected) ? (
									<Button
									onClick={onRemoveImg}
									className="button button-selectimg"
								>Bild löschen
								</Button>
								) : null }

                                <div className="entry-header-inner section-inner medium">

                                    <div className="bereich-title classic-text">
                                        <PostTitle />   
                                        <p>
                                            <RichText
                                                onChange={ newContent => { props.setAttributes({boxContent: newContent})} }
                                                value={props.attributes.boxContent}
                                                placeholder="Hier den Text für die Box bearbeiten"
                                                keepPlaceholderOnFocus={true}
                                            />
                                        </p>
                                    </div>
                                </div>
								
							</header>

						) : (
							<MediaUpload
								onSelect={onFileSelect}
								value={props.attributes.imgID}
								allowedTypes={['image']}
								render= {({open}) =>
									<Button
										onClick={open}
										className="button button-selectimg"
									>Bild für Kopfzeile wählen
									</Button>
								}
							/>
						)
					}
				</div>
				<div class="limit-content-width bereich-container">
					<InnerBlocks allowedBlocks={ [ 'swo-blocks/area-lr-block', 'swo-blocks/area-rl-block' ] } />
				</div>
			</div>
		);
	},

	save: function( props ) {

		return (
			<div>
                <header className="has-text-align-center bereich-header"
						style={{ backgroundImage: `url(${props.attributes.imgURL})`}}>

                    <div className="entry-header-inner section-inner medium">

                        <div className="bereich-title classic-text">
                            <h1>{props.attributes.titleString}</h1>    
                            <p>{props.attributes.boxContent}</p>
                        </div>
                    </div>

                </header>
				
				<div class="limit-content-width bereich-container">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
