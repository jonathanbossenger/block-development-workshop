console.log('loaded');

import { registerBlockType } from '@wordpress/blocks';

const blockStyle = {
	backgroundColor: '#900',
	color: '#fff',
	padding: '20px',
};

registerBlockType( 'block-workshop/custom-block', {
	title: 'Workshop Block',
	icon: 'universal-access-alt',
	category: 'design',
	example: {},
	edit() {
		return <div style={ blockStyle }>Hello World, step 1 (from the editor).</div>;
	},
	save() {
		return <div style={ blockStyle }>Hello World, step 1 (from the frontend).</div>;
	},
} );
