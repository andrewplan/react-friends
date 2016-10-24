import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js'

import './styles.css';

document.addEventListener( 'DOMContentLoaded', () => {
    const reactNode = document.getElementById( 'react-node' );

    if ( reactNode ) {
        ReactDOM.render(
            <App />
            , reactNode );
    }
} );
