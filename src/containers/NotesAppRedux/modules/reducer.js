import { v4 } from 'uuid';
import * as ActionTypes from './constants';

const unselect = arr => arr.forEach(item => item.selected = false);
const setLocalStorage = store => localStorage.setItem("notes-redux", JSON.stringify(store));
const findIdx = (arr, id) => arr.findIndex(item => item.id == id);

const initialState = {
  notes: JSON.parse(localStorage.getItem("notes-redux")) || [{
    title: "Description",
    id: v4(),
    content: "- Notes App using ReactJS, Redux and Local Storage.",
    timeUpdated: "2022-02-22T07:29:41.796Z",
    selected: true,
  }],
  preview: {
    title: "",
    content: ""
  }
};

const notesReducer = (state = initialState, action) => {
  const initState = { ...state };
  const payload = action.payload;

  switch (action.type) {
    case ActionTypes.NOTES_SELECTED: {
      unselect(initState.notes);
      payload.selected = true;
      initState.preview = payload;

      state = initState;
      setLocalStorage(state.notes);
      return { ...state };
    }

    case ActionTypes.NOTES_ADD: {
      const newNote = {
        title: "New note",
        content: "- Content...",
        id: v4(),
        timeUpdated: new Date().toISOString(),
        selected: true,
      };

      unselect(initState.notes);
      initState.preview = newNote;
      initState.notes = [newNote, ...initState.notes];

      state = initState;
      setLocalStorage(state.notes);
      return { ...state };
    }

    case ActionTypes.NOTES_CHANGE: {
      state.preview = payload;
      return { ...state };
    }

    case ActionTypes.NOTES_SUBMIT: {
      const initialNotes = [...state.notes];
      const noteToUpdate = initialNotes.find(note => note.id === payload.id);
      noteToUpdate.title = payload.title.trim();
      noteToUpdate.content = payload.content.trim();
      noteToUpdate.timeUpdated = new Date().toISOString();

      const index = findIdx(initialNotes, payload.id);
      initialNotes.splice(index, 1);

      state.notes = [noteToUpdate, ...initialNotes];
      setLocalStorage(state.notes);
      return { ...state };
    }

    case ActionTypes.PREVIEW_REFRESH: {
      initState.notes.forEach(note => {
        note.selected = (note.id === payload.id ? true : false);
      });
      initState.preview = payload;

      state = initState;
      setLocalStorage(state.notes);
      return { ...state };
    }

    case ActionTypes.NOTES_DELETE: {
      const initialNotes = [...state.notes];
      const index = findIdx(initialNotes, payload);
      initialNotes.splice(index, 1);

      if (initialNotes.length >= 1) {
        initialNotes[0].selected = true;
        state.preview = initialNotes[0];
        setLocalStorage(initialNotes);
      } else {
        state.preview = null;
        localStorage.removeItem("notes-redux");
      }
      state.notes = initialNotes;
      return { ...state };
    };

    default:
      return { ...state };
  }
}

export default notesReducer;