import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// --------------------------------------------------------------
import LanguagePicker from "../LanguagePicker/";
// --------------------------------------------------------------
import languages from '../../config/languages';
// --------------------------------------------------------------
import { 
  setNewPick, setNewLanguage, 
  editStrings, updateStrings,
  submitNew
} from '../../redux/store/actions';
// --------------------------------------------------------------
import "./css/new.css";

class New extends Component {

  constructor(props) {
    super(props);
    this.state={writing: false};
  }

  onTextAreaChange = event => {
    const newStrings = event.target.value.split("\n");
    this.props.updateStrings(newStrings);
  }

  closePopup = () => {
  }

  addLanguage = language => {
    this.props.setNewLanguage(language);
  }

  addNew = () => {
    const { mine, addnew } = this.props.store;
    const { pick, source, target, strings, edit } = addnew;
    this.setState({writing:true});
    this.props.submitNew
      (source, target, strings,
      () => {
        this.props.history.push('/my');
      }
    );
    
  }

  
  render() {

    if(this.state.writing) return <div className="new-main"></div>;
    const { mine, addnew } = this.props.store;
    const { pick, source, target, strings, edit } = addnew;
    const submitClass = (source && target && strings.length) ? 'active' : 'inactive';
    return (
      <div className="new-main">
        <LanguagePicker 
          addLanguage = {this.addLanguage}
          closePopup = {this.closePopup}
          pick={pick!==null}
        />
        <table>
            <thead></thead>
            <tbody>
            <tr>
                <td>Source Language</td>
                <td>
                  <div onClick={()=>this.props.setNewPick('source')} >
                    {
                      source===null ? (
                        <div className="language add-language">+</div>
                      ) : (
                        <div className="language">{languages.mapping[source]}</div>
                      )
                    }
                  </div>
                </td>
            </tr>
            <tr>
                <td>Target Language</td>
                <td>
                  <div onClick={()=>this.props.setNewPick('target')} >
                    {
                      target===null ? (
                        <div className="language add-language">+</div>
                      ) : (
                        <div className="language">{languages.mapping[target]}</div>
                      )
                    }
                  </div>
                </td>
            </tr>
            <tr>
                <td>Strings</td>
                <td>
                  {
                    edit ? (
                      <textarea 
                        onBlur = {this.onTextAreaChange}
                        placeholder="Paste newline separated list"
                      >
                      {
                        strings.join("\n")
                      }
                      </textarea>
                    ) : 
                    (
                      <div 
                        className="language"
                        onClick={ () => this.props.editStrings() }
                      >
                        Number Strings: {strings.length}
                      </div>
                    )
                  }
                </td>
            </tr>
            </tbody>
        </table>
        <div className="submit-container">
          <div className={`submit-btn ${submitClass}`} onClick={this.addNew}>
            Submit
          </div>
        </div>
      </div>
    )
  }

}

// --------------------------------------------------------------
// --------------------------------------------------------------
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { 
      setNewPick, 
      setNewLanguage, 
      editStrings, 
      updateStrings,
      submitNew
    }, dispatch);
}

function mapStateToProps(state) {
  return {
    store: state.store
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(New);
