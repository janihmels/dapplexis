import LocalizedStrings from 'react-localization';
// --------------------------------------------------------------
import en from "./en.json";
import he from "./he.json";

//const en = JSON.parse(enencoded);

const input = {
  en, he
};


class Translate {

  constructor(area) {
    this.area = area;
    this.strings = new LocalizedStrings(input);
    this.strings.setLanguage('he');
  }

  do(key) {
    const fullKey = this.area+"_"+key;
    return this.strings[fullKey] || key;
  }
}


export default Translate;
