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
const users = [];
const players = [];

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
      letters: [],
      words: [],
    };

    players.push(player);

    io.in(data.room).emit("player_created", players);
  });

  socket.on("disconnect", () => {
    const index = players.findIndex((player) => player.socketId === socket.id);
    const playerLeaving = players[index];
    if (index !== -1) {
      players.splice(index, 1)[0];
      io.to(playerLeaving.room).emit("updated_players", players);
    }
  });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
