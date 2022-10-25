import { useState, useEffect } from "react";
import { registerWithEmailAndPassword } from "./firebase";
import "../styles/register.css";

export default function RegisterScreen() {
  //Set default states
  const [email, setEmail] = useState("eliezerxd9@gmail.com");
  const [password, setPassword] = useState("123456");
  const [username, setUsername] = useState("");
  const [pageToGo, setPageToGo] = useState("");

  //Functions
  const processRegister = () => {
    if (username !== "")
      registerWithEmailAndPassword(email, password, username)
        .then(() => {
          setPageToGo("/");
          window.location.pathname = "/";
        })
        .catch((e) => {
          console.log(e);
        });
  };

  //If not logged then move to home
  useEffect(() => {
    if (localStorage.getItem("email") !== null) {
      window.location.pathname = "/home";
    }
    if (pageToGo === "/") {
      console.log("logged");
    }
  });

  return (
    <div className="container">
      <div className="register-container">
        <p className="title">Register now.</p>

        <div className="username-container">
          <input
            className="username-input"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="email-container">
          <input
            className="email-input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="password-container">
          <input
            className="password-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="controls-container">
          <button onClick={processRegister}>sign in</button>
          <a href="/login">login</a>
        </div>
      </div>
    </div>
  );
}
