import { makeRequest, navigateTo, socket } from "../app.js";

export default function renderFinalResultsScreen(data) {
  const app = document.getElementById("app");
  const { winner, players, winnerNickname } = data;
  
  const sortedPlayers = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));
  
  app.innerHTML = `
    <div id="final-results">
      <h1>JUEGO TERMINADO</h1>
      <div class="winner-announcement">
        <h2>${winnerNickname} es el GANADOR</h2>
        <p>Felicidades por alcanzar ${winner.score} puntos</p>
      </div>
      
      <div class="final-ranking">
        <h3>Clasificacion Final</h3>
        <div class="players-list">
          ${sortedPlayers.map((player, index) => `
            <div class="player-card ${player.nickname === winnerNickname ? 'winner' : ''}">
              <div class="position">${index + 1}.</div>
              <div class="player-info">
                <div class="player-name">${player.nickname}</div>
                <div class="player-role">${player.role || 'Espectador'}</div>
              </div>
              <div class="player-score">${player.score || 0} pts</div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="actions">
        <button id="back-to-home-btn" class="btn btn-primary">Volver al Inicio</button>
      </div>
    </div>
  `;

  const backToHomeBtn = document.getElementById("back-to-home-btn");

  backToHomeBtn.addEventListener("click", () => {
    navigateTo("/", {});
  });

  socket.on("startGame", (role) => {
    navigateTo("/game", { nickname: data.nickname, role });
  });
}
