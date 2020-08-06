import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, PlainText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;

registerBlockType( 'swo-blocks/content-block', {
	title: 'Projekt Inhalt',
	description: 'Hiermit kann der Projekt-Inhalt mit einem Bild und Inhalten erstellt werden.',
	icon: 'media-spreadsheet',
	category: 'swo-blocks',
	keywords: ['Projekt', 'Inhaltsseite', 'SWO'],
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
		projInhalt1: {
			type: 'string',
			source: 'html',
			selector: 'h6',
		},
		projTitel1: {
			type: 'string',
			source: 'html',
			selector: '.side-content-p',
		},
		projHeading1: {
			type: 'string',
			source: 'html',
			selector: 'h4',
		},
		projContent1: {
			type: 'string',
			source: 'html',
			selector: '.main-content-p',
		},
		projHashtags: {
			type: 'string',
			source: 'html',
			selector: '.hashtags',
		},
		projContact: {
			type: 'string',
			source: 'html',
			selector: '.side-contact',
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
			<div className="wrap-project wp-block-columns alignfull">
				<div className="wp-block-column main-info">
					{
						(props.attributes.imgURL) ? (
							<figure className="wp-block-image size-large">
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
							</figure>
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
					<h4>
						<RichText
							onChange={ newContent => { props.setAttributes({projHeading1: newContent})} }
							value={props.attributes.projHeading1}
							placeholder="Überschrift"
							keepPlaceholderOnFocus={true}
							allowedFormats={'none'}
						/>
					</h4>
					<RichText
						onChange={ newContent => { props.setAttributes({projContent1: newContent})} }
						value={props.attributes.projContent1}
						placeholder="Hier den Inhalt zu diesem Projekt einfüllen. (Hier kann auch Text formatiert werden, so können nach belieben mehrere Zeilen und Untertitel erstellt werden.)"
						keepPlaceholderOnFocus={true}
						className="main-content-p"
					/>
				</div>
				<div className="wp-block-column side-info">
					<h6>
						<RichText
							onChange={ newContent => { props.setAttributes({projInhalt1: newContent})} }
							value={props.attributes.projInhalt1}
							placeholder="Inhalt 1"
							keepPlaceholderOnFocus={true}
							allowedFormats={'none'}
						/>
					</h6>
					<p className="side-content-p">
						<RichText
							onChange={ newContent => { props.setAttributes({projTitel1: newContent})} }
							value={props.attributes.projTitel1}
							placeholder="Titel 1"
							keepPlaceholderOnFocus={true}
							allowedFormats={'none'}
						/>
					</p>
					<InnerBlocks allowedBlocks={ [ 'core/image', 'core/paragraph', 'core/heading' ] } />
					<RichText
						onChange={ newContent => { props.setAttributes({projHashtags: newContent})} }
						value={props.attributes.projHashtags}
						placeholder='#Hashtag (Um mehrere Hashtags zu erstellen, drücken Sie "Enter")'
						keepPlaceholderOnFocus={true}
						allowedFormats={'none'}
						tagName="div"
						multiline="p"
					/>
					<h6>Kontakt</h6>
					<RichText
						onChange={ newContent => { props.setAttributes({projContact: newContent})} }
						value={props.attributes.projContact}
						placeholder="Max Muster (Hier können Zeilenumbrüche genutzt werden)"
						keepPlaceholderOnFocus={true}
						allowedFormats={'none'}
						className="side-contact"
					/>
				</div>
			</div>
		);
	},

	save: function( props ) {

		return (
			<div className="wrap-project wp-block-columns alignfull">
				<div className="wp-block-column main-info">
					<figure className="wp-block-image size-large">
						<img 
							src={props.attributes.imgURL}
							alt={props.attributes.imgAlt}
						/>
					</figure>
					<h4>{props.attributes.projHeading1}</h4>
					<RichText.Content
						className="main-content-p"
						tagName="p"
						value={ props.attributes.projContent1 } 
					/>
				</div>
				<div className="wp-block-column side-info">
					<h6>{props.attributes.projInhalt1}</h6>
					<p className="side-content-p">{props.attributes.projTitel1}</p>
					<InnerBlocks.Content />
					<RichText.Content
						className="hashtags"
						tagName="div"
						multiline="p"
						value={ props.attributes.projHashtags } 
					/>
					<h6>Kontakt</h6>
					<RichText.Content
						className="side-contact"
						tagName="p"
						value={ props.attributes.projContact } 
					/>
				</div>
			</div>
		);
	},
} );
