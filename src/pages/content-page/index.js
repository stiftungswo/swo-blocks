import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { withSelect, select } = wp.data;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { SelectControl, Button } = wp.components;

registerBlockType( 'swo-pages/content-page', {
	title: 'Inhaltsseite Standard & Projekte',
	description: 'Dies ist eine Seite um normale Inhalte anzuzeigen.',
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
			selector: '.entry-title'
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
			return <h1 className="entry-title">{props.title}</h1>;
		};

		const selectTitle = withSelect(select => ({
			title: select("core/editor").getEditedPostAttribute( 'title' )
		}));
		const PostTitle = selectTitle(GetTitle);

		return (
			<div>
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
				<div>
					{
						(props.attributes.imgURL) ? (
							<header className="entry-header has-text-align-center header-footer-group"
								style={{ backgroundImage: `url(${props.attributes.imgURL})`}}>

								{ (props.isSelected) ? (
									<Button
									onClick={onRemoveImg}
									className="button button-selectimg"
								>Bild löschen
								</Button>
								) : null }

								<div className="entry-header-inner section-inner medium">
									<PostTitle />
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
				<div className="limit-content-width">
					<InnerBlocks allowedBlocks={ [ 'swo-blocks/content-block', 'swo-blocks/employee-block', 'swo-blocks/title-text-block', 'core/heading', 'core/paragraph', 'swo-blocks/recent-projects-block', 'swo-blocks/all-projects-block', 'swo-blocks/all-pages-block'  ] } />
				</div>
			</div>
		);
	},

	save: function( props ) {

		return (
			<div>
				<header className="entry-header has-text-align-center header-footer-group"
						style={{ backgroundImage: `url(${props.attributes.imgURL})`}}>

					<div class="entry-header-inner section-inner medium">

						<h1 class="entry-title">{props.attributes.titleString}</h1>
					</div>

				</header>
				
				<div class="limit-content-width">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
