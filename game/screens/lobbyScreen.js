import { navigateTo, socket, makeRequest } from "../app.js";

export default function renderLobbyScreen(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div id="lobby-screen">
      <h2 id="nickname-display">${data.nickname}</h2>
      <div id="player-score" class="score-display">
        <span>Score: <strong id="current-score">0</strong> pts</span>
      </div>
      <p>
        Esperando a que otros se unan:
        <b id="users-count"><b>0</b></b> usuarios en la sala
      </p>
      <button id="start-button">Start game</button>
    </div>
  `;

  const startButton = document.getElementById("start-button");
  const usersCount = document.getElementById("users-count");
  const currentScore = document.getElementById("current-score");

  usersCount.innerHTML = data?.players.length || 0;
  
  const player = data?.players?.find(p => p.nickname === data.nickname);
  if (player) {
    currentScore.textContent = player.score || 0;
  }

  socket.on("userJoined", (data) => {
    console.log(data);
    usersCount.innerHTML = data?.players.length || 0;
    
    const player = data?.players?.find(p => p.nickname === data.nickname);
    if (player) {
      currentScore.textContent = player.score || 0;
    }
  });

  socket.on("scoreUpdate", (data) => {
    const player = data?.players?.find(p => p.nickname === data.nickname);
    if (player) {
      currentScore.textContent = player.score || 0;
    }
  });

  startButton.addEventListener("click", async () => {
    await makeRequest("/api/game/start", "POST");
  });

  socket.on("startGame", (role) => {
    navigateTo("/game", { nickname: data.nickname, role, players: data.players });
  });

  socket.on("gameWon", (data) => {
    navigateTo("/finalResults", { 
      winner: data.winner, 
      winnerNickname: data.winnerNickname, 
      players: data.players,
      nickname: data.nickname 
    });
  });
}