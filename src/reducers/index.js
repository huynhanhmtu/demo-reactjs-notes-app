import { combineReducers } from "redux";
import notesReducer from "../containers/NotesAppRedux/modules/reducer";

const rootReducer = combineReducers({
  notesReducer,
});

export default rootReducer;