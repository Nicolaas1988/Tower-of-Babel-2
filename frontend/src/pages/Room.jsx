import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Header from "../components/header/Header";

function Room() {
  const [roomJoined, setRoomJoined] = useState(false);
  const [socket, setSocket] = useState(null);
  const [testMessage, setTestMessage] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  const ENDPOINT =
    window.location.host.indexOf("localhost") >= 0
      ? "http://127.0.0.1:4000"
      : window.location.host;

  useEffect(() => {
    setUsername(sessionStorage.getItem("username"));
    setRoom(sessionStorage.getItem("room"));

    if (socket === null) {
      setSocket(socketIOClient(ENDPOINT));
    }

    if (socket && roomJoined === false) {
      socket.emit("join_room", { username, room });
    }

    if (socket) {
      socket.on("room_joined", (data) => {
        console.log("USer joined room");
        console.log(JSON.stringify(data));
        setRoomJoined(true);
      });

      if (roomJoined) {
        socket.emit("create_player", { username, room });
      }

      socket.on("player_created", (data) => {
        console.log(JSON.stringify(data));
      });

      socket.on("updated_players", (data) => {
        console.log(
          `Shit happened to the player list: ${JSON.stringify(data)}`
        );
      });

      socket.on("receive_test_message", (data) => {
        setReceivedMessage(data);
      });
    }
  }, [socket, roomJoined, ENDPOINT, room, username]);

  const testMessageChangeHandler = (e) => {
    setTestMessage(e.target.value);
    let dataToSend = {
      room: room,
      message: e.target.value,
    };
    socket.emit("send_test_message", dataToSend);
  };

  return (
    <div>
      <Header />
      <input
        type="text"
        onChange={testMessageChangeHandler}
        value={testMessage}
      ></input>
      <h1> Output</h1>
      <p> {receivedMessage}</p>
    </div>
  );
}

export default Room;
