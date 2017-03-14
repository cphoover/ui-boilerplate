import React from 'react';
import Navigation from '../../components/navigation/navigation.jsx';
import Masthead from '../../components/masthead/masthead.jsx';
import Runbook from '../../components/runbook/runbook.jsx';
import SearchBar from '../../components/search_bar/search_bar.jsx';

require('whatwg-fetch');

export default class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			runbooks : []
		};
	}
	handleChange(event) {
		this.setState({
			message: event.target.value
		});
	}

	render() {
		return <div id="page-home">
				<Navigation/>
				<Masthead organization="Under Armour" title="B2B Runbook"/>
				<SearchBar />
				{
					this.state.runbooks.length ?
					this.state.runbooks.map(runbook => {
						return <Runbook
							name={runbook.name}
							description={runbook.description}
							schema={runbook.schema}
							key={runbook.id}
						/>;
					}) : <h2 className='no-results'>No Runbooks Found</h2>
				}
		</div>;
	}

	getRunbooks() {
		global.fetch('http://localhost:1337') // todo fetch from config
			.then(x => x.json())
			.then(parsed => {
				const keys = Object
					.keys(parsed);
				const runbooks = Object
					.values(parsed)
					.map((runbook, index) => Object.assign(runbook, {id : keys[index]}));

				const stateUpdates = {
					runbooks
				};

				this.setState(Object.assign({}, this.state, stateUpdates));
			});
	}

	componentDidMount() {
		this.getRunbooks();
	}
}
