import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, PlainText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;

registerBlockType( 'swo-blocks/area-lr-block', {
	title: 'Bereich Inhalt (Bild links)',
	description: 'Dies ist ein Baustein für die Bereichsseiten mit einem Bild links und Inhalt rechts.',
	icon: 'image-flip-horizontal',
	category: 'swo-blocks',
	keywords: ['Breiche', 'Inhalt', 'SWO'],
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
			<div className="left-right">
				<div className="bereich-image">
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
				<div className="bereich-text classic-text">
					<h5 className="no-serif-heading">
						<RichText
							onChange={ newContent => { props.setAttributes({areaSubtit: newContent})} }
							value={props.attributes.areaSubtit}
							placeholder="Untertitel"
							keepPlaceholderOnFocus={true}
							allowedFormats={'none'}
						/>
					</h5>
					<p>
						<RichText
							onChange={ newContent => { props.setAttributes({areaSubtxt: newContent})} }
							value={props.attributes.areaSubtxt}
							placeholder="Text zu diesem Untertitel"
							keepPlaceholderOnFocus={true}
							allowedFormats={'none'}
						/>
					</p>
					<InnerBlocks allowedBlocks={ [ 'swo-elements/button-element', 'swo-elements/list-element' ] } />
				</div>
			</div>
		);
	},

	save: function( props ) {

		return (
			<div className="left-right">
				<div className="bereich-image">
					<img 
						src={props.attributes.imgURL}
						alt={props.attributes.imgAlt}
					/>
				</div>
				<div className="bereich-text classic-text">
					<h5 className="no-serif-heading">{props.attributes.areaSubtit}</h5>
					<p>{props.attributes.areaSubtxt}</p>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
