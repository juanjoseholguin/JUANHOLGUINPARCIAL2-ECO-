const express = require("express");
const playersDb = require("../db/players.db");

const router = express.Router();

router.get("/players", (req, res) => {
  try {
    const players = playersDb.getAllPlayers();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/reset-scores", (req, res) => {
  try {
    playersDb.resetScores();
    const players = playersDb.getAllPlayers();
    res.json({ success: true, players });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;