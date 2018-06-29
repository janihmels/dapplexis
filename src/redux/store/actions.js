import { callNapi } from "../../system/system";
import * as nebulas from "../../nebulas/";


// ---------------------------------------------------------------------------------
export const signIn = user => {
    return {
      type: "SIGN_IN",
      user
    };
};

// ---------------------------------------------------------------------------------
export const addNew = () => {
  return {
    type: "ADD_NEW",
  };
};

// ---------------------------------------------------------------------------------
export const fetchAddNew = () => async dispatch => {
  dispatch(setLoadStatus('Getting data...'));
  callNapi('users','getLearner',{id: 'DEBVUi53g6ZNqUXEIjZn11QPlRg1'}).then(
    data => {
      console.log("Return Data", data);
      dispatch(setLoadStatus(''));
      dispatch(addNew());
    }
  ).catch(
    err => {
      console.log(err);
    }
  ); 
  return {
    type: "ADD_NEW",
  };
};

// ---------------------------------------------------------------------------------
export const setLoadStatus = loadstatus => {
  return {
    type: "SET_LOADSTATUS",
    loadstatus
  };
};

// ---------------------------------------------------------------------------------
export const fetchMyProjects = projects => dispatch => {
  dispatch(setLoadStatus('Getting data...'));
  nebulas.getUserProjects( projects => {
    dispatch(setMyProjects(projects));
    dispatch(setLoadStatus(''));
  });
}
// ---------------------------------------------------------------------------------
export const setMyProjects = projects => {
  return {
    type: "SET_MY_PROJECTS",
    projects
  };
}
// ---------------------------------------------------------------------------------
export const setCommProjects = projects => {
  return {
    type: "SET_COMM_PROJECTS",
    projects
  };
}
// ---------------------------------------------------------------------------------
export const setNewPick = pick => {
  return {
    type: "SET_NEW_PICK",
    pick
  };
}
// ---------------------------------------------------------------------------------
export const setNewLanguage = language => {
  return {
    type: "SET_NEW_LANGUAGE",
    language
  };
}
// ---------------------------------------------------------------------------------
export const editStrings = () => {
  return {
    type: "EDIT_STRINGS",
  };
}
// ---------------------------------------------------------------------------------
export const updateStrings = strings => {
  return {
    type: "UPDATE_STRINGS",
    strings
  };
}

// ---------------------------------------------------------------------------------
export const submitNew = (source, target, strings, callback) => dispatch => {
  dispatch(setLoadStatus('Writing data'));  
  nebulas.submitNew( 
    source, target, strings, 
    projects => {
      dispatch(setMyProjects(projects));
      dispatch(setLoadStatus(''));
      callback();
    }
  );
}

// ---------------------------------------------------------------------------------
export const fetchCommProjects = projects => dispatch => {
  dispatch(setLoadStatus('Getting data...'));
  nebulas.getCommunityProjects( projects => {
    dispatch(setCommProjects(projects));
    dispatch(setLoadStatus(''));
  });
}