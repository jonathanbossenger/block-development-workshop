import {Component} from '@wordpress/element';

class WorkshopMessageHeader extends Component {
	render() {
		return (
			<h3 className={this.props.className}>Welcome to our Workshop</h3>
		);
	}
}

export default WorkshopMessageHeader;
