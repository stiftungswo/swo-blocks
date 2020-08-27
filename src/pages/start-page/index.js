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
				<p className="editorOnly">Wenn noch keine Slideshow vorhanden ist, fügen Sie den Block "Smart Slider 3" mit dem "+" <strong>ganz unten, ausserhalb der "Startseite"-Page</strong> ein und wählen Sie den Startseiten-Slider</p>
				<div class="limit-content-width">
					<InnerBlocks allowedBlocks={ [ 'swo-blocks/title-text-block', 'swo-blocks/philosophy-block', 'swo-blocks/recent-projects-block' ] } />
						<p className="editorOnly">Klicken Sie auf das "+" um Blöcke hinzuzufügen. (Klicken Sie <strong>hier</strong>, wenn kein "+" angezeigt wird)</p>
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
