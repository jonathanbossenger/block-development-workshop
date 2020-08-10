import {registerBlockType} from '@wordpress/blocks';
import WorkshopMessageHeader from "./Components/WorkshopMessageHeader";

registerBlockType('block-workshop/custom-block', {
	title: 'Workshop Block',
	icon: 'universal-access-alt',
	category: 'design',
	edit: (props) => {
		const {className} = props;
		return (
			<WorkshopMessageHeader className={className}/>
		);
	},
	save: (props) => {
		const {className} = props;
		return <WorkshopMessageHeader className={className}/>;
	},
});
