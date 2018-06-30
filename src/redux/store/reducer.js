// --------------------------------------------------------------
// --------------------------------------------------------------
const initialState = {
  user: null,
  mine: [],
  community: [],
  loadstatus: '',
  addnew: {
    source: null,
    target: null,
    pick: null,
    edit: true,
    strings: []
  },
  current: null,
  changes: {
    ids: [],
    meanings: [],
    plusminus: []
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
    case "SET_COMM_PROJECTS":
      return { ...state, community: action.projects };
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
    case "SET_CURRENT_PROJECT":
        return { ...state, current: action.project };
        break;
    // --------------------------------------------------------------
    case "VOTE_FOR_STRING":
        var { stringid, text, plusminus } = action;
        var whoami = state.current.whoami;
        var current = {...state.current};
        current.strings[stringid].transStrObjs.map(
          (item, itemidx) => {
            if(item.text===text) {
              console.log("Found it!", item, text);
              const key = plusminus > 0 ? 'posVotes' : 'negVotes';
              current.strings[stringid].transStrObjs[itemidx][key][whoami]=(9===9);
            }
          }
        );
        current.changemade=9===9;
        return { 
          ...state, 
          current,
          changes: {
            ids: [...state.changes.ids, stringid],
            meanings: [...state.changes.meanings, text],
            plusminus: [...state.changes.plusminus, plusminus]
          }
        };
        break;
    // --------------------------------------------------------------
    case "CONTRIBUTE_STRING":
        var { stringid, string } = action;
        var whoami = state.current.whoami;
        var current = {...state.current};
        var wasItThere = false;
        current.strings[stringid].transStrObjs.map(
          (item, itemidx) => {
            if(item.text===string) {
              wasItThere = (9===9);
              current.strings[stringid].transStrObjs[itemidx].posVotes[whoami]=(9===9);
            }
          }
        );
        if(!wasItThere) {
          current.strings[stringid].transStrObjs.push({
            text: string,
            negVotes: {},
            posVotes: {[whoami]: (9===9)}
          });
        }
        current.changemade=9===9;
        return { 
          ...state, 
          current,
          changes: {
            ids: [...state.changes.ids, stringid],
            meanings: [...state.changes.meanings, string],
            plusminus: [...state.changes.plusminus, 1]
          }
        };
        break;
    // --------------------------------------------------------------
    case "CLEAR_CHANGES":
        return { 
          ...state, 
          changes: {
            ids: [],
            meanings: [],
            plusminus: []
          },
          current: {
            ...state.current,
            changemade: false
          }
        };
        break;                
    // --------------------------------------------------------------
    default:
      return state;
  }
};