import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { withSelect, select } = wp.data;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { SelectControl, Button } = wp.components;

registerBlockType( 'swo-pages/area-page', {
	title: 'Bereichsseite',
	description: 'Dies ist eine Seite um Inhalte von Bereichen anzuzeigen.',
	icon: 'media-default',
	category: 'swo-pages',
	keywords: ['Inhalt', 'Inhalt', 'SWO'],
	attributes: {
		typeOfPost: {
			type: 'string',
			source: 'meta',
			meta: 'typeOfPost',
		},
		postDescription: {
			type: 'string',
			source: 'meta',
			meta: 'postDescription',
		},
		signatureImage: {
			type: 'string',
			source: 'meta',
			meta: 'signatureImage',
		},
		imgURL: {
			type: 'string'
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
		titleString: {
			type: 'string',
			selector: '.bereich-title h1'
		},
		subTitle: {
			type: 'string',
			selector: '.bereich-title h4'
		},
		boxContent: {
			type: 'string',
			selector: '.bereich-title p'
		}
	},

	edit: function( props ) {

		const onFileSelect = (img) => {
			props.setAttributes({
				imgURL: img.url,
				signatureImage: img.url,
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

		const onChangeTitle = (newTitle) => {
			props.setAttributes({
				titleString: newTitle
			});
		}
		
		const onSelectDropdown = (newValue) => {
			props.setAttributes({
				typeOfPost: newValue
			});
		}
		
		const onChangeDescription = (newValue) => {
			props.setAttributes({
				postDescription: newValue
			});
		}

		var GetTitle = function GetTitle(props) {
			const title = select("core/editor").getEditedPostAttribute( 'title' );
			onChangeTitle(title);
			return <h1>{props.title}</h1>;
		};

		const selectTitle = withSelect(select => ({
			title: select("core/editor").getEditedPostAttribute( 'title' )
		}));
		const PostTitle = selectTitle(GetTitle);

		return (
			<div>
				<div className="editorOnly">
					<div>
						<SelectControl
							label='Soll diese Seite in einer Übersicht angezeigt werden?'
							value={ props.attributes.typeOfPost }
							onChange={onSelectDropdown}
							options={ [
								{ value: 'type_common', label: 'Nein' },
								{ value: 'type_project', label: 'Projektübersicht' },
								{ value: 'type_page', label: 'Seitenübersicht' },
							] }
						/>
					</div>
					<div>
						Beschreibung hinzufügen: 
						<RichText
							onChange={onChangeDescription}
							value={ props.attributes.postDescription }
							placeholder="Diese Beschreibung wird auf Kärtchen angezeigt.."
							keepPlaceholderOnFocus={true}
							allowedFormats={'none'}
						/>
					</div>
				</div>
				<div>
					{
						(props.attributes.imgURL) ? (

                            <header className="has-text-align-center bereich-header"
								style={{ backgroundImage: `url(${props.attributes.imgURL})`}}>

								{ (props.isSelected) ? (
									<Button
									onClick={onRemoveImg}
									className="button button-selectimg"
								>Bild löschen
								</Button>
								) : null }

                                <div className="entry-header-inner section-inner medium">

                                    <div className="bereich-title classic-text">
                                        <PostTitle />
										<h4>
                                            <RichText
                                                onChange={ newContent => { props.setAttributes({subTitle: newContent})} }
                                                value={props.attributes.subTitle}
                                                placeholder="Untertitel (Leerlassen, falls nicht benötigt)"
                                                keepPlaceholderOnFocus={true}
                                            />
                                        </h4>
										<RichText
											onChange={ newContent => { props.setAttributes({boxContent: newContent})} }
											value={props.attributes.boxContent}
											placeholder="Hier den Text für die Box bearbeiten"
											keepPlaceholderOnFocus={true}
											tagName="p"
										/>
                                    </div>
                                </div>
								
							</header>

						) : (
							<MediaUpload
								onSelect={onFileSelect}
								value={props.attributes.imgID}
								allowedTypes={['image']}
								render= {({open}) =>
									<Button
										onClick={open}
										className="button button-selectimg"
									>Bild für Kopfzeile wählen
									</Button>
								}
							/>
						)
					}
				</div>
				<div class="limit-content-width bereich-container">
					<InnerBlocks allowedBlocks={ [ 'swo-elements/button-element', 'swo-elements/button-back-element', 'swo-blocks/title-text-block', 'swo-blocks/area-lr-block', 'swo-blocks/area-rl-block' , 'swo-blocks/area-banner-block' ] } />
				</div>
			</div>
		);
	},

	save: function( props ) {

		return (
			<div>
                <header className="has-text-align-center bereich-header"
						style={{ backgroundImage: `url(${props.attributes.imgURL})`}}>

                    <div className="entry-header-inner section-inner medium">

                        <div className="bereich-title classic-text">
                            <h1>{props.attributes.titleString}</h1>
                            <h5>{props.attributes.subTitle}</h5>
                            <RichText.Content
								value={props.attributes.boxContent}
								tagName="p"
							/>
                        </div>
                    </div>

                </header>
				
				<div class="limit-content-width bereich-container">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
