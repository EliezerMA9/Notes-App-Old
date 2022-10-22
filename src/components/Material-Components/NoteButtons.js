import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import PaletteIcon from "@mui/icons-material/Palette";

export default function CardButtons(props) {
  const handleDelete = () => {
    const db = getDatabase();
    remove(ref(db, `users/${localStorage.getItem("uid")}/notes/${props.nid}`));
  };

  const handleChangeColor = () => {
    console.log("color");
  };

  return (
    <div>
      <IconButton
        aria-label="delete"
        onClick={handleDelete}
        style={{ color: "white" }}
      >
        <DeleteIcon />
      </IconButton>

      <IconButton
        aria-label="color"
        onClick={handleChangeColor}
        style={{ color: "white" }}
      >
        <PaletteIcon />
      </IconButton>
    </div>
  );
}
