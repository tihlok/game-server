const chai=require("chai");
const chaiHttp=require("chai-http");
chai.use(chaiHttp);
chai.should();

const app=require("../../app");
const DB=require("../hellpers/db");

const persona={
	player_id: null,
	name: "Lucy",
	level: 5,
	origin: "Cósmico",
	max_pv: 45,
	current_pv: 45,
	tactical_stress: 0,
	combat_stress: 0,
	skills: [],
	combos: [],
	advantages: [],
	inventory: [],
	lore: "foi expulso do paraiso",
	diary: "",
	imageURL: "https://i.pinimg.com/originals/8f/70/7f/8f707fd89d0b0d0148056fca835aa80e.jpg"
};

describe(`personas`, () => {
	beforeEach((done) => {
		DB.flush("personas")
		  .then(() => done())
		  .catch(done);
	});

	it(`should try to get personas for player 1, expect 200, empty`, (done) => {
		const requester=chai.request(app)
		                    .keepOpen();
		requester.get("/personas/1")
		         .then((response) => {
			         response.status.should.be.equals(200);
			         response.body.should.be.an("array");
			         response.body.length.should.be.equals(0);
		         })
		         .then(() => done())
		         .catch(done)
		         .finally(() => requester.close());
	});

	it(`should create a persona, expect 201`, (done) => {
		let _login;
		const requester=chai.request(app)
		                    .keepOpen();
		requester.post("/players/login")
		         .send({
			               login: "tihlok",
			               password: "password"
		               })
		         .then((login) => {
		         	_login=login;
		         	persona.player_id=_login.body.id
			         return requester.post("/personas/save")
			                  .send(persona)
		         })
		         .then((response) => {
			         response.status.should.be.equals(201);
			         response.body.id.should.not.be.null;
			         delete response.body.id;
			         response.body.should.be.deep.equals(persona);
		         })
		         .then(() => done())
		         .catch(done)
		         .finally(() => requester.close());
	});

	it(`should update a persona, expect 201`, (done) => {
		let _login;
		const requester=chai.request(app)
		                    .keepOpen();
		requester.post("/players/login")
		         .send({
			               login: "tihlok",
			               password: "password"
		               })
		         .then((login) => {
			         _login=login;
			         persona.player_id=_login.body.id
			         return requester.post("/personas/save")
			                         .send(persona)
		         })
		         .then((response) => {
			         response.status.should.be.equals(201);
			         response.body.id.should.not.be.null;
			         delete response.body.id;
			         response.body.should.be.deep.equals(persona);

			         persona.level=6;
			         persona.max_pv=60;
			         return requester.post("/personas/save")
			                         .send(persona);
		         })
		         .then((response) => {
			         response.status.should.be.equals(201);
			         response.body.level.should.be.equals(6);
			         response.body.max_pv.should.be.equals(60);
		         })
		         .then(() => done())
		         .catch(done)
		         .finally(() => requester.close());
	});
});
