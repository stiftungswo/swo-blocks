import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, PlainText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;

registerBlockType( 'swo-blocks/philosophy-block', {
	title: 'SWO Philosophie Block',
	description: 'Dies ist ein Baustein für die Startseite',
	icon: 'heart',
	category: 'swo-blocks',
	keywords: ['Philosophie', 'Startseite', 'SWO'],
	attributes: {
		imgURL_Box1: {
			type: 'string'
		},
		imgID_Box1: {
			type: 'number'
		},
		imgURL_Box2: {
			type: 'string'
		},
		imgID_Box2: {
			type: 'number'
		},
		imgURL_Box3: {
			type: 'string'
		},
		imgID_Box3: {
			type: 'number'
		},
		imgURL_Box4: {
			type: 'string'
		},
		imgID_Box4: {
			type: 'number'
		},
		box1: {
			type: 'string',
			source: 'html',
			selector: '.box1 .onpicture p',
		},
		box1Link: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: '.selectorBox1Link',
		},
		box2: {
			type: 'string',
			source: 'html',
			selector: '.box2 .onpicture p',
		},
		box2Link: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: '.selectorBox2Link',
		},
		box3: {
			type: 'string',
			source: 'html',
			selector: '.box3 .onpicture p',
		},
		box3Link: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: '.selectorBox3Link',
		},
		box4: {
			type: 'string',
			source: 'html',
			selector: '.box4 .onpicture p',
		},
		box4Link: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: '.selectorBox4Link',
		},
		philoText: {
			type: 'string',
			source: 'html',
			selector: '.philo-select',
		}
	},

	edit: function( props ) {

		const onFileSelect1 = (img) => {
			props.setAttributes({
				imgURL_Box1: img.url,
				imgID_Box1: img.id
			});
		}
		const onRemoveImg1 = () => {
			props.setAttributes({
				imgURL_Box1: null,
				imgID_Box1: null
			});
		}

		const onFileSelect2 = (img) => {
			props.setAttributes({
				imgURL_Box2: img.url,
				imgID_Box2: img.id
			});
		}
		const onRemoveImg2 = () => {
			props.setAttributes({
				imgURL_Box2: null,
				imgID_Box2: null
			});
		}

		const onFileSelect3 = (img) => {
			props.setAttributes({
				imgURL_Box3: img.url,
				imgID_Box3: img.id
			});
		}
		const onRemoveImg3 = () => {
			props.setAttributes({
				imgURL_Box3: null,
				imgID_Box3: null
			});
		}

		const onFileSelect4 = (img) => {
			props.setAttributes({
				imgURL_Box4: img.url,
				imgID_Box4: img.id
			});
		}
		const onRemoveImg4 = () => {
			props.setAttributes({
				imgURL_Box4: null,
				imgID_Box4: null
			});
		}

		const blockHasParent = ( clientId ) => clientId !== wp.data.select( 'core/editor' ).getBlockHierarchyRootClientId( clientId );

		if ( !blockHasParent( props.clientId ) ) {
			alert('ACHTUNG. Bitte den Philosophoe Block nur auf der Startseite benutzen.');
			throw new Error("ACHTUNG. Bitte den Philosophoe Block nur auf der Startseite benutzen.");
		}

		return (
			<section>

				<div className="grid-container-fp1">

					<div className="Front-page-top-right">

						<a className="picture-link">
							{
								(props.attributes.imgURL_Box1) ? (
									<div class="Bildung-forschung-entwicklung box1"
										style={{ backgroundImage: `url(${props.attributes.imgURL_Box1})`}}>

										{ (props.isSelected) ? (
											<Button
											onClick={onRemoveImg1}
											className="button button-selectimg"
										>Bild löschen
										</Button>
										) : null }

										<div class="onpicture">
											<RichText
												onChange={ newContent => { props.setAttributes({box1: newContent})} }
												value={props.attributes.box1}
												placeholder="Bereichstitel"
												keepPlaceholderOnFocus={true}
												allowedFormats={'none'}
												tagName="p"
											/>
											<RichText
												onChange={ newContent => { props.setAttributes({box1Link: newContent})} }
												value={props.attributes.box1Link}
												placeholder='Link... z.B: "about/zivildienst"'
												keepPlaceholderOnFocus={true}
												allowedFormats={'none'}
												className="editorOnly"
											/>
										</div>
										
									</div>
								) : (
									<MediaUpload
										onSelect={onFileSelect1}
										value={props.attributes.imgID_Box1}
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
						</a>

						<a className="picture-link">
							{
								(props.attributes.imgURL_Box2) ? (
									<div class="Bau box2"
										style={{ backgroundImage: `url(${props.attributes.imgURL_Box2})`}}>

										{ (props.isSelected) ? (
											<Button
											onClick={onRemoveImg2}
											className="button button-selectimg"
										>Bild löschen
										</Button>
										) : null }

										<div class="onpicture">
											<RichText
												onChange={ newContent => { props.setAttributes({box2: newContent})} }
												value={props.attributes.box2}
												placeholder="Bereichstitel"
												keepPlaceholderOnFocus={true}
												allowedFormats={'none'}
												tagName="p"
											/>
											<RichText
												onChange={ newContent => { props.setAttributes({box2Link: newContent})} }
												value={props.attributes.box2Link}
												placeholder='Link... z.B: "about/zivildienst"'
												keepPlaceholderOnFocus={true}
												allowedFormats={'none'}
												className="editorOnly"
											/>
										</div>
										
									</div>
								) : (
									<MediaUpload
										onSelect={onFileSelect2}
										value={props.attributes.imgID_Box2}
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
						</a>

						<a className="picture-link">
						{
								(props.attributes.imgURL_Box3) ? (
									<div class="Zivildienst box3"
										style={{ backgroundImage: `url(${props.attributes.imgURL_Box3})`}}>

										{ (props.isSelected) ? (
											<Button
											onClick={onRemoveImg3}
											className="button button-selectimg"
										>Bild löschen
										</Button>
										) : null }

										<div class="onpicture">
											<RichText
												onChange={ newContent => { props.setAttributes({box3: newContent})} }
												value={props.attributes.box3}
												placeholder="Bereichstitel"
												keepPlaceholderOnFocus={true}
												allowedFormats={'none'}
												tagName="p"
											/>
											<RichText
												onChange={ newContent => { props.setAttributes({box3Link: newContent})} }
												value={props.attributes.box3Link}
												placeholder='Link... z.B: "about/zivildienst"'
												keepPlaceholderOnFocus={true}
												allowedFormats={'none'}
												className="editorOnly"
											/>
										</div>
										
									</div>
								) : (
									<MediaUpload
										onSelect={onFileSelect3}
										value={props.attributes.imgID_Box3}
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
						</a>

						<a className="picture-link">
						{
								(props.attributes.imgURL_Box4) ? (
									<div class="Integration box4"
										style={{ backgroundImage: `url(${props.attributes.imgURL_Box4})`}}>

										{ (props.isSelected) ? (
											<Button
											onClick={onRemoveImg4}
											className="button button-selectimg"
										>Bild löschen
										</Button>
										) : null }

										<div class="onpicture">
											<RichText
												onChange={ newContent => { props.setAttributes({box4: newContent})} }
												value={props.attributes.box4}
												placeholder="Bereichstitel"
												keepPlaceholderOnFocus={true}
												allowedFormats={'none'}
												tagName="p"
											/>
											<RichText
												onChange={ newContent => { props.setAttributes({box4Link: newContent})} }
												value={props.attributes.box4Link}
												placeholder='Link... z.B: "about/zivildienst"'
												keepPlaceholderOnFocus={true}
												allowedFormats={'none'}
												className="editorOnly"
											/>
										</div>
										
									</div>
								) : (
									<MediaUpload
										onSelect={onFileSelect4}
										value={props.attributes.imgID_Box4}
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
						</a>

					</div>
					<div className="classic-text front-page-top-left">
						<RichText
							onChange={ newContent => { props.setAttributes({philoText: newContent})} }
							value={props.attributes.philoText}
							placeholder="Unsere Philosophie"
							keepPlaceholderOnFocus={true}
							allowedFormats={'none'}
							className="philo-select"
							tagName="p"
						/>
					</div>
				</div>
				
			</section>
		);
	},

	save: function( props ) {

		return (
			<section>

				<div className="grid-container-fp1">

					<div className="Front-page-top-right">

						<a className="picture-link selectorBox1Link" href={props.attributes.box1Link}>
							<div class="Bildung-forschung-entwicklung box1"
								style={{ backgroundImage: `url(${props.attributes.imgURL_Box1})`}}>

								<div class="onpicture">
									<p>{props.attributes.box1}</p>
								</div>

							</div>
						</a>

						<a className="picture-link selectorBox2Link" href={props.attributes.box2Link}>
							<div class="Bau box2"
								style={{ backgroundImage: `url(${props.attributes.imgURL_Box2})`}}>
								
								<div class="onpicture">
									<p>{props.attributes.box2}</p>
								</div>

							</div>
						</a>

						<a className="picture-link selectorBox3Link" href={props.attributes.box3Link}>
							<div class="Zivildienst box3"
								style={{ backgroundImage: `url(${props.attributes.imgURL_Box3})`}}>
								
								<div class="onpicture">
									<p>{props.attributes.box3}</p>
								</div>
								
							</div>
						</a>

						<a className="picture-link selectorBox4Link" href={props.attributes.box4Link}>
							<div class="Integration box4"
								style={{ backgroundImage: `url(${props.attributes.imgURL_Box4})`}}>
								
								<div class="onpicture">
									<p>{props.attributes.box4}</p>
								</div>
								
							</div>
						</a>

					</div>
					<div className="classic-text front-page-top-left">
						<RichText.Content
							className="philo-select"
							tagName="p"
							value={ props.attributes.philoText }
						/>
					</div>
				</div>
				
			</section>
		);
	},
} );
