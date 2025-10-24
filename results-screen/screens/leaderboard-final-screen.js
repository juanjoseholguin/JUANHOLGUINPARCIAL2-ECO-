import { navigateTo } from "../app.js";

let players = [];
let winner = null;
let isAlphabetical = false;

export default function renderScreen2(data) {
  players = data?.players || [];
  winner = data?.winner || null;

  const app = document.getElementById("app");
  app.innerHTML = `
        <div id="final-results">
                  <div class="header">
                    <h1>Final Results</h1>
                    <div class="controls">
                      <button id="sort-alphabetical-btn" class="btn btn-secondary">Sort Alphabetically</button>
                      <button id="sort-by-score-btn" class="btn btn-secondary">Sort by Score</button>
                      <button id="back-to-live-btn" class="btn btn-primary">Back to Live</button>
                      <button id="reset-game-btn" class="btn btn-danger">Reset Game</button>
                    </div>
                  </div>
          
          <div class="winner-section">
            <div class="winner-announcement">
                      <h2>${winner ? `Winner: ${winner.nickname}` : 'Game in Progress'}</h2>
            </div>
          </div>
          
          <div class="results-container">
            <div id="players-ranking" class="players-ranking">
              <div class="no-players">
                <p>No players to display...</p>
              </div>
            </div>
          </div>
        </div>
        `;

  const sortAlphabeticalBtn = document.getElementById("sort-alphabetical-btn");
  const sortByScoreBtn = document.getElementById("sort-by-score-btn");
  const backToLiveBtn = document.getElementById("back-to-live-btn");
  const resetGameBtn = document.getElementById("reset-game-btn");

  sortAlphabeticalBtn.addEventListener("click", () => {
    isAlphabetical = true;
    updateRanking();
  });

  sortByScoreBtn.addEventListener("click", () => {
    isAlphabetical = false;
    updateRanking();
  });

  backToLiveBtn.addEventListener("click", () => {
    navigateTo("/", { players, winner });
  });

  resetGameBtn.addEventListener("click", async () => {
    try {
              const response = await fetch("http://localhost:5050/api/game/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        console.log("Game reset successfully");
        navigateTo("/", { players: [], winner: null });
      }
    } catch (error) {
      console.error("Error resetting game:", error);
    }
  });


  updateRanking();
}

function updateRanking() {
  const playersRanking = document.getElementById("players-ranking");
  const sortAlphabeticalBtn = document.getElementById("sort-alphabetical-btn");
  const sortByScoreBtn = document.getElementById("sort-by-score-btn");

  if (players.length === 0) {
    playersRanking.innerHTML = `
      <div class="no-players">
        <p>No players to display...</p>
      </div>
    `;
    return;
  }


  let sortedPlayers;
  if (isAlphabetical) {
    sortedPlayers = [...players].sort((a, b) => a.nickname.localeCompare(b.nickname));
    sortAlphabeticalBtn.classList.add("active");
    sortByScoreBtn.classList.remove("active");
  } else {
    sortedPlayers = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));
    sortByScoreBtn.classList.add("active");
    sortAlphabeticalBtn.classList.remove("active");
  }

  playersRanking.innerHTML = sortedPlayers.map((player, index) => {
    const rank = isAlphabetical ? '' : index + 1;
    const scoreDisplay = isAlphabetical ? '' : `${player.score || 0} pts`;
    
    return `
      <div class="ranking-card ${player.role || ''} ${winner === player.nickname ? 'winner' : ''}">
        <div class="ranking-position">
          ${isAlphabetical ? '' : `<span class="rank-number">${rank}</span>`}
        </div>
        <div class="player-details">
          <div class="player-name">${player.nickname}</div>
          <div class="player-role">${player.role || 'Spectator'}</div>
          ${isAlphabetical ? `<div class="player-score ${(player.score || 0) >= 0 ? 'positive' : 'negative'}">${player.score || 0} pts</div>` : ''}
        </div>
        <div class="player-score-display">
          ${scoreDisplay}
        </div>
        ${winner === player.nickname ? '<div class="winner-badge">👑</div>' : ''}
      </div>
    `;
  }).join('');
}