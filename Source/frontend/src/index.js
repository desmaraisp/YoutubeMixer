import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App';
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './Store/Store'
import './Shared Styles/normalize.css'
import {GlobalStyle} from './Shared Styles/Global styles'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <GlobalStyle />
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);