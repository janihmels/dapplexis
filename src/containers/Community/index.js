import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
                community.map( item => {
                  const trans = 0, total = item.strings.length;
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.source}</td>
                      <td>{item.target}</td>
                      <td>{trans} / {total}</td>
                    </tr>
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
