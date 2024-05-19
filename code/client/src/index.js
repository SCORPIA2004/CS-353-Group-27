import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@radix-ui/themes/styles.css';
import Router from "./router";
import backgroundImage from "./assets/bg.jpg";

import {Theme, ThemePanel} from "@radix-ui/themes";
import AuthProvider from "./utils/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <Theme accentColor={'iris'} appearance={'dark'} scaling={'110%'} className={'css-selector'}
            // style={{
            //     backgroundImage: `url(${backgroundImage})`,
            //     backgroundPosition: 'center',
            //     backgroundRepeat: 'no-repeat',
            //     backgroundSize: 'cover'
            // }}
        >
            <Router/>
            {/*<ThemePanel />*/}
        </Theme>
    </AuthProvider>
);

