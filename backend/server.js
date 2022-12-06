import http from "http";
import path from "path";
import { Server } from "socket.io";
import express from "express";

const app = express();
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});

const httpServer = http.Server(app);

const io = new Server(httpServer, { cors: { origin: "*" } });
let players = [];
const initialiseLetters = (socketId) => {
  const letters = "abcdefghijklmnopqrstuvwxyz";

  let randomLetters = [];

  for (let i = 0; i <= 25; i++) {
    let index = Math.floor(Math.random() * 26);

    let letter = {};
    letter[`player-${socketId}-letter-${i}`] = letters.charAt(index);
    randomLetters.push(letter);
  }

  return randomLetters;
};

const initialiseEmptyWords = (socketId) => {
  let words = [];

  for (let i = 1; i <= 6; i++) {
    let word = {};
    word[`player-${socketId}-word-${i}`] = "#";
    words.push(word);
  }

  return words;
};

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`User info is ${data}`);
    io.in(data.room).emit("room_joined", players);
  });

  socket.on("create_player", (data) => {
    const player = {
      username: data.username,
      socketId: socket.id,
      room: data.room,
      letters: initialiseLetters(socket.id),
      words: initialiseEmptyWords(socket.id),
    };

    players.push(player);

    let playersInRoom = players.filter((p) => p.room === data.room);

    io.in(data.room).emit("player_created", playersInRoom);
  });

  socket.on("updateLettersAndWords", (data) => {
    players = data.newPlayersData;
    let playersInRoom = players.filter((p) => p.room === data.room);
    io.in(data.room).emit("lettersAndWordsUpdated", playersInRoom);
  });

  socket.on("send_test_message", (data) => {
    io.in(data.room).emit("receive_test_message", data.message);
  });

  socket.on("disconnect", () => {
    const index = players.findIndex((player) => player.socketId === socket.id);
    const playerLeaving = players[index];
    if (index !== -1) {
      players.splice(index, 1)[0];
      // io.to(playerLeaving.room).emit("updated_players", players);
      let playersInRoom = players.filter((p) => p.room === playerLeaving.room);
      io.in(playerLeaving.room).emit("player_created", playersInRoom);
    }
  });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
