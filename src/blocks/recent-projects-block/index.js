import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { withSelect, select } = wp.data;
const { RichText, PlainText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { Dropdown } = wp.components;
const { SelectControl } = wp.components;



registerBlockType( 'swo-blocks/recent-projects-block', {
	title: 'Letzte 4 Projekte',
	description: 'Dies ist ein Baustein, der die 4 neusten Projekte anzeigt (mit Link)',
    icon: 'media-default',
    //icon: 'dashicons-screenoptions',
	category: 'swo-blocks',
    keywords: ['Breiche', 'Inhalt', 'SWO'],
    attributes: {
        number1: {
            type: 'string',
        },
        number2: {
            type: 'string',
        },
    },

    edit ( props ) {
        
        var number1 = props.attributes.number1 
        var number2 = props.attributes.number2 
        
        function onChangeNumber1 ( content ) {
            props.setAttributes({number1: content})
        }

        function onChangeNumber2 ( content ) {
            props.setAttributes({number2: content})
        }              
          
        return (
            <div>
                <h1>Test</h1>
                <p>Diese Zahlen sollen vom Server addiert werden</p>
                <label>Zahl 1:</label>
                <RichText
                    className={props.className}
                    onChange={onChangeNumber1}
                    value={number1}
                    placeholder="Zahl eingeben"
                />
                <label>Zahl 2:</label>
                <RichText
                    className={props.className} 
                    onChange={onChangeNumber2} 
                    value={number2}
                    placeholder="Zahl eingeben"
                />                
            </div>
        )
    },

    save ( props ) {
        return null //This block is rendered on PHP.
    },
} );
