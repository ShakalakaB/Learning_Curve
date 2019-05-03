import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import store from "./redux/store";

import Calculator from './Calculator';

ReactDOM.render(
    <Provider store={store}>
        <Calculator />
    </Provider>,
    document.getElementById('root')
);
module.hot.accept();