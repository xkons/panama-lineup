import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import LineUp from './components/LineUp/LineUp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<LineUp />, document.getElementById('root'));
registerServiceWorker();
