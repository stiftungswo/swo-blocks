import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType( 'swo-elements/swo-list', {
	title: 'SWO Liste',
	description: 'Hiermit kann eine Liste eingefügt werden.',
	icon: 'editor-ul',
	category: 'swo-elements',
	keywords: ['Liste', 'Punkte', 'SWO'],
	attributes: {
		listContent: {
			type: 'string',
			source: 'html',
			selector: '.feature-list',
		}
	},

	edit: function( props ) {
		return (
			<ul className="feature-list">
				<RichText
					onChange={ newContent => { props.setAttributes({listContent: newContent})} }
					value={props.attributes.listContent}
					placeholder='Hier bearbeiten (Um mehrere Linien zu erstellen, drücken Sie "Enter")'
					keepPlaceholderOnFocus={true}
					allowedFormats={'none'}
					multiline="li"
				/>
            </ul>
		);
	},

	save: function( props ) {

		return (
			<div>
				<RichText.Content
					className="feature-list"
					tagName="ul"
					multiline="li"
					value={ props.attributes.listContent } 
				/>
            </div>
		);
	},
} );
