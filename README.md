## Usage

```typescript
import * as React from 'react';
import { EExchange, CB } from '../helpers/EExchange';

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
		// подписку на события делаем именно тут, так как сразу может прилететь событие, а мы не примонтированы и вызвать изменение стэйта будет опа
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
```
