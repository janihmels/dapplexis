import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// -------------------------------------------------------------
import './index.css';
import './css/font-awesome.css';
// -------------------------------------------------------------
import reducers from './reducers';
// -------------------------------------------------------------
import SignUp from './containers/SignUp';
import My from './containers/My';
import Community from './containers/Community';
import New from './containers/New';
import View from './containers/View';
import Frame from './Frame/';
// -------------------------------------------------------------
import * as nebulas from './nebulas/';
// -------------------------------------------------------------
import { unregister } from './registerServiceWorker';

// -------------------------------------------------------------
const store = createStore( 
  reducers,
  compose(applyMiddleware(thunk),
  window.devToolsExtension && window.devToolsExtension())
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
          <Frame>
            <Switch>
              <Route path="/my" component={My} />
              <Route path="/community" component={Community} />
              <Route path="/view/:pid" component={View} />
              <Route path="/new" component={New} />
            </Switch>
          </Frame>
        </BrowserRouter>
      </Provider>,
      root
    );
  }  
}

nebulas.getUser( 
  user => { doRender(user); }
);


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