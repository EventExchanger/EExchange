import * as React from 'react';
import { Console } from '../models/commonModels';
//import { iContentProps } from '../models/contentModels';
import { EExchange, CB } from '../helpers/EExchange';
//import { Content } from './Content';
//import { Html } from '../Html';

export interface iDropdownProps {
	test?: boolean;
	isopen?: boolean;
	uid: string;
	title: React.ReactNode;
	body: React.ReactNode;
}

export interface iDropdownState {
	isopen: boolean;
}


export abstract class Dropdown<PROP extends iDropdownProps, STATE extends iDropdownState> extends React.Component<PROP, STATE> {
	private uid: string;

	abstract getStateFromProps(props: PROP): STATE;

	constructor(props: PROP) {
		super(props);
		//Console.log('!!!!');

		this.state = this.getStateFromProps(props);

		this.uid = props.uid;

		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
		this.toggle = this.toggle.bind(this);

		this.subscribeOpenDropdownCallback = this.subscribeOpenDropdownCallback.bind(this);
	}

	async componentDidMount() {
		// подписку на события делаем именно тут, так как сразу может прилететь событие, а мы не примонтированы и вызвать изменение стэйта будет опа
		this.subscribeEvents(this.props);

		// для отладки второй привязки быть не должно
		//this.subscribeEvents(this.props);
	}
	async componentWillUnmount() {
		EExchange.unsubscribeEvent(['open-dropdown'], this.subscribeOpenDropdownCallback);
	}

	private subscribeOpenDropdownCallback: CB<void> = (t) => {
		if (t.initiator !== this) this.close();
	};

	protected subscribeEvents(props: PROP) {
		// закрываем дропдаун при открытии любого другого дропдауна
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

	/*renderBootsrapV4() {
		return <div className="nav-item dropdown">
		</div>;
	}*/

	abstract render(): React.ReactNode;
}