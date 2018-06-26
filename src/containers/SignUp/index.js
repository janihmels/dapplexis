import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// --------------------------------------------------------------
import LanguagePicker from "../LanguagePicker/";
// --------------------------------------------------------------
import { signIn } from '../../redux/store/actions';
// --------------------------------------------------------------
import languages from '../../config/languages';
import * as nebulas from '../../nebulas';

// --------------------------------------------------------------
import './css/style.css';
import bars from './media/bars.gif';

// --------------------------------------------------------------
// --------------------------------------------------------------
class SignUp extends Component {
  
  // --------------------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      nick: '',
      languages: [],
      pickLanguage: false,
      transid: null
    };
  }

  // --------------------------------------------------------------
  openPopup = () => {
    this.setState({pickLanguage: true});
  }

  // --------------------------------------------------------------
  closePopup = () => {
    this.setState({pickLanguage: false});
  }

  // --------------------------------------------------------------
  addLanguage = language => {
    this.setState( {
      languages:[ ...this.state.languages, language ],
      pickLanguage: false
    });
  }
  // --------------------------------------------------------------
  removeLanguage = language => {
    this.setState( {
      languages: 
        this.state.languages.filter(x => x!==language)
    });
  }
  
  // --------------------------------------------------------------
  onChange = event => {
    this.setState({
      nick: event.target.value
    });
  }

  // --------------------------------------------------------------
  register = () => {
    const { nick, languages } = this.state;
    if(nick.length && languages.length) {
      const user = {nick, languages};
      nebulas.register(
        user, 
        transid => {
          this.setState({transid});
        },
        () => {
          this.props.signIn(user);
          window.location.href="./my";
        }
      )  
    }
  }
  // --------------------------------------------------------------
  // --------------------------------------------------------------
  render() {

    const { handleSubmit } = this.props;
    const isReady = 
      this.state.languages.length && 
      this.state.nick.length;
    const signupButtonClass = 
      `signup-btn ${isReady ? 'active' : 'inactive'}`;
    const { transid } = this.state;

    return (


      <div className="sign-up">
        {
          transid ? (
            <div>
              <div className="curtain" />
              <div className="please-wait">
                <img src={bars} /><br />
                Processing transaction
                <div className="trans-id">
                  <i>{transid}</i>
                </div>
              </div>
            </div>
          ) : null
        }
        
        <LanguagePicker 
          addLanguage = {this.addLanguage}
          closePopup = {this.closePopup}
          pick = {this.state.pickLanguage}
        /> 
  
        <div className="box signupSection">

          <div className="info">
            <h2>DApp Lexis</h2>
            <i className="icon ion-cube" aria-hidden="true"></i>
            <p>Decentralized Crowd Translation</p>
          </div>
          <form className="signupForm" name="signupform">
          <h2>Register</h2>
          <table>
            <thead></thead><tbody>
              <tr>
                <td className="category">Nick&nbsp;Name</td>
                <td>
                  <input
                    type="text" className="inputFields"
                    id="nick" name="nick"
                    value={this.state.nick} 
                    onChange={this.onChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className="category">My&nbsp;Languages</td>
                <td>
                  {
                    this.state.languages.map( 
                      language => 
                        <Language 
                          language = {language} 
                          removeLanguage = {this.removeLanguage}
                        />
                    )
                  }
                  <div className="language add-language" onClick={this.openPopup}>+</div>
                </td>
              </tr>
            </tbody>
          </table>

          <ul className="noBullet">
            <li id="center-btn">
              <input 
                type="button" 
                className={signupButtonClass} 
                alt="Register" 
                value={ this.state.transid ? '...' : 'Register' } 
                onClick = {this.register}
              />
            </li>
          </ul>

        </form>
        </div>
      </div>
    );
  }
}

class Language extends Component {
  
  removeItem = () => {
    const { language } = this.props;
    this.props.removeLanguage(language);
  }

  render() {
    const { language } = this.props;
    return (
      <div className="language">
        { languages.mapping[language] }
        <div 
          className="remove" 
          onClick={this.removeItem}
        >
          <i className="fa fa-close" />
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
  return { store: state.store };
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);