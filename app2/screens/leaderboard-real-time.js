import { navigateTo, socket } from "../app.js";

let players = [];
let winner = null;

export default function renderScreen1() {
  const app = document.getElementById("app");
  app.innerHTML = `
      <div id="live-scoreboard">
        <div class="header">
          <h1>Live Scoreboard</h1>
          <div class="controls">
            <button id="reset-game-btn" class="btn btn-danger">Reset Game</button>
            <button id="final-results-btn" class="btn btn-primary">Final Results</button>
          </div>
        </div>
        
        <div class="scoreboard-container">
          <div id="players-list" class="players-list">
            <div class="no-players">
              <p>No players connected yet...</p>
            </div>
          </div>
        </div>
        
        <div id="winner-announcement" class="winner-announcement hidden">
          <h2>Winner!</h2>
          <p id="winner-name"></p>
          <button id="view-final-results" class="btn btn-success">View Final Results</button>
        </div>
      </div>
      `;

  const resetGameBtn = document.getElementById("reset-game-btn");
  const finalResultsBtn = document.getElementById("final-results-btn");
  const viewFinalResultsBtn = document.getElementById("view-final-results");

  resetGameBtn.addEventListener("click", async () => {
    try {
      const response = await fetch("http://localhost:5050/api/users/reset-scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        console.log("Puntuaciones reiniciadas exitosamente");
      }
    } catch (error) {
      console.error("Error al reiniciar las puntuaciones:", error);
    }
  });

  finalResultsBtn.addEventListener("click", () => {
    navigateTo("/screen2", { players, winner });
  });

  viewFinalResultsBtn.addEventListener("click", () => {
    navigateTo("/screen2", { players, winner });
  });

  socket.on("scoreUpdate", (data) => {
    players = data.players || [];
    winner = data.winner;
    updateScoreboard();
  });

  socket.on("userJoined", (data) => {
    players = data.players || [];
    updateScoreboard();
  });

  socket.on("gameReset", (data) => {
    players = data.players || [];
    winner = null;
    updateScoreboard();
  });

  socket.on("gameResult", (data) => {
    players = data.players || [];
    winner = data.winner;
    updateScoreboard();
  });

  socket.on("notifyGameOver", (data) => {
    winner = data.winner;
    updateScoreboard();
  });

  loadInitialData();
}

async function loadInitialData() {
  try {
    const response = await fetch("http://localhost:5050/api/users/players");
    const data = await response.json();
    players = data || [];
    updateScoreboard();
  } catch (error) {
    console.error("Error al cargar datos iniciales:", error);
  }
}

function updateScoreboard() {
  const playersList = document.getElementById("players-list");
  const winnerAnnouncement = document.getElementById("winner-announcement");
  const winnerName = document.getElementById("winner-name");

  if (players.length === 0) {
    playersList.innerHTML = `
      <div class="no-players">
        <p>No players connected yet...</p>
      </div>
    `;
    winnerAnnouncement.classList.add("hidden");
    return;
  }

  const sortedPlayers = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));

  playersList.innerHTML = sortedPlayers.map((player, index) => `
    <div class="player-card ${player.role || ''}">
      <div class="player-rank">${index + 1}</div>
      <div class="player-info">
        <div class="player-name">${player.nickname}</div>
        <div class="player-role">${player.role || 'Spectator'}</div>
      </div>
      <div class="player-score ${(player.score || 0) >= 0 ? 'positive' : 'negative'}">
        ${player.score || 0} pts
      </div>
    </div>
  `).join('');

  if (winner) {
    const winnerPlayer = players.find(p => p.nickname === winner);
    if (winnerPlayer) {
      winnerName.textContent = `${winnerPlayer.nickname} gana con ${winnerPlayer.score} puntos!`;
      winnerAnnouncement.classList.remove("hidden");
    }
  } else {
    winnerAnnouncement.classList.add("hidden");
  }
}
