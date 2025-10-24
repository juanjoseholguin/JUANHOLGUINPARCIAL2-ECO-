import { navigateTo, socket } from "../app.js";

let players = [];
let winner = null;
let isAlphabetical = false;

export default function renderScreen2(data) {
  if (data) {
    players = data.players || [];
    winner = data.winner || null;
  }

  const app = document.getElementById("app");
  app.innerHTML = `
      <div id="final-results">
        <div class="header">
          <h1>🏆 Final Results</h1>
          <div class="controls">
            <button id="back-to-live-btn" class="btn btn-secondary">Back to Live</button>
            <button id="sort-alphabetical-btn" class="btn btn-primary">Sort Alphabetically</button>
            <button id="sort-by-score-btn" class="btn btn-primary">Sort by Score</button>
          </div>
        </div>
        
        <div class="winner-section">
          <h2>🎉 Winner: ${winner || 'No winner yet'} 🎉</h2>
        </div>
        
        <div class="final-ranking">
          <h3>Final Ranking</h3>
          <div id="final-players-list" class="players-list">
          </div>
        </div>
      </div>
      `;

  const backToLiveBtn = document.getElementById("back-to-live-btn");
  const sortAlphabeticalBtn = document.getElementById("sort-alphabetical-btn");
  const sortByScoreBtn = document.getElementById("sort-by-score-btn");

  backToLiveBtn.addEventListener("click", () => {
    navigateTo("/", {});
  });

  sortAlphabeticalBtn.addEventListener("click", () => {
    isAlphabetical = true;
    updateFinalRanking();
  });

  sortByScoreBtn.addEventListener("click", () => {
    isAlphabetical = false;
    updateFinalRanking();
  });

  updateFinalRanking();
}

function updateFinalRanking() {
  const playersList = document.getElementById("final-players-list");

  if (players.length === 0) {
    playersList.innerHTML = `
      <div class="no-players">
        <p>No players to display...</p>
      </div>
    `;
    return;
  }

  let sortedPlayers;
  if (isAlphabetical) {
    sortedPlayers = [...players].sort((a, b) => a.nickname.localeCompare(b.nickname));
  } else {
    sortedPlayers = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));
  }

  playersList.innerHTML = sortedPlayers.map((player, index) => `
    <div class="player-card final ${player.role || ''}">
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
}
