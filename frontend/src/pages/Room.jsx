import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import GameActions from "../components/gameActions/GameActions";
import Header from "../components/header/Header";
import PlayerArea from "../components/playerArea/PlayerArea";
import styles from "./room.module.css";

function Room() {
  const [roomJoined, setRoomJoined] = useState(false);
  const [socket, setSocket] = useState(null);
  const [testMessage, setTestMessage] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [players, setPlayers] = useState([]);

  const ENDPOINT =
    window.location.host.indexOf("localhost") >= 0
      ? "http://127.0.0.1:4000"
      : window.location.host;

  useEffect(() => {
    if (socket === null) {
      setSocket(socketIOClient(ENDPOINT));
    }

    window.addEventListener("storage", () => {
      if (socket) {
        console.log("change to local storage!");
        let newPlayersData = JSON.parse(sessionStorage.getItem("playerData"));
        // if (newPlayersData) {
        //   setPlayers(newPlayersData);
        // }
        socket.emit("updateLettersAndWords", { newPlayersData, room });
        // console.log(`newPlayer data is ${JSON.stringify(newPlayer)}`);
      }
    });

    setUsername(sessionStorage.getItem("username"));
    setRoom(sessionStorage.getItem("room"));

    if (socket && roomJoined === false) {
      socket.emit("join_room", { username, room });
    }

    if (socket) {
      socket.on("room_joined", (data) => {
        console.log("USer joined room");

        setRoomJoined(true);
      });

      if (roomJoined) {
        socket.emit("create_player", { username, room });
      }

      socket.on("player_created", (data) => {
        setPlayers(data);
        sessionStorage.setItem("playerData", JSON.stringify(data));
        sessionStorage.setItem("socketId", socket.id);
      });

      socket.on("updated_players", (data) => {
        setPlayers(data);
        sessionStorage.setItem("playerData", JSON.stringify(data));
      });

      socket.on("lettersAndWordsUpdated", (data) => {
        console.log("THIS magical function is reached");
        console.log(`new data is ${JSON.stringify(data)}`);
        sessionStorage.setItem("playerData", JSON.stringify(data));
        setPlayers(data);
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
      <GameActions />
      <div className={styles.playersArena}>
        {players &&
          players.map((p) => {
            return (
              <PlayerArea
                username={p.username}
                key={`player-${p.socketId}`}
                id={`player-${p.socketId}`}
                letters={p.letters}
                words={p.words}
              />
            );
          })}
      </div>
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
