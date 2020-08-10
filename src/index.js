import {registerBlockType} from '@wordpress/blocks';
import {RichText} from '@wordpress/block-editor';
import WorkshopMessage from "./Components/WorkshopMessage";
import WorkshopMessageHeader from "./Components/WorkshopMessageHeader";

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
	edit: (props) => {
		const {attributes, setAttributes, className} = props;
		return (
			<WorkshopMessage attributes={attributes} setAttributes={setAttributes} className={className}/>
		);
	},
	save: (props) => {
		return (
			<div className={props.className}>
				<WorkshopMessageHeader/>
				<RichText.Content tagName="p" value={props.attributes.content}/>
			</div>
		);
	},
});
