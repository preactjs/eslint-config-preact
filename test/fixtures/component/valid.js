import { h, Component } from 'preact';

export class A extends Component {
	handleClick = () => {};

	renderBlah() {}

	render() {
		return (
			<div onClick={this.handleClick}>hello</div>
		);
	}
}
