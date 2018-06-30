import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// --------------------------------------------------------------
import { addNew, fetchMyProjects } from '../../redux/store/actions';
// --------------------------------------------------------------
import "./css/my.css";

class My extends Component {
  
  addNew = () => {
    this.props.history.push('/new');
  }

  view = pid => {
    this.props.history.push(`./view/${pid}`);
  }
  
  componentDidMount() {
    this.props.fetchMyProjects();
  }


  render() {
    const { mine } = this.props.store;
    return (
      <div className="my-main">
        <div className="add-btn" onClick={this.addNew}>+ Add New</div><br />
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
                mine.map( item => {
                  return <Row item={item} viewItem={this.view} />
                })
              }
            </tbody>
        </table>
      </div>
    )
  }

}

class Row extends Component {

  viewItem = () => {
    const { item } = this.props;
    this.props.viewItem(item.id);
  }

  render() {
    const { item } = this.props;
    const trans = 0, total = item.strings.length;

    return (
      <tr onClick={this.viewItem}>
        <td>{item.id}</td>
        <td>{item.source}</td>
        <td>{item.target}</td>
        <td>{trans} / {total}</td>
      </tr>
    );
  }
}

// --------------------------------------------------------------
// --------------------------------------------------------------
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addNew, fetchMyProjects },dispatch);
}
function mapStateToProps(state) {
  return {
    store: state.store
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(My);
