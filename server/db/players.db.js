const { assignRoles } = require("../utils/helpers");

const players = [];

const getAllPlayers = () => {
  return players;
};

const addPlayer = (nickname, socketId) => {
  const newPlayer = { id: socketId, nickname, score: 0 };
  players.push(newPlayer);
  return newPlayer;
};

const findPlayerById = (socketId) => {
  return players.find((player) => player.id === socketId) || null;
};

const assignPlayerRoles = () => {
  const playersWithRoles = assignRoles(players);
  players.splice(0, players.length, ...playersWithRoles);
  return players;
};

const findPlayersByRole = (role) => {
  if (Array.isArray(role)) {
    return players.filter((player) => role.includes(player.role));
  }
  return players.filter((player) => player.role === role);
};

const getGameData = () => {
  return { players };
};

const updatePlayerScore = (socketId, points) => {
  const player = findPlayerById(socketId);
  if (player) {
    player.score += points;
    return player;
  }
  return null;
};

const getPlayersSortedByScore = () => {
  return [...players].sort((a, b) => b.score - a.score);
};

const getPlayersSortedAlphabetically = () => {
  return [...players].sort((a, b) => a.nickname.localeCompare(b.nickname));
};

const checkForWinner = (winningScore = 100) => {
  return players.find(player => player.score >= winningScore) || null;
};

const resetScores = () => {
  players.forEach(player => {
    player.score = 0;
  });
};

const removePlayer = (socketId) => {
  const index = players.findIndex((player) => player.id === socketId);
  if (index !== -1) {
    players.splice(index, 1);
  }
};

const resetGame = () => {
  players.splice(0, players.length);
};

module.exports = {
  getAllPlayers,
  addPlayer,
  findPlayerById,
  removePlayer,
  assignPlayerRoles,
  findPlayersByRole,
  getGameData,
  updatePlayerScore,
  getPlayersSortedByScore,
  getPlayersSortedAlphabetically,
  checkForWinner,
  resetScores,
  resetGame,
};