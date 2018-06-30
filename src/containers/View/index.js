import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// --------------------------------------------------------------
import languages from '../../config/languages';
// --------------------------------------------------------------
import { 
  fetchProject, voteForString, 
  contributeString, submitChanges, clearChanges 
} from '../../redux/store/actions';
// --------------------------------------------------------------
import "./css/view.css";

let whoami = null;

class View extends Component {

  componentDidMount() {
    const { pid } = this.props.match.params;
    this.props.fetchProject(pid);
  }

  vote = (id, text, upordown) => {
    this.props.voteForString(id, text, upordown);
  }
  contribute = (id, text) => {
    this.props.contributeString(id, text);
  }

  submitChanges = () => {
    const { changes } = this.props.store;
    this.props.submitChanges(changes);
  }
  
  render() {
    const { current } = this.props.store;
    if(!current) return <div className="view-main" />
    
    whoami = current.whoami;

    return (
      <div className="view-main">
        <div className="headline">{`ID: ${current.pid}`}</div>
        {
          current.changemade ? (
            <div className="change-made">
              <a onClick={this.submitChanges}>Save (*)</a>
            </div> 
          ) :
            ''
        }
        

        <table>
            <thead>
                <tr>
                  <td width="3%">ID</td>
                  <td width="33%">{languages.mapping[current.source]}</td>
                  <td width="33%">{languages.mapping[current.target]}</td>
                  <td width="30%">Contribute</td>
                </tr>
            </thead>
            <tbody>
              {
                Object.keys(current.strings).map(
                  stringid => 
                    <Row 
                      string={current.strings[stringid]}
                      vote={this.vote}
                      contribute={this.contribute}
                    />
                )
              }
            </tbody>
        </table>
      </div>
    )
  }

}

class Row extends Component {

  constructor(props) {
    super(props);
    this.state = {contribute: ''};
  }
  vote = (text, upordown) => {
    const { string: { id } } = this.props;
    this.props.vote(id, text, upordown);
  }

  onSubmit = event => {
    const { string: { id } } = this.props;
    event.preventDefault();
    this.props.contribute(id, this.state.contribute);
    this.setState({contribute:''});
  }

  onChange = event => {
    this.setState({contribute: event.target.value});
  }
  render() {
    const { string } = this.props;
    return (
      <tr>
        <td>{string.id}</td>
        <td valign="top">{string.text}</td>
        <td valign="top">
          {
            string.transStringObjs.map(
              trs => 
              <Translation 
                trs={trs}  
                vote={this.vote}
              />
            )
          }
        </td>
        <td valign="top">
          <form onSubmit={this.onSubmit}>
            <input type="submit" style={{display:'none'}}/>
            <input onChange={this.onChange} value={this.state.contribute}/>
          </form>
        </td>
      </tr>
    );
  }
  
}

class Translation extends Component {
  
  up = () => {
    const { trs: { text } } = this.props;
    this.props.vote(text,1);
  }

  down = () => {
    const { trs: { text } } = this.props;
    this.props.vote(text,-1);
  }

  render() {
    const { trs } = this.props;
    const diff = Object.keys(trs.posVotes).length - Object.keys(trs.negVotes).length;    
    const inactive = 
      trs.posVotes.hasOwnProperty(whoami) || 
      trs.negVotes.hasOwnProperty(whoami)     
    ;
    const transClass = 
      `trans-indicate ${inactive ? 'inactive' : '' }`;
    return (
      <div className="trans-main">
        <div className="trans-text">{trs.text}</div>
        <div className={transClass}>
          <i className="up fa fa-chevron-up" onClick={this.up} />
          <i className="down fa fa-chevron-down" onClick={this.down} />
        </div>
        <div className="trans-rating">{diff}</div>
      </div>
    );
  }
}
// --------------------------------------------------------------
// --------------------------------------------------------------
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    fetchProject, voteForString, 
    contributeString, submitChanges 
  }, dispatch);
}
function mapStateToProps(state) {
  return {
    store: state.store
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(View);
