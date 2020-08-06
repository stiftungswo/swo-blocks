import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, PlainText, MediaUpload } = wp.editor;
const { Button } = wp.components;

registerBlockType( 'swo-blocks/employee-block', {
	title: 'Angestellte(r)',
	description: 'Hiermit kann ein(e) Angestellte(r) eingefügt werden.',
	icon: 'businessman',
	category: 'swo-blocks',
	keywords: ['Mitarbeiter', 'Angestellte', 'SWO'],
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
		employeeName: {
			type: 'string',
			source: 'html',
			selector: 'h1',
		},
		employeeFunct: {
			type: 'string',
			source: 'html',
			selector: 'h7',
		},
		employeeDescr: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		employeeFPhone: {
			type: 'string',
			source: 'html',
			selector: '.selectorFPhone',
		},
		employeeMPhone: {
			type: 'string',
			source: 'html',
			selector: '.selectorMPhone',
		},
		employeeMail: {
			type: 'string',
			source: 'html',
			selector: '.selectorMail',
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
			<div className="wrap-employee">
				<div className="imageDiv imageDivteam">
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
				<div className="imageDiv bottomDiv classic-text bottomDivteam">
					<h1>
						<RichText
							onChange={ newContent => { props.setAttributes({employeeName: newContent})} }
							value={props.attributes.employeeName}
							placeholder="Vorname Nachname"
							keepPlaceholderOnFocus={true}
							allowedFormats={'none'}
						/>
					</h1>
					<h7>
						<RichText
							onChange={ newContent => { props.setAttributes({employeeFunct: newContent})} }
							value={props.attributes.employeeFunct}
							placeholder="Funktion"
							keepPlaceholderOnFocus={true}
							allowedFormats={'none'}
						/>
					</h7>
					<p>
						<RichText
							onChange={ newContent => { props.setAttributes({employeeDescr: newContent})} }
							value={props.attributes.employeeDescr}
							placeholder="Beschreibung"
							keepPlaceholderOnFocus={true}
							allowedFormats={'none'}
						/>
					</p>
					<p><strong>Telefon Festnetz: </strong>
							<RichText
								onChange={ newContent => { props.setAttributes({employeeFPhone: newContent})} }
								value={props.attributes.employeeFPhone}
								placeholder="012 345 67 89"
								keepPlaceholderOnFocus={true}
								allowedFormats={'none'}
							/>{"\n"}
						<strong>Telefon Mobil: </strong>
							<RichText
								onChange={ newContent => { props.setAttributes({employeeMPhone: newContent})} }
								value={props.attributes.employeeMPhone}
								placeholder="012 345 67 89"
								keepPlaceholderOnFocus={true}
								allowedFormats={'none'}
							/>{"\n"}
						<strong>E-Mail: </strong>
							<RichText
								onChange={ newContent => { props.setAttributes({employeeMail: newContent})} }
								value={props.attributes.employeeMail}
								placeholder="x@stiftungswo.ch"
								keepPlaceholderOnFocus={true}
								allowedFormats={'none'}
							/>
					</p>
				</div>
			</div>
		);
	},

	save: function( props ) {

		return (
			<div className="wrap-employee">
				<div className="imageDiv imageDivteam">
					<img 
						src={props.attributes.imgURL}
						alt={props.attributes.imgAlt}
					/>
				</div>
				<div className="imageDiv bottomDiv classic-text bottomDivteam">
					<h1>{props.attributes.employeeName}</h1>
					<h7>{props.attributes.employeeFunct}</h7>
					<p>{props.attributes.employeeDescr}</p>
					<p><strong>Telefon Festnetz: </strong><span className="selectorFPhone">{props.attributes.employeeFPhone}</span><br></br>
						<strong>Telefon Mobil: </strong><span className="selectorMPhone">{props.attributes.employeeMPhone}</span><br></br>
						<strong>E-Mail: </strong><span className="selectorMail">{props.attributes.employeeMail}</span><br></br>
					</p>
				</div>
			</div>
		);
	},
} );
