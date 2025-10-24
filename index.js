const express = require("express");
const path = require("path");
const { createServer } = require("http");

const playersRouter = require("./server/routes/users.router");
const gameRouter = require("./server/routes/screen1Events.router");
const { initSocketInstance } = require("./server/services/socket.service");

const PORT = 5050;

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use("/game", express.static(path.join(__dirname, "game")));
app.use("/results", express.static(path.join(__dirname, "results-screen")));

app.use("/api/users", playersRouter);
app.use("/api/game", gameRouter);

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Marco Polo Game Server</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 0;
          padding: 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .container {
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          padding: 3rem;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }
        .links {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .link {
          display: inline-block;
          padding: 1rem 2rem;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .link:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }
      </style>
    </head>
    <body>
      <div class="container">
                <h1>Marco Polo Game Server</h1>
                <p>Welcome to the Marco Polo Game Server! Choose your client:</p>
                <div class="links">
                  <a href="/game" class="link">Game Client</a>
                  <a href="/results" class="link">Results Screen</a>
                </div>
      </div>
    </body>
    </html>
  `);
});

initSocketInstance(httpServer);

httpServer.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);