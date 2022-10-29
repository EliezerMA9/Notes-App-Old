import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { randomId, getDateFormated } from "./utils";
import NotesList from "./NotesList";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

export default function HomeScreen() {
  const [notes, setNotes] = useState([]);
  const [fullData, setFullData] = useState([]);

  //Sort function
  const sortByDate = (data) => {
    const tempdata = [];
    Object.entries(data).forEach((obj) => {
      tempdata.push(obj);
    });

    tempdata.sort((a, b) => {
      return b[1]["date-info"]["orderBy"] - a[1]["date-info"]["orderBy"];
    });

    return tempdata;
  };

  //Search function
  const search = (text) => {
    let temparr = [];

    if (text !== "") {
      refreshData();
      fullData.forEach((elem) => {
        if (elem[1]["note"].includes(text) || elem[1]["title"].includes(text)) {
          console.log(elem);
          temparr.push(elem);
        }
      });
      setNotes(temparr);
    } else {
      refreshData();
    }
  };

  //If not logged then move to root
  useEffect(() => {
    if (localStorage.getItem("email") == null) {
      window.location.pathname = "";
    }
  });

  //Create new note
  const newNote = () => {
    const db = getDatabase();
    set(ref(db, `users/${localStorage.getItem("uid")}/notes/${randomId()}`), {
      title: "",
      note: "",
      color: "#395b64",
      "date-info": {
        created: getDateFormated(),
        modified: getDateFormated(),
        orderBy: Date.now(),
      },
    }).then(() => {
      refreshData();
    });
  };

  //Get current page title
  const getTitle = () => {
    switch (window.location.pathname) {
      case "/home":
        return "Home";
      case "/":
        return "Notes App";
      default:
        return "jeje";
    }
  };

  //Refresh data
  const refreshData = () => {
    const db = getDatabase();
    onValue(
      ref(db, `users/${localStorage.getItem("uid")}/notes`),
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setFullData(sortByDate(data));
          setNotes(sortByDate(data));
        }
      }
    );
  };

  //Initialize and listen to changes in page
  useEffect(() => {
    const db = getDatabase();

    onValue(
      ref(db, `users/${localStorage.getItem("uid")}/notes`),
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setFullData(sortByDate(data));
          setNotes(sortByDate(data));
        }
      }
    );

    window.onscroll = function () {
      myFunction();
    };

    let navbar = document.getElementById("navbar");
    let sticky = navbar.offsetTop;

    function myFunction() {
      if (window.pageYOffset >= sticky && window.pageYOffset > 30) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    }
  }, []);

  const test = () => {
    const db = getDatabase();
    set(ref(db, `users/${localStorage.getItem("uid")}/notes/${randomId()}`), {
      title: "",
      note: "",
      color: "#395b64",
      "date-info": {
        created: "a",
        modified: "a",
        orderBy: 1,
      },
    });
  };

  return (
    <div className="main-container">
      <Navbar title={getTitle()}></Navbar>
      <button onClick={test}>asd</button>
      <div className="searchbar-container">
        <SearchIcon className="search-icon"></SearchIcon>
        <input
          className="search-input"
          type="text"
          onChange={(e) => {
            search(e.target.value);
          }}
        />
      </div>
      <div>
        <NotesList data={notes}></NotesList>
      </div>
      <div className="fab-container">
        <Fab color="primary" aria-label="add" onClick={newNote}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
}
