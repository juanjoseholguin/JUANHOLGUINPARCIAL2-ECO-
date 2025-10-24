const express = require('express');
const playersDb = require('../db/players.db');
const router = express.Router();

router.get('/players', (req, res) => {
  res.status(200).json(playersDb.getAllPlayers());
});

module.exports = router;