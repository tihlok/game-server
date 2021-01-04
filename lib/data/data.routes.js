async function dataPush(req, res, next) {
	const data=await Data.push(req.body);
	if(!data) {
		debug(`error pushing data`, data);
		return res.status(403)
		          .send({ error: `error pushing data` });
	}
	return res.status(201)
	          .send(data);
}

async function fetch(req, res, next) {
	const data=await Data.fetch();
	if(!data) {
		debug(`error fetching data`);
		return res.status(403)
		          .send({ error: `error fetching data` });
	}
	return res.status(200)
	          .send(data);
}

const debug=require("debug")("game:data");
const Data=require("./data.repository");
const Routes=require("../hellpers/routes");

const router=new Routes()
	.post("/", dataPush)
	.get("/", fetch)
	.router;

module.exports=router;
