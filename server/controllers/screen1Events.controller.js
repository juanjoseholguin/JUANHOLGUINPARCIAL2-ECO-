const playersDb = require("../db/players.db");
const {
  emitEvent,
  emitToSpecificClient,
} = require("../services/socket.service");

const joinGame = async (req, res) => {
  try {
    const { nickname, socketId } = req.body;
    playersDb.addPlayer(nickname, socketId);

    const gameData = playersDb.getGameData();
    emitEvent("userJoined", gameData);
    emitEvent("scoreUpdate", { players: gameData.players, winner: null });

    res.status(200).json({ success: true, players: gameData.players });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const startGame = async (req, res) => {
  try {
    const playersWithRoles = playersDb.assignPlayerRoles();

    playersWithRoles.forEach((player) => {
      emitToSpecificClient(player.id, "startGame", player.role);
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const notifyMarco = async (req, res) => {
  try {
    const { socketId } = req.body;

    const rolesToNotify = playersDb.findPlayersByRole([
      "polo",
      "polo-especial",
    ]);

    rolesToNotify.forEach((player) => {
      emitToSpecificClient(player.id, "notification", {
        message: "Marco!!!",
        userId: socketId,
      });
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const notifyPolo = async (req, res) => {
  try {
    const { socketId } = req.body;

    const rolesToNotify = playersDb.findPlayersByRole("marco");

    rolesToNotify.forEach((player) => {
      emitToSpecificClient(player.id, "notification", {
        message: "Polo!!",
        userId: socketId,
      });
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const selectPolo = async (req, res) => {
  try {
    const { socketId, poloId } = req.body;

    const myUser = playersDb.findPlayerById(socketId);
    const poloSelected = playersDb.findPlayerById(poloId);
    const allPlayers = playersDb.getAllPlayers();

    if (poloSelected.role === "polo-especial") {
      playersDb.updatePlayerScore(socketId, 50);
      playersDb.updatePlayerScore(poloId, -10);
      
      allPlayers.forEach((player) => {
        emitToSpecificClient(player.id, "notifyGameOver", {
          message: `El marco ${myUser.nickname} ha ganado, ${poloSelected.nickname} ha sido capturado`,
          winner: myUser.nickname,
          caughtPlayer: poloSelected.nickname
        });
      });
    } else {
      playersDb.updatePlayerScore(socketId, -10);
      
      allPlayers.forEach((player) => {
        emitToSpecificClient(player.id, "notifyGameOver", {
          message: `El marco ${myUser.nickname} ha perdido`,
          winner: null,
          caughtPlayer: null
        });
      });
    }

    const winner = playersDb.checkForWinner();
    const updatedPlayers = playersDb.getAllPlayers();
    
    if (winner) {
      allPlayers.forEach((player) => {
        emitToSpecificClient(player.id, "gameWon", {
          winner: winner,
          winnerNickname: winner.nickname,
          players: updatedPlayers
        });
      });
    }
    
    emitEvent("scoreUpdate", { players: updatedPlayers, winner });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const endRound = async (req, res) => {
  try {
    const { socketId } = req.body;
    const myUser = playersDb.findPlayerById(socketId);
    
    if (myUser.role === "polo-especial") {
      playersDb.updatePlayerScore(socketId, 10);
    }
    
    const updatedPlayers = playersDb.getAllPlayers();
    const winner = playersDb.checkForWinner();
    
    if (winner) {
      const allPlayers = playersDb.getAllPlayers();
      allPlayers.forEach((player) => {
        emitToSpecificClient(player.id, "gameWon", {
          winner: winner,
          winnerNickname: winner.nickname,
          players: updatedPlayers
        });
      });
    }
    
    emitEvent("scoreUpdate", { players: updatedPlayers, winner });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const resetGame = async (req, res) => {
  try {
    playersDb.resetGame();
    const updatedPlayers = playersDb.getAllPlayers();
    
    emitEvent("gameReset", { players: updatedPlayers });

    res.status(200).json({ success: true, players: updatedPlayers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  joinGame,
  startGame,
  notifyMarco,
  notifyPolo,
  selectPolo,
  endRound,
  resetGame,
};