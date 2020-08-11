import './editor.scss';
import './style.scss';

const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

registerBlockType( 'swo-pages/start-page', {
	title: 'Startseite',
	description: 'Dies ist die Startseite.',
	icon: 'media-default',
	category: 'swo-pages',
	keywords: ['Startseite', 'Slider', 'SWO'],

	edit: function() {

		return (
			<div>
				<div class="limit-content-width">
					<InnerBlocks allowedBlocks={ [ 'swo-blocks/title-text-block', 'eedee/block-gutenslide', 'swo-blocks/philosophy-block' ] } />
				</div>
			</div>
		);
	},

	save: function() {

		return (
			<div>
                <div class="limit-content-width">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
