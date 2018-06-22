import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// -------------------------------------------------------------
import './index.css';
import './css/font-awesome.css';
// -------------------------------------------------------------
import reducers from './reducers';
// -------------------------------------------------------------
import SignUp from './containers/SignUp';
import Home from './containers/Home';
// -------------------------------------------------------------
import * as nebulas from './nebulas/';
// -------------------------------------------------------------
import { unregister } from './registerServiceWorker';

// -------------------------------------------------------------
const store = createStore( 
  reducers,
  window.devToolsExtension && window.devToolsExtension()
);

//let { user } = store.getState().store;
const root = document.getElementById('root');


// -------------------------------------------------------------
const doRender = (user) => {
  if(user===null) {
    ReactDOM.render(
      <Provider store={store}>
        <SignUp />
      </Provider>, 
      root);
  } else {
    store.dispatch({ type:'SIGN_IN', user });
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>,
      root
    );
  }  
}

nebulas.getUser( user => {
  doRender(user);
});
/*
// -------------------------------------------------------------
// -------------------------------------------------------------
store.subscribe( ()=> {
  const newUser = store.getState().store.user;
  if( newUser!==user ) {
    user=newUser;
    doRender();
  }
});
// -------------------------------------------------------------
doRender(); */




// -------------------------------------------------------------
//registerServiceWorker();
unregister();