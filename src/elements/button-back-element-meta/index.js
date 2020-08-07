import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType( 'swo-elements/button-back-element', {
	title: 'Back Button',
	description: 'Hiermit kann ein "Zurück"-Button eingefügt werden.',
	icon: 'editor-removeformatting',
	category: 'swo-elements',
	keywords: ['Button', 'Knopf', 'SWO'],
	attributes: {
		backButtonContent: {
			type: 'string',
			source: 'meta',
			meta: 'backButtonContent',
		},
		save_backButtonContent: {
			type: 'string',
			source: "html",
			selector: ".hhh",
		},
		buttonLink: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: "a",
		}
	},

	edit: function( props ) {
		return (
			<div>
				<RichText
					onChange={ newContent => { props.setAttributes({
						backButtonContent: newContent,
						save_backButtonContent: newContent,
					})} }
					value={props.attributes.backButtonContent}
					placeholder="Hier bearbeiten"
					keepPlaceholderOnFocus={true}
					allowedFormats={'none'}
					tagName="a"
					className="swo-button back-button"
				/>
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
		);
	},

	save: function( props ) {
		return (
			<div>
				<RichText.Content
					value={props.attributes.save_backButtonContent}
					tagName="a"
					href={props.attributes.buttonLink}
					className="swo-button back-button hhh"
				/>
			</div>

		);
	},
} );
