import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// --------------------------------------------------------------
import { signIn } from '../../redux/store/actions';
// --------------------------------------------------------------
import * as nebulas from '../../nebulas';

// --------------------------------------------------------------
// --------------------------------------------------------------
class Director extends Component {

  componentDidMount() {
    nebulas.isRegistered( data=> {
      if(data.user===null) {
        this.props.history.push('/signup');
        return null;
      }
      this.props.signIn(data.user);
    })
    console.log("Director Mounted");
  }

  componentDidUpdate() {
    /*console.log("Director Updated");
    if(this.props.location!=='/signup') {
      console.log("Director Inside");
      if(this.props.store.user===null) {
        this.props.history.push('/signup');
      }
    }*/ 
  }

  render() {
    return null;
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
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Director));
