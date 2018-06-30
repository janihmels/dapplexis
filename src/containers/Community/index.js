import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// --------------------------------------------------------------
import Row from '../Row';
// --------------------------------------------------------------
import { fetchCommProjects } from '../../redux/store/actions';
// --------------------------------------------------------------
import "./css/community.css";

class Community extends Component {
  
  addNew = () => {
    this.props.history.push('/new');
  }

  componentDidMount() {
    this.props.fetchCommProjects();
  }

  view = pid => {
    this.props.history.push(`./view/${pid}`);
  }

  render() {
    const { community } = this.props.store;
    return (
      <div className="comm-main">
        <table>
            <thead>
                <tr>
                  <td>ID</td>
                  <td>Source Language</td>
                  <td>Target Language</td>
                  <td>Translated / Total</td>
                </tr>
            </thead>
            <tbody>
              {
                community.map( (item, iidx) => {
                  return (
                    <Row 
                      item={item} 
                      viewItem={this.view} 
                      key={`row-${iidx}`}
                    />
                  )
                })
              }
            </tbody>
        </table>
      </div>
    )
  }

}

// --------------------------------------------------------------
// --------------------------------------------------------------
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCommProjects },dispatch);
}
function mapStateToProps(state) {
  return {
    store: state.store
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Community);
