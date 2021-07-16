## Usage

```typescript
import * as React from 'react';
import { EExchange, CB } from 'eexchange';

export interface iDropdownProps {
	test?: boolean;
	isopen?: boolean;
	title: React.ReactNode;
	body: React.ReactNode;
}

export interface iDropdownState {
	isopen: boolean;
}

export abstract class Dropdown<PROP extends iDropdownProps, STATE extends iDropdownState> extends React.Component<PROP, STATE> {

	abstract getStateFromProps(props: PROP): STATE;

	constructor(props: PROP) {
		super(props);

		this.state = this.getStateFromProps(props);

		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
		this.toggle = this.toggle.bind(this);

		this.subscribeOpenDropdownCallback = this.subscribeOpenDropdownCallback.bind(this);
	}

	async componentDidMount() {
		this.subscribeEvents(this.props);
	}
    
	async componentWillUnmount() {
		EExchange.unsubscribeEvent(['open-dropdown'], this.subscribeOpenDropdownCallback);
	}

	private subscribeOpenDropdownCallback: CB<void> = (t) => {
		if (t.initiator !== this) this.close();
	};

	protected subscribeEvents(props: PROP) {
		EExchange.subscribeEvent(['open-dropdown'], this.subscribeOpenDropdownCallback);
	}

	toggle(event: React.MouseEvent) {
		event.stopPropagation();
		event.preventDefault();

		if (this.state.isopen) { this.close(); } else { this.open(); }
		return false;
	}

	close() {
		this.setState({isopen: false});
	}

	open() {
		this.setState({ isopen: true });

		EExchange.raiseEvent({ initiator: this, name: 'open-dropdown' });
	}


	abstract render(): React.ReactNode;
}

export class DropdownTest extends Dropdown<iDropdownProps, iDropdownState> {
    getStateFromProps(props: iDropdownProps): iDropdownState {
		return { isopen: props.isopen || false };
    }

	render(): React.ReactNode {
		return <div className="" style={{ display: 'block', float: 'left' }}>
			<a href="#" onClick={this.toggle}>{this.props.title}</a>
			<div style={{ display: this.state.isopen ? 'block' : 'none', position: 'absolute' }}>{this.props.body}</div>
		</div>;
	}
}
```
