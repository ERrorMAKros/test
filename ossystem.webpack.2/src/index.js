import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import React from "react";
import InjectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router } from "react-router-dom";
import { AppContainer } from "react-hot-loader";
import Application from "./containers/Application";
import { MuiThemeProvider } from 'material-ui';
import store from "./redux/store";

const bootstrap = ( Component ) => {
  InjectTapEventPlugin() ;
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <Router>
          <AppContainer>
            <Component />
          </AppContainer>
        </Router>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById( 'root' )
  );
};

bootstrap( Application );

// Hot Module Replacement API
if( module.hot ) module.hot.accept( 'containers/Application', () => bootstrap( Application ) ) ;
