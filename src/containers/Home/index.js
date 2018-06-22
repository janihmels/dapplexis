import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// -------------------------------------------------------------
import * as nebulas from '../../nebulas/';
// --------------------------------------------------------------
import { signIn } from '../../redux/store/actions';
// --------------------------------------------------------------
import "./css/home.css";

// --------------------------------------------------------------
// --------------------------------------------------------------
class Home extends Component {

  unregister = () => {
    nebulas.unregister( () => {
      window.location.href="/.";
    });
  }
  // --------------------------------------------------------------
  render() {

    const { history, store: { user } } = this.props;
    console.log("At home", this.props);

    return (
        <div className="main">
          <div className="header">
            <i className="icon ion-cube logo" aria-hidden="true"></i>
            <div className="text logo">DApp Lexis</div>
            <div className="user">Hi {user.nick} | <a onClick={this.unregister}>Unregister</a></div>
          </div>
        </div>
    );
  }
}

// --------------------------------------------------------------
// --------------------------------------------------------------
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signIn },dispatch);
}
function mapStateToProps(state) {
  return {
    store: state.store
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);
