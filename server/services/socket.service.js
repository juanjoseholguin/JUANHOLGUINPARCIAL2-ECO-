const { Server } = require("socket.io");

let io;

const initSocketInstance = (httpServer) => {
  io = new Server(httpServer, {
    path: "/socket.io/",
    cors: {
      origin: "*",
    },
  });
};

const emitToSpecificClient = (socketId, eventName, data) => {
  if (!io) {
    throw new Error("Socket.io instance is not initialized");
  }
  io.to(socketId).emit(eventName, data);
};

const emitEvent = (eventName, data) => {
  if (!io) {
    throw new Error("Socket.io instance is not initialized");
  }
  io.emit(eventName, data);
};

module.exports = {
  emitEvent,
  initSocketInstance,
  emitToSpecificClient,
};