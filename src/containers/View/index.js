import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// --------------------------------------------------------------
import "./css/view.css";

class View extends Component {
  
  render() {
    return (
      <div className="view-main">
        <div className="headline">ID dfurheeryyg</div>
        <table>
            <thead>
                <tr>
                  <td width="3%">No</td>
                  <td width="33%">English</td>
                  <td width="33%">German</td>
                  <td width="30%">Contribute</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                  <td>3</td>
                  <td valign="top">Bird</td>
                  <td valign="top">Haustuer (3)<br /> Schnecke (2)</td>
                  <td valign="top"><input /></td>
                </tr>
            </tbody>
        </table>
      </div>
    )
  }

}

// --------------------------------------------------------------
// --------------------------------------------------------------
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ },dispatch);
}
function mapStateToProps(state) {
  return {
    store: state.store
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(View);
