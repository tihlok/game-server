const players=require("./players/players.routes");
const personas=require("./personas/personas.routes");

function register(app) {
	app.use("/players", players);
	app.use("/personas", personas);
}

module.exports=register;
