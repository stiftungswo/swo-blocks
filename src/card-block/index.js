import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, PlainText, MediaUpload } = wp.editor;
const { Button } = wp.components;

registerBlockType( 'swo-blocks/card-block', {
	title: 'Karte Test',
	description: 'Hiermit kann ein(e) Angestellte(r) eingefügt werden.',
	icon: 'businessman',
	category: 'swo-blocks',
	keywords: ['Mitarbeiter', 'SWO', 'Angestellte'],
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
		content: {
			type: 'array',
			source: 'children',
			selector: '.content',
		},
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
			<div className="wrap-boxes">
				<div className="imageDiv img-background imageDivteam">
					{
						(props.attributes.imgURL) ? (
							<div className="wrapimgselect">
								<img 
									src={props.attributes.imgURL}
									alt={props.attributes.imgAlt}
								/>
								{ (props.isSelected) ? (
									<Button
									onClick={onRemoveImg}
									className="button"
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
										className="button"
									>Bild wählen
									</Button>
								}
							/>
						)
					}
				</div>
				<div className="imageDiv bottomDiv classic-text bottomDivteam">
					<RichText
						onChange={ newContent => { props.setAttributes({content: newContent})} }
						value={props.attributes.content}
						placeholder="Hier Inhalt einfüllen"
					/>
				</div>
			</div>
		);
	},

	save: function( props ) {

		return (
			<div className="wrap-boxes">
				<div className="imageDiv img-background imageDivteam">
					<img 
						src={props.attributes.imgURL}
						alt={props.attributes.imgAlt}
					/>
				</div>
				<div className="imageDiv bottomDiv classic-text bottomDivteam">
					<h1>{props.attributes.content}</h1>
				</div>
			</div>
		);
	},
} );
