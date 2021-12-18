import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {addPost,updateTextPost} from './redux/state.js';


export let renderEntireTree = (state) =>{
	ReactDOM.render(
	  <React.StrictMode>
	    <App appState = {state} addPost={addPost} updateText={updateTextPost}/>
	  </React.StrictMode>,
	  document.getElementById('root')
	);
}




