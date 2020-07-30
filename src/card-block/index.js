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
		}
	},

	edit: function( {className, attributes, setAttributes} ) {

		const { employeeName } = attributes;
		const { employeeFunct } = attributes;
		const { employeeDescr } = attributes;
		const { employeeFPhone } = attributes;
		const { employeeMPhone } = attributes;
		const { employeeMail } = attributes;


		function onChangeName( newContent ) {
			setAttributes( {employeeName: newContent});
		}

		function onChangeFunct( newContent ) {
			setAttributes( {employeeFunct: newContent});
		}

		function onChangeDescr( newContent ) {
			setAttributes( {employeeDescr: newContent});
		}

		function onChangeFPhone( newContent ) {
			setAttributes( {employeeFPhone: newContent});
		}

		function onChangeMPhone( newContent ) {
			setAttributes( {employeeMPhone: newContent});
		}

		function onChangeMail( newContent ) {
			setAttributes( {employeeMail: newContent});
		}

		return (
			<div className="wrap-boxes">
				<div className="imageDiv img-background imageDivteam"></div>
				<div className="imageDiv bottomDiv classic-text bottomDivteam">
					<RichText 
						tagName="h1"
						className= {className}
						onChange= {onChangeName}
						value= {employeeName}
						placeholder= "Vorname Nachname"
						keepPlaceholderOnFocus={true}
						allowedFormats={'core/bold'}
					/>
					<RichText 
						tagName="h7"
						className= {className}
						onChange= {onChangeFunct}
						value= {employeeFunct}
						placeholder= "Funktion"
						keepPlaceholderOnFocus={true}
						allowedFormats={'none'}
					/>
					<RichText 
						tagName="p"
						className= {className}
						onChange= {onChangeDescr}
						value= {employeeDescr}
						placeholder= "Beschreibung"
						keepPlaceholderOnFocus={true}
						allowedFormats={'none'}
					/>
					<RichText 
						tagName="a"
						className= {className}
						onChange= {onChangeFPhone}
						value= {employeeFPhone}
						placeholder= "Telefon Festnetz"
						keepPlaceholderOnFocus={true}
						allowedFormats={'none'}
					/>
					<RichText 
						tagName="a"
						className= {className}
						onChange= {onChangeMPhone}
						value= {employeeMPhone}
						placeholder= "Telefon Mobil"
						keepPlaceholderOnFocus={true}
						allowedFormats={'none'}
					/>
					<RichText 
						tagName="a"
						className= {className}
						onChange= {onChangeMail}
						value= {employeeMail}
						placeholder= "E-Mail"
						keepPlaceholderOnFocus={true}
						allowedFormats={'none'}
					/>
				</div>
			</div>
		);
	},

	save: function( {className, attributes} ) {

		const { employeeName } = attributes;
		const { employeeFunct } = attributes;
		const { employeeDescr } = attributes;
		const { employeeFPhone } = attributes;
		const { employeeMPhone } = attributes;
		const { employeeMail } = attributes;

		return (
			<div className="wrap-boxes">
				<div className="imageDiv img-background imageDivteam"></div>
				<div className="imageDiv bottomDiv classic-text bottomDivteam">
					<RichText.Content
						tagName="h1"
						className= "text-content"
						value= {employeeName}
					/>
					<RichText.Content
						tagName="h7"
						className= "text-content"
						value= {employeeFunct}
					/>
					<RichText.Content
						tagName="p"
						className= "text-content"
						value= {employeeDescr}
					/>
					<p><strong>Telefon Festnetz: </strong>
						<RichText.Content
							tagName="a"
							className= "text-content"
							value= {employeeFPhone}
						/>
						<strong>Telefon Mobil: </strong>
						<RichText.Content
							tagName="a"
							className= "text-content"
							value= {employeeMPhone}
						/>
						<strong>E-Mail: </strong>
						<RichText.Content
							tagName="a"
							className= "text-content"
							value= {employeeMail}
						/>
					</p>
				</div>
			</div>
		);
	},
} );
