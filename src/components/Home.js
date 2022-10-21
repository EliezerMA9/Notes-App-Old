import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { logout } from "./firebase";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { makeid } from "./utils";

export default function HomeScreen() {
  const [notes, setNotes] = useState([]);
  const [noteId, setNoteId] = useState([]);

  //If not logged then move to root
  useEffect(() => {
    if (localStorage.getItem("email") == null) {
      window.location.pathname = "";
    }
  });

  const newNote = () => {
    const db = getDatabase();
    set(ref(db, `users/${localStorage.getItem("uid")}/notes/${makeid()}`), {
      title: "la chori",
      note: " hola shorty",
    });
  };

  const noteCard = (key, title, note) => {
    return (
      <div
        className="card-container"
        id={`${key}-container`}
        style={{
          backgroundColor: "red",
          height: "5%",
          width: "20%",
          margin: "10px",
        }}
      >
        <input
          type="text"
          placeholder="title"
          id={`${key}-title`}
          defaultValue={title}
        />
        <input
          type="text"
          placeholder="note"
          id={`${key}-note`}
          defaultValue={note}
        />
        <button
          id={`${key}-`}
          onClick={(id) => {
            submitNote(id.target.id);
          }}
        >
          +
        </button>
      </div>
    );
  };

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, `users/${localStorage.getItem("uid")}/notes`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      let dataToInsert = { elements: [], ids: [] };

      Object.entries(data).forEach((obj) => {
        dataToInsert["elements"].push(
          noteCard(obj[0], obj[1]["title"], obj[1]["note"])
        );
        dataToInsert["ids"].push(obj[0]);
      });

      setNotes(dataToInsert["elements"]);
      setNoteId(dataToInsert["ids"]);
    });
  }, []);

  const submitNote = (id) => {
    let title = document.getElementById(id + "title").value;
    let note = document.getElementById(id + "note").value;

    const db = getDatabase();
    set(ref(db, `users/${localStorage.getItem("uid")}/notes/${makeid()}`), {
      title: title,
      note: note,
    });
  };

  const test = () => {
    const db = getDatabase();
    set(ref(db, `users/${localStorage.getItem("uid")}/notes/`), {
      title: "a",
      note: "e",
    });
  };

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <button onClick={newNote}>new note</button>
        <button onClick={test}>reset</button>
      </div>
      <div>
        <h2>notes container</h2>
        {notes}
      </div>
    </div>
  );
}
