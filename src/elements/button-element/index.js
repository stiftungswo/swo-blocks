import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType( 'swo-elements/swo-button', {
	title: 'SWO Button',
	description: 'Hiermit kann ein Button eingefügt werden.',
	icon: 'editor-removeformatting',
	category: 'swo-elements',
	keywords: ['Button', 'Knopf', 'SWO'],
	attributes: {
		buttonContent: {
			type: 'string',
			source: 'html',
			selector: 'a',
		},
		buttonLink: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: '.selector-button'
		}
	},

	edit: function( props ) {
		return (
			<div>
				<a className="swo-button zivi-braun">
					<RichText
						onChange={ newContent => { props.setAttributes({buttonContent: newContent})} }
						value={props.attributes.buttonContent}
						placeholder="Hier bearbeiten"
						keepPlaceholderOnFocus={true}
						allowedFormats={'none'}
						tagName="a"
					/>
				</a>
				<p><strong>Link des Buttons (wird nicht angezeigt): </strong>
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
				<a href={props.attributes.buttonLink} className="selector-button swo-button zivi-braun" style="color: #61330E !important;border: 2px solid #61330E;">
					{props.attributes.buttonContent}
				</a>
		);
	},
} );
