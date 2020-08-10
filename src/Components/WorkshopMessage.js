import {Component} from '@wordpress/element';
import {RichText} from '@wordpress/block-editor';
import WorkshopMessageHeader from "./WorkshopMessageHeader";

class WorkshopMessage extends Component {
	render() {
		const {attributes: {content}, setAttributes, className} = this.props;
		const onChangeContent = (newContent) => {
			setAttributes({
				content: newContent,
			});
		};
		return (
			<div className={className}>
				<WorkshopMessageHeader />
				<RichText
					tagName="p"
					onChange={onChangeContent}
					value={content}
				/>
			</div>
		);
	}
}

export default WorkshopMessage;
