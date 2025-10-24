const playersDb = require("../db/players.db");

const getPlayers = async (req, res) => {
  try {
    const players = playersDb.getAllPlayers();
    res.status(200).json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const resetScores = async (req, res) => {
  try {
    playersDb.resetScores();
    const players = playersDb.getAllPlayers();
    res.status(200).json({ players });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const resetGame = async (req, res) => {
  try {
    playersDb.resetGame();
    res.status(200).json({ message: "Game reset successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getPlayers,
  resetScores,
  resetGame,
};
