import { useState, useEffect } from "react";
import { logInWithEmailAndPassword } from "./firebase";
import "../styles/login.css";

export default function LoginScreen() {
  //Set default states
  const [email, setEmail] = useState("eliezerxd9@gmail.com");
  const [password, setPassword] = useState("123456");
  const [pageToGo, setPageToGo] = useState("");

  //Functions
  const login = () => {
    logInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.pathname = "/";
        setPageToGo("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //If logged then move to home
  useEffect(() => {
    if (localStorage.getItem("email") !== null) {
      window.location.pathname = "/home";
    }
    if (pageToGo === "/") {
      console.log("logged");
    }
  });

  //Render component
  return (
    <div className="container">
      <div className="login-container">
        <p className="title">Login now.</p>
        <div className="email-container">
          <input
            type="email"
            className="email-input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="password-container">
          <input
            type="password"
            className="password-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="controls-container">
          <div className="top-button-container">
            <button className="forgot-button">Forgot password</button>
            <button className="login-button" onClick={login}>
              Login
            </button>
          </div>
          <div className="bottom-button-container">
            <button
              className="register-button"
              onClick={() => {
                window.location.pathname = "/register";
              }}
            >
              Don't have an account? Sign up here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
