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
			selector: '#inh1',
		},
		projTitel1: {
			type: 'string',
			source: 'html',
			selector: '#tit1',
		},
		projInhalt2: {
			type: 'string',
			source: 'html',
			selector: '#inh2',
		},
		projTitel2: {
			type: 'string',
			source: 'html',
			selector: '#tit2',
		},
		projInhalt3: {
			type: 'string',
			source: 'html',
			selector: '#inh3',
		},
		projTitel3: {
			type: 'string',
			source: 'html',
			selector: '#tit3',
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

		const blockHasParent = ( clientId ) => clientId !== wp.data.select( 'core/editor' ).getBlockHierarchyRootClientId( clientId );

		if ( !blockHasParent( props.clientId ) ) {
			alert('ACHTUNG. Bitte einen Inhalt Block nur in einer Inhaltsseite benutzen.');
			throw new Error("ACHTUNG. Bitte einen Inhalt Block nur in einer Inhaltsseite benutzen.");
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
							placeholder="Überschrift..."
							keepPlaceholderOnFocus={true}
							allowedFormats={'none'}
						/>
					</h4>
					<RichText
						onChange={ newContent => { props.setAttributes({projContent1: newContent})} }
						value={props.attributes.projContent1}
						placeholder="Inhalt zu diesem Projekt... (Hier kann auch Text formatiert werden, zum Beispiel Fett, kursiv, unterstrichen"
						keepPlaceholderOnFocus={true}
						className="main-content-p"
					/>
					<InnerBlocks allowedBlocks={ [ 'core/image', 'core/paragraph', 'core/heading', 'swo-elements/button-element', 'swo-elements/button-back-element', 'swo-elements/list-element' ] } />
					<p className="editorOnly">Klicken Sie auf das "+" um ein Element hinzuzufügen. (Klicken Sie <strong>hier</strong>, wenn kein "+" angezeigt wird)</p>
				</div>
				<div className="wp-block-column side-info">
					<h6 id="inh1">
						<RichText
							onChange={ newContent => { props.setAttributes({projInhalt1: newContent})} }
							value={props.attributes.projInhalt1}
							placeholder="Inhalt..."
							keepPlaceholderOnFocus={true}
							allowedFormats={'none'}
						/>
					</h6>
					<p id="tit1" className="side-content-p">
						<RichText
							onChange={ newContent => { props.setAttributes({projTitel1: newContent})} }
							value={props.attributes.projTitel1}
							placeholder="Titel..."
							keepPlaceholderOnFocus={true}
							allowedFormats={'none'}
						/>
					</p>
					<h6 id="inh2">
						<RichText
							onChange={ newContent => { props.setAttributes({projInhalt2: newContent})} }
							value={props.attributes.projInhalt2}
							placeholder="Inhalt... (Leerlassen, falls nicht benötigt)"
							keepPlaceholderOnFocus={true}
							allowedFormats={'none'}
						/>
					</h6>
					<p id="tit2" className="side-content-p">
						<RichText
							onChange={ newContent => { props.setAttributes({projTitel2: newContent})} }
							value={props.attributes.projTitel2}
							placeholder="Titel... (Leerlassen, falls nicht benötigt)"
							keepPlaceholderOnFocus={true}
							allowedFormats={'none'}
						/>
					</p>
					<h6 id="inh3">
						<RichText
							onChange={ newContent => { props.setAttributes({projInhalt3: newContent})} }
							value={props.attributes.projInhalt3}
							placeholder="Inhalt... (Leerlassen, falls nicht benötigt)"
							keepPlaceholderOnFocus={true}
							allowedFormats={'none'}
						/>
					</h6>
					<p id="tit3" className="side-content-p">
						<RichText
							onChange={ newContent => { props.setAttributes({projTitel3: newContent})} }
							value={props.attributes.projTitel3}
							placeholder="Titel... (Leerlassen, falls nicht benötigt)"
							keepPlaceholderOnFocus={true}
							allowedFormats={'none'}
						/>
					</p>
					<RichText
						onChange={ newContent => { props.setAttributes({projHashtags: newContent})} }
						value={props.attributes.projHashtags}
						placeholder='#Hashtag... (Um mehrere Hashtags zu erstellen, drücken Sie "Enter")'
						keepPlaceholderOnFocus={true}
						allowedFormats={'none'}
						tagName="div"
						multiline="p"
					/>
					<h6>Kontakt</h6>
					<RichText
						onChange={ newContent => { props.setAttributes({projContact: newContent})} }
						value={props.attributes.projContact}
						placeholder="Ihre Kontaktangaben... (Hier können Zeilenumbrüche genutzt werden)"
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
					<InnerBlocks.Content />
				</div>
				<div className="wp-block-column side-info">
					<h6 id="inh1">{props.attributes.projInhalt1}</h6>
					<p id="tit1" className="side-content-p">{props.attributes.projTitel1}</p>
					<h6 id="inh2">{props.attributes.projInhalt2}</h6>
					<p id="tit2" className="side-content-p">{props.attributes.projTitel2}</p>
					<h6 id="inh3">{props.attributes.projInhalt3}</h6>
					<p id="tit3" className="side-content-p">{props.attributes.projTitel3}</p>
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
