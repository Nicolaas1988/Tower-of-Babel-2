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

// a1 b3 c3 d2 e1 f4 g2 h4 i1 j8 k5 l1 m3 n1 o1 p3 q10 r1 s1 t1 u1 v4 w4 x8 y4 z10

const httpServer = http.Server(app);

const io = new Server(httpServer, { cors: { origin: "*" } });
let players = [];
const initialiseLetters = (socketId) => {
  const letters =
    "aaaaaaaabbbcccddddeeeeeeeeeeeefffggghhhhhhiiiiiiiijjjkkkkkkkkllllmmmnnnnnnnnoooooooopppqqrstttttttttuuuvvvwwwxxyyyzz";

  let randomLetters = [];

  for (let i = 0; i <= 25; i++) {
    let index = Math.floor(Math.random() * 116);

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
    word[`player-${socketId}-word-${i}`] = "";
    words.push(word);
  }

  return words;
};

const initialiseEmptyWordValues = (socketId) => {
  let wordValues = [];

  for (let i = 1; i <= 6; i++) {
    let wordValue = {};
    wordValue[`player-${socketId}-word-${i}`] = 0;
    wordValues.push(wordValue);
  }

  return wordValues;
};

const calculateWordValue = (playerWords, wordValue, index, player) => {
  let key = Object.keys(wordValue).toString();

  // a1 b3 c3 d2 e1 f4 g2 h4 i1 j8 k5 l1 m3 n1 o1 p3 q10 r1 s1 t1 u1 v4 w4 x8 y4 z10

  let word = playerWords[index][key].split("");
  console.log(word);

  if (word.length > 0) {
    let value = 0;
    word.forEach((letter) => {
      switch (letter) {
        case "a":
          value = 1;
          break;
        case "b":
          value = 3;
          break;
        case "c":
          value = 3;
          break;
        case "d":
          value = 2;
          break;
        case "e":
          value = 1;
          break;
        case "f":
          value = 4;
          break;
        case "g":
          value = 2;
          break;
        case "h":
          value = 4;
          break;
        case "i":
          value = 1;
          break;
        case "j":
          value = 8;
          break;
        case "k":
          value = 5;
          break;
        case "l":
          value = 1;
          break;
        case "m":
          value = 3;
          break;
        case "n":
          value = 1;
          break;
        case "o":
          value = 1;
          break;
        case "p":
          value = 3;
          break;
        case "q":
          value = 10;
          break;
        case "r":
          value = 1;
          break;
        case "s":
          value = 1;
          break;
        case "t":
          value = 1;
          break;
        case "u":
          value = 1;
          break;
        case "v":
          value = 4;
          break;
        case "w":
          value = 4;
          break;
        case "x":
          value = 8;
          break;
        case "y":
          value = 4;
          break;
        case "z":
          value = 10;
          break;
        default:
          value = 0;
      }

      let oldValue = player.wordValues[index][key];
      let newValue = oldValue + value;
      player.wordValues[index][key] = newValue;

      console.log(`oldValue is ${oldValue}`);
      console.log(`value to be added is ${value}`);
      console.log(`oldValue + value is ${oldValue + value}`);
      console.log(`******************************************`);
    });
  }
};

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data.room);
    io.in(data.room).emit("room_joined", players);
  });

  socket.on("create_player", (data) => {
    const player = {
      username: data.username,
      socketId: socket.id,
      room: data.room,
      letters: initialiseLetters(socket.id),
      words: initialiseEmptyWords(socket.id),
      wordValues: initialiseEmptyWordValues(socket.id),
    };

    players.push(player);

    let playersInRoom = players.filter((p) => p.room === data.room);

    io.in(data.room).emit("player_created", playersInRoom);
  });

  socket.on("updateLettersAndWords", (data) => {
    players = data.newPlayersData;
    let playersInRoom = players.filter((p) => p.room === data.room);

    //Calculate word values
    playersInRoom.forEach((p) => {
      p.wordValues.forEach((w, idx) => {
        calculateWordValue(p.words, w, idx, p);
      });
    });

    io.in(data.room).emit("lettersAndWordsUpdated", playersInRoom);
    // socket.to(data.room).emit("lettersAndWordsUpdated", playersInRoom);
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
