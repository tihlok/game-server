const players = require("./players/players.routes");

function register (app) {
  app.use("/players", players);
}

module.exports = register;
