// --------------------------------------------------------------
// --------------------------------------------------------------
const initialState = {
  user: null,
  mine: [],
  loadstatus: '',
  addnew: {
    source: null,
    target: null,
    pick: null,
    edit: true,
    strings: []
  }
};

// --------------------------------------------------------------
// --------------------------------------------------------------
export default function( state = initialState, action ) {

  switch(action.type) {
    // --------------------------------------------------------------
    case "SIGN_IN":
      if(action.user===null) return {...state, user: null};
      return { ...state, user: action.user };
      break;
    // --------------------------------------------------------------
    case "ADD_NEW":
      const newItem = {id: 'eeddfwei',source:'fr', target:'es', trans: 7, total: 9}
      return { ...state, mine: [...state.mine, newItem] };
      break;
    // --------------------------------------------------------------
    case "SET_LOADSTATUS":
      return { ...state, loadstatus: action.loadstatus };
      break;
    // --------------------------------------------------------------
    case "SET_MY_PROJECTS":
      return { ...state, mine: action.projects };
      break;
    // --------------------------------------------------------------
    case "SET_NEW_PICK":
      return { ...state, addnew: {...state.addnew, pick: action.pick} };
      break;    
    // --------------------------------------------------------------
    case "SET_NEW_LANGUAGE":
      let addnew = {...state.addnew};
      let pick =  state.addnew.pick;
      addnew[pick] = action.language;
      return { ...state, addnew: {...addnew, pick: null} };
      break;    
    // --------------------------------------------------------------
    case "EDIT_STRINGS":
        return { ...state, addnew: {...state.addnew, edit: !state.addnew.edit} };
        break;    
    // --------------------------------------------------------------
    case "UPDATE_STRINGS":
        return { 
          ...state, 
          addnew: {
            ...state.addnew, 
            strings: action.strings,
            edit: false
          } 
        };
        break;    
      // --------------------------------------------------------------

      default:
      return state;
  }
};