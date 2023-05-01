import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter} from "react-router-dom";
import {GlobalContextProvider} from "./GlobalContext";
import {Provider} from 'react-redux'
import {store} from "./reducers";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <GlobalContextProvider>
                    <App/>
                </GlobalContextProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
