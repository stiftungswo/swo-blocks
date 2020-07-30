const { __ } = wp.i18n;
    var el = wp.element.createElement,
        registerBlockType = wp.blocks.registerBlockType,
        RichText = wp.editor.RichText;
    registerBlockType( 'swo-blocks/weird-formating', {
        title: 'TestBlock!',
        icon: 'id',
        category: 'swo-blocks',
        attributes: {
			content: {
				type: 'string',
				source: 'html',
				selector: 'p.prtx_contact_name',
			},
			content2:{
				type: 'string',
				source: 'html',
				selector: 'p.prtx_contact_address',
			},
		},

        edit: function( props ) {
            var content = props.attributes.content,
            content2 = props.attributes.content2;

            function onChangeContent( newContent ) {
                props.setAttributes( { content: newContent } );
            }

            function onChangeContent2 ( newContent2 ){
                props.setAttributes( { content2: newContent2 } );
            }

            return el ( 'div', { className: props.className }, 
                el(
                RichText,
                {
                    tagName: 'p',
                    className: 'prtx_contact_name',
                    onChange: onChangeContent,
                    value: content,
                }
                ),
                el(
                RichText,
                {
                    tagName: 'p',
                    className: 'prtx_contact_address',
                    onChange: onChangeContent2,
                    value: content2,
                }
                ),
            );
        },

        save: function( props ) {
            var content = props.attributes.content;
            var content2 = props.attributes.content2;
            return el ( 'div', { className: props.className },
                el( RichText.Content, {
                    tagName: 'p',
                    className: 'prtx_contact_name',
                    value: content,
                } ),
                el( RichText.Content, {
                    tagName: 'p',
                    className: 'prtx_contact_address',
                    value: content2,
                } ),
            );
        },
    } );