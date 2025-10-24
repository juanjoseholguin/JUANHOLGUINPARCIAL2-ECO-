import { navigateTo, socket, makeRequest } from "../app.js";

export default function renderGameGround(data) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div id="game-ground">
      <h2 id="game-nickname-display">${data.nickname}</h2>
      <div id="score-display">
        <span>Puntuación: <strong id="current-score">0</strong> pts</span>
      </div>
      <p>Tu rol es:</p>
      <h2 id="role-display">${data.role}</h2>
      <h2 id="shout-display"></h2>
      <div id="pool-players"></div>
      <button id="shout-button">Gritar ${data.role}</button>
    </div>
  `;

  const nickname = data.nickname;
  const polos = [];
  const myRole = data.role;
  const shoutbtn = document.getElementById("shout-button");
  const shoutDisplay = document.getElementById("shout-display");
  const container = document.getElementById("pool-players");
  const currentScore = document.getElementById("current-score");

  if (myRole !== "marco") {
    shoutbtn.style.display = "none";
  }

  shoutDisplay.style.display = "none";

  const player = data.players?.find(p => p.nickname === nickname);
  if (player) {
    currentScore.textContent = player.score || 0;
  }

  shoutbtn.addEventListener("click", async () => {
    if (myRole === "marco") {
      await makeRequest("/api/game/marco", "POST", {
        socketId: socket.id,
      });
    }
    if (myRole === "polo" || myRole === "polo-especial") {
      await makeRequest("/api/game/polo", "POST", {
        socketId: socket.id,
      });
    }
    shoutbtn.style.display = "none";
  });

  container.addEventListener("click", async function (event) {
    if (event.target.tagName === "BUTTON") {
      const key = event.target.dataset.key;
              await makeRequest("/api/game/select-polo", "POST", {
        socketId: socket.id,
        poloId: key,
      });
    }
  });

  socket.on("notification", (data) => {
    console.log("Notification", data);
    if (myRole === "marco") {
      container.innerHTML =
        "<p>Haz click sobre el polo que quieres escoger:</p>";
      polos.push(data);
      polos.forEach((elemt) => {
        const button = document.createElement("button");
        button.innerHTML = `Un jugador gritó: ${elemt.message}`;
        button.setAttribute("data-key", elemt.userId);
        container.appendChild(button);
      });
    } else {
      shoutbtn.style.display = "block";
      shoutDisplay.innerHTML = `Marco ha gritado: ${data.message}`;
      shoutDisplay.style.display = "block";
    }
  });

  socket.on("notifyGameOver", (data) => {
    navigateTo("/gameOver", { message: data.message, nickname });
  });

  socket.on("gameWon", (data) => {
    navigateTo("/finalResults", { 
      winner: data.winner, 
      winnerNickname: data.winnerNickname, 
      players: data.players,
      nickname 
    });
  });

  socket.on("scoreUpdate", (data) => {
    const player = data.players?.find(p => p.nickname === nickname);
    if (player) {
      currentScore.textContent = player.score || 0;
    }
  });
}