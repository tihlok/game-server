async function createOrUpdate(req, res, next) {
	debug(`creating/updating persona`, req.body);
	const persona=await Personas.createOrUpdate(req.body);
	if(!persona) {
		debug(`error creating persona`, req.body);
		return res.status(403)
		          .send({ error: `error creating persona: ${req.body}` });
	}

	return res.status(201)
	          .send(persona);
}

async function fetch(req, res, next) {
	const personas=await Personas.findByPlayerID(req.params.player_id);
	return res.status(200)
	          .send(personas);
}

const debug=require("debug")("game:personas");
const Personas=require("./personas.repository");
const Routes=require("../hellpers/routes");

const router=new Routes()
	.post("/save", createOrUpdate)
	.get("/:player_id", fetch)
	.router;

module.exports=router;
