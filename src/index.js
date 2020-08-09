import {registerBlockType} from '@wordpress/blocks';
import WorkshopMessage from "./Components/WorkshopMessage";

registerBlockType('block-workshop/custom-block', {
	title: 'Workshop Block',
	icon: 'universal-access-alt',
	category: 'design',
	edit: () => {
		/**
		 * Return the WorkshopLabel Component
		 */
		return (
			<WorkshopMessage/>
		);
	},
	save: () => {
		return <WorkshopMessage/>;
	},
});
