import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { withSelect, select } = wp.data;
const { RichText, PlainText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;

registerBlockType( 'swo-pages/content-page', {
	title: 'Inhaltsseite Standard & Projekte',
	description: 'Dies ist eine Seite um normale Inhalte anzuzeigen.',
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
			selector: '.entry-title'
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
			return <h1 className="entry-title">{props.title}</h1>;
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
							<header className="entry-header has-text-align-center header-footer-group"
								style={{ backgroundImage: `url(${props.attributes.imgURL})`}}>

								{ (props.isSelected) ? (
									<Button
									onClick={onRemoveImg}
									className="button button-selectimg"
								>Bild löschen
								</Button>
								) : null }

								<div className="entry-header-inner section-inner medium">
									<PostTitle />
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
				<div class="limit-content-width">
					<InnerBlocks allowedBlocks={ [ 'swo-blocks/content-block' ] } />
				</div>
			</div>
		);
	},

	save: function( props ) {

		return (
			<div>
				<header className="entry-header has-text-align-center header-footer-group"
						style={{ backgroundImage: `url(${props.attributes.imgURL})`}}>

					<div class="entry-header-inner section-inner medium">

						<h1 class="entry-title">{props.attributes.titleString}</h1>
					</div>

				</header>
				
				<div class="limit-content-width">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
