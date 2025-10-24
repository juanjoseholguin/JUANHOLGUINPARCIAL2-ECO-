const express = require("express");
const { joinGame, startGame, notifyMarco, notifyPolo, selectPolo, endRound, resetGame } = require("../controllers/screen1Events.controller");

const router = express.Router();

router.post("/join", joinGame);
router.post("/start", startGame);
router.post("/marco", notifyMarco);
router.post("/polo", notifyPolo);
router.post("/select-polo", selectPolo);
router.post("/end-round", endRound);
router.post("/reset", resetGame);

module.exports = router;