async function create (req, res, next) {
  const exists = await Players.findBy("name", req.body.name);
  if (exists) return res.status(409).send({ error: `player ${req.body.name} already exists` });

  const player = await Players.create(req.body);
  if (!player) return res.status(403).send({ error: `error creating player: ${req.body}` });
  return res.status(201).send(player);
}

async function getByID (req, res, next) {
  const player = await Players.findByID(req.params.id);
  if (!player) return res.status(404).send({ error: `player ${req.params.id} not found` });
  return res.status(200).send(player);
}

const Players = require("./players.repository");

const Routes = require("../hellpers/routes");
const playerRoutes = new Routes();
const router = playerRoutes
  .post("/", create)
  .get("/:id", getByID)
  .router;

module.exports = router;
