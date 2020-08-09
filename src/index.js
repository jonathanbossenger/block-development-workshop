import {registerBlockType} from '@wordpress/blocks';
import {RichText} from '@wordpress/block-editor';

const blockStyle = {
	backgroundColor: '#900',
	color: '#fff',
	padding: '20px',
};

registerBlockType('block-workshop/custom-block', {
	title: 'Workshop Block',
	icon: 'universal-access-alt',
	category: 'design',
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
		id: {
			type: 'string',
		}
	},
	example: {
		attributes: {
			content: 'Hello World',
		},
	},
	/**
	 * the props parameter is passed to the edit function, and includes all the data from the parent block
	 * @param props
	 * @returns {JSX.Element}
	 */
	edit: (props) => {
		/**
		 * Unpack the attributes object, as well as the setAttributes and className methods from props
		 * Also, unpack the content attribute from the attributes object
		 */
		const {attributes: {content}, setAttributes, className} = props;
		/**
		 * Update the block attributes object, by updating the content attribute to whatever is passed to this function
		 * @param newContent
		 */
		const onChangeContent = (newContent) => {
			setAttributes({
				content: newContent,
				id: 'Rich Text'
			});
		};
		/**
		 * Return a RichText Component
		 */
		return (
			<RichText
				tagName="p"
				className={className}
				onChange={onChangeContent} // calls the onChangeContent function to update the content
				value={content}
			/>
		);
	},
	save: (props) => {
		/**
		 * When saving the block, use whatever is currently in the content attribute
		 */
		return <RichText.Content tagName="p" value={props.attributes.content}/>;
	},
});
