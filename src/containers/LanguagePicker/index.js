import React, { Component } from 'react';
import languages from '../../config/languages';
import './picker.css';

// --------------------------------------------------
// --------------------------------------------------
export default class LanguagePicker extends Component {
  
  pickLanguage = (whichlang) => {
    this.props.addLanguage(whichlang);
  }

  render() {
    if(!this.props.pick) return null;
    return (
      <div>
        <div className="curtain" onClick={this.props.closePopup} />
        <div className="languagePicks">
          <div className="headline">Click to Add</div>
          {
            languages.list.map( 
              pair => 
                <LanguageItem
                  pair={pair} 
                  pickLanguage={this.pickLanguage}
                />
            )
          }
        </div>
      </div>
    );
  }
}

// --------------------------------------------------
// --------------------------------------------------
class LanguageItem extends Component {
  
  pickLang=() => {
    const pair = this.props.pair;
    return this.props.pickLanguage(pair[1]);
  }

  render() {
    const pair = this.props.pair;
    return (
      <div className="lang" onClick={this.pickLang}>
        { pair[0] }
      </div>
    );
  }
}