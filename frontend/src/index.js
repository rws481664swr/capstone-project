import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from "react-router-dom";
import {GlobalContextProvider} from "./state/contexts/GlobalContext";
import '@fortawesome/fontawesome-svg-core/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
                <GlobalContextProvider>
                    <App/>
                </GlobalContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
