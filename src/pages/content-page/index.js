import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, PlainText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;

registerBlockType( 'swo-pages/content-page', {
	title: 'Inhaltsseite Standard & Projekte',
	description: 'Dies ist ein die Seite um normale Inhalte anzuzeigen.',
	icon: 'media-default',
	category: 'swo-pages',
	keywords: ['Inhalt', 'Inhalt', 'SWO'],
	attributes: {
		imgURL: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: 'img'
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
		areaSubtit: {
			type: 'string',
			source: 'html',
			selector: '.bereich-text h5',
		},
		areaSubtxt: {
			type: 'string',
			source: 'html',
			selector: '.bereich-text p',
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

		return (
			<div>
				<div>
					<p>Ihr Bild für die Kopfzeile:</p>
					{
						(props.attributes.imgURL) ? (
							<div>
								<img 
									src={props.attributes.imgURL}
									alt={props.attributes.imgAlt}
								/>
								{ (props.isSelected) ? (
									<Button
									onClick={onRemoveImg}
									className="button button-selectimg"
								>Bild löschen
								</Button>
								) : null }
							</div>
						) : (
							<MediaUpload
								onSelect={onFileSelect}
								value={props.attributes.imgID}
								allowedTypes={['image']}
								render= {({open}) =>
									<Button
										onClick={open}
										className="button button-selectimg"
									>Bild wählen
									</Button>
								}
							/>
						)
					}
				</div>
				<InnerBlocks allowedBlocks={ [ 'swo-blocks/content-block' ] } />
			</div>
		);
	},

	save: function( props ) {

		return (
			<div>
				<header class="entry-header has-text-align-center header-footer-group">

					<div class="entry-header-inner section-inner medium">

						<h1 class="entry-title">erverve</h1>
					</div>

				</header>
				
				<div class="limit-content-width">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
