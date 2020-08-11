import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, PlainText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;

registerBlockType( 'swo-blocks/title-text-block', {
	title: 'Titel und Text',
	description: 'Hiermit kann ein Titel und der dazugehörende Text erstellt werden.',
	icon: 'format-quote',
	category: 'swo-blocks',
	keywords: ['Titel', 'Text', 'SWO'],
	attributes: {
		title: {
			type: 'string',
			source: 'html',
			selector: '.front-page-title-text h1',
		},
		text: {
			type: 'string',
			source: 'html',
			selector: '.front-page-title-text p',
		}
	},

	edit: function( props ) {

		const blockHasParent = ( clientId ) => clientId !== wp.data.select( 'core/editor' ).getBlockHierarchyRootClientId( clientId );

		if ( !blockHasParent( props.clientId ) ) {
			alert('ACHTUNG. Bitte einen Titel und Text Block nur in einer anderen Seite benutzen.');
			throw new Error("ACHTUNG. Bitte einen Titel und Text Block nur in einer anderen Seite benutzen.");
		}

		return (
			<div className="front-page-title-text classic-text">
				<RichText
					onChange={ newContent => { props.setAttributes({title: newContent})} }
					value={props.attributes.title}
					placeholder="Titel"
					keepPlaceholderOnFocus={true}
					allowedFormats={'none'}
					tagName="h1"
				/>
				<RichText
					onChange={ newContent => { props.setAttributes({text: newContent})} }
					value={props.attributes.text}
					placeholder="Text (Kann auch leer gelassen werden, um nur den Titel anzuzeigen)"
					keepPlaceholderOnFocus={true}
					allowedFormats={'none'}
					tagName="p"
				/>
			</div>
		);
	},

	save: function( props ) {

		return (
			<div className="front-page-title-text classic-text">
				<RichText.Content
					value={props.attributes.title}
					tagName="h1"
				/>
				<RichText.Content
					value={props.attributes.text}
					tagName="p"
				/>
			</div>
		);
	},
} );
