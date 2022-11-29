import styles from "./login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("room", room);
    navigate("/room");
  };
  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Your name"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="text"
          placeholder="Room number"
          onChange={(e) => setRoom(e.target.value)}
          value={room}
        />
        <button type="submit"> Join room </button>
      </form>
    </div>
  );
}

export default Login;
