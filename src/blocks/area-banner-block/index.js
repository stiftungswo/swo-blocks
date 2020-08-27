import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, PlainText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;

registerBlockType( 'swo-blocks/area-banner-block', {
	title: 'Bereich Kontakt-Banner mit farbigem Hintergrund',
	description: 'Dies ist ein Baustein für die Bereichsseiten mit einem farbigen Hintergrund.',
	icon: 'money',
	category: 'swo-blocks',
	keywords: ['Bereiche', 'Inhalt', 'SWO'],
	attributes: {
		title: {
			type: 'string',
			source: 'html',
			selector: '.selector-area-banner h1',
		},
		text: {
			type: 'string',
			source: 'html',
			selector: '.selector-area-banner p',
		},
		buttonContent: {
			type: 'string',
			source: 'html',
			selector: '.area-banner-button',
		},
		buttonLink: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: '.area-banner-button'
		}
	},

	edit: function( props ) {

		const blockHasParent = ( clientId ) => clientId !== wp.data.select( 'core/editor' ).getBlockHierarchyRootClientId( clientId );

		if ( !blockHasParent( props.clientId ) ) {
			alert('ACHTUNG. Bitte einen Bereich Banner Block nur in einer Bereichsseite benutzen.');
			throw new Error("ACHTUNG. Bitte einen Bereich Banner Block nur in einer Bereichsseite benutzen.");
		}

		return (
			<div className="area-banner">
				<div className="left-right limit-content-width">
					<div className="bereich-image">
						<InnerBlocks allowedBlocks={ [ 'swo-blocks/employee-block'] } />
						<p className="editorOnly">Klicken Sie auf das "+" um ein Mitarbeiter hinzuzufügen. (Klicken Sie <strong>hier</strong>, wenn kein "+" angezeigt wird)</p>
					</div>
					<div className="bereich-text classic-text">
						<div>
							<h1>
								<RichText
									onChange={ newContent => { props.setAttributes({title: newContent})} }
									value={props.attributes.title}
									placeholder="Hier den Titel angeben"
									keepPlaceholderOnFocus={true}
									allowedFormats={'none'}
								/>
							</h1>
							<p>
								<RichText
									onChange={ newContent => { props.setAttributes({text: newContent})} }
									value={props.attributes.text}
									placeholder="Hier den Text angeben"
									keepPlaceholderOnFocus={true}
									allowedFormats={'none'}
								/>
							</p>
							<a className="selector-button swo-button area-banner-button">
								<RichText
									onChange={ newContent => { props.setAttributes({buttonContent: newContent})} }
									value={props.attributes.buttonContent}
									placeholder="Hier bearbeiten"
									keepPlaceholderOnFocus={true}
									allowedFormats={'none'}
									tagName="a"
								/>
							</a>
							<p className="editorOnly"><strong>Link des Buttons (wird nicht angezeigt): </strong>
								<span>
									<RichText
										onChange={ newContent => { props.setAttributes({buttonLink: newContent})} }
										value={props.attributes.buttonLink}
										placeholder='Hier bearbeiten. Beispiel "about/zivildienst"'
										keepPlaceholderOnFocus={true}
										allowedFormats={'none'}
										className="selector-button"
									/>
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	},

	save: function( props ) {

		return (
			<div className="area-banner">
				<div className="left-right limit-content-width">
					<div className="bereich-image">
						<InnerBlocks.Content />
					</div>
					<div className="bereich-text classic-text">
						<div className="selector-area-banner">
							<h1>{props.attributes.title}</h1>
							<p>{props.attributes.text}</p>
							<a href={props.attributes.buttonLink} className="selector-button swo-button area-banner-button" style="color: #fff !important;">
								{props.attributes.buttonContent}
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	},
} );
