'use strict';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const App = () => {
	return <h1>{'Salve!'}</h1>;
};

const root = document.getElementById('app-root');
ReactDOM.render(<App />, root);
