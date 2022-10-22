import { getDatabase, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import BasicMenu from "./Material-Components/ThreeDotMenu";
import { TextField } from "@mui/material";
import NoteButtons from "./Material-Components/NoteButtons";

const saveNote = (key, title, note) => {
  const db = getDatabase();
  set(ref(db, `users/${localStorage.getItem("uid")}/notes/${key}`), {
    title: title,
    note: note,
  });
};

export default function Note(props) {
  const [note, setNote] = useState(props.note);
  const [title, setTitle] = useState(props.title);

  const handleOnChangeNote = (e) => {
    var value = e.target.value;
    setNote(value);
  };

  const handleOnChangeTitle = (e) => {
    var value = e.target.value;
    setTitle(value);
  };

  useEffect(() => {
    saveNote(props.nid, title, note);
  });

  return (
    <div className="note-card">
      <input
        type="text"
        className="title-input"
        onChange={(e) => {
          handleOnChangeTitle(e);
        }}
        placeholder="Title"
        value={title}
      />
      <textarea
        placeholder="Note"
        className="note-input"
        value={note}
        onChange={(e) => {
          handleOnChangeNote(e);
        }}
      ></textarea>
      <div className="note-card-footer">
        <NoteButtons nid={props.nid}></NoteButtons>
      </div>
    </div>
  );
}

/* <TextField
        id="outlined-multiline-static"
        placeholder="Note"
        className="note-input"
        multiline
        value={note}
        onChange={(e) => {
          handleOnChangeNote(e);
        }}
      /> */
