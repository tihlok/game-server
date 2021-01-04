async function create(req, res, next) {
	const exists=await Players.findBy({ login: req.body.login });
	if(exists) {
		debug(`player already exists`, req.body);
		return res.status(409)
		          .send({ error: `player ${req.body.login} already exists` });
	}

	const player=await Players.create(req.body);
	if(!player) {
		debug(`error creating player`, req.body);
		return res.status(403)
		          .send({ error: `error creating player: ${req.body}` });
	}

	return res.status(201)
	          .send({
		                login: player.login,
		                created_at: player.created_at,
		                modified_at: player.modified_at
	                });
}

async function login(req, res, next) {
	const player=await Players.findBy({ login: req.body.login });
	if(!player || !player.isPasswordValid(req.body.password)) {
		debug(`unauthorized`, req.body);
		return res.status(401)
		          .send({ error: `unauthorized` });
	}

	delete player.password;
	player.token="generate_token";
	return res.status(200)
	          .send(player);
}

const debug=require("debug")("game:player");
const Players=require("./players.repository");
const Routes=require("../hellpers/routes");

const router=new Routes()
	.post("/", create)
	.post("/login", login)
	.router;

module.exports=router;
