import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import Preview from './Preview';
import NotesList from './NotesList';

const unselect = arr => arr.forEach(item => item.selected = false);
const setLocalStorage = store => localStorage.setItem("notes", JSON.stringify(store));
const findIdx = (arr, id) => arr.findIndex(item => item.id == id);

export default function NotesApp() {
  // Notes state
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || [{
    title: "Description",
    id: 1,
    content: "- Notes App using ReactJS and Local Storage.",
    timeUpdated: "2022-02-22T07:29:41.796Z",
    selected: true,
  }]);
  // Preview state
  const [preview, setPreview] = useState({
    title: "",
    content: ""
  });

  useEffect(() => {
    setPreview(notes[0]);
  }, []);

  const callbackOnSelect = note => {
    unselect(notes);
    note.selected = true;
    setPreview(note);
  }

  const callbackOnAdd = () => {
    const newNote = {
      title: "New note",
      content: "- Content...",
      id: v4(),
      timeUpdated: new Date().toISOString(),
      selected: true,
    }

    unselect(notes);
    setPreview(newNote);
    setNotes([newNote, ...notes]);
    setLocalStorage([newNote, ...notes]);
  }

  const callbackOnSubmit = noteReturn => {
    const initialNotes = [...notes];
    const noteToUpdate = initialNotes.find(note => note.id == noteReturn.id);
    noteToUpdate.title = noteReturn.title.trim();
    noteToUpdate.content = noteReturn.content.trim();
    noteToUpdate.timeUpdated = new Date().toISOString();

    const index = findIdx(initialNotes, noteReturn.id);
    initialNotes.splice(index, 1);

    setNotes([noteToUpdate, ...initialNotes]);
    setLocalStorage([noteToUpdate, ...initialNotes]);
  };

  const callbackOnChange = e => {
    const { name, value } = e.target;
    setPreview({ ...preview, [name]: value });
  }

  const callbackOnDelete = idReturn => {
    if (window.confirm(`Delete note: ${preview.title}?`)) {
      const initialNotes = [...notes];
      const index = findIdx(initialNotes, idReturn);
      initialNotes.splice(index, 1);

      if (initialNotes.length >= 1) {
        initialNotes[0].selected = true;
        setPreview(initialNotes[0]);
        setLocalStorage(initialNotes);
      } else {
        setPreview();
        localStorage.removeItem("notes");
      }
      setNotes(initialNotes);
    };
  };

  return (
    <>
      <NotesList
        notes={notes}
        callbackOnAdd={callbackOnAdd}
        callbackOnSelect={callbackOnSelect} />
      <Preview
        preview={preview}
        callbackOnSubmit={callbackOnSubmit}
        callbackOnChange={callbackOnChange}
        callbackOnDelete={callbackOnDelete} />
    </>
  );
}