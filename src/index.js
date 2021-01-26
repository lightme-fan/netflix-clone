import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyles } from './global-styles';
import { App } from './app';
import { FirebaseContext } from './context/firebase';

import { seedDatabase } from './seed'

const config = {
	apiKey: "AIzaSyCG0tqY1NyUWTp_gncAyITHIdJMdrNDnNE",
    authDomain: "netflix-onja-fanilo.firebaseapp.com",
    projectId: "netflix-onja-fanilo",
    storageBucket: "netflix-onja-fanilo.appspot.com",
    messagingSenderId: "642395274797",
    appId: "1:642395274797:web:ba0fb2ce0433d13d2882a4"
};

const firebase = window.firebase.initializeApp(config);
seedDatabase(firebase)

ReactDOM.render(
	<>
		<FirebaseContext.Provider value={{ firebase: window.firebase }}>
			<GlobalStyles />
			<App />
		</FirebaseContext.Provider>
	</>,
	document.getElementById('root')
);
