const chai=require("chai");
const chaiHttp=require("chai-http");
chai.use(chaiHttp);
chai.should();

const app=require("../../app");
const DB=require("../hellpers/db");

describe(`player`, () => {
	beforeEach((done) => {
		DB.flush("players")
		  .then(() => done())
		  .catch(done);
	});

	it(`should try to get player 1, expect 404`, (done) => {
		const requester=chai.request(app)
		                    .keepOpen();
		requester.get("/players/1")
		         .then((response) => {
			         response.status.should.be.equals(404);
			         done();
		         })
		         .catch(done)
		         .finally(() => requester.close());
	});

	it(`should not create player, expect 403, no body`, (done) => {
		const requester=chai.request(app)
		                    .keepOpen();
		requester.post("/players")
		         .then((response) => {
			         response.status.should.be.equals(403);
			         done();
		         })
		         .catch(done)
		         .finally(() => requester.close());
	});

	it(`should not create player, expect 403, null login`, (done) => {
		const requester=chai.request(app)
		                    .keepOpen();
		requester.post("/players")
		         .send({ login: null })
		         .then((response) => {
			         response.status.should.be.equals(403);
			         done();
		         })
		         .catch(done)
		         .finally(() => requester.close());
	});

	it(`should not create player, expect 403, null password`, (done) => {
		const requester=chai.request(app)
		                    .keepOpen();
		requester.post("/players")
		         .send({ password: null })
		         .then((response) => {
			         response.status.should.be.equals(403);
			         done();
		         })
		         .catch(done)
		         .finally(() => requester.close());
	});

	it(`should create player, expect 201`, (done) => {
		const requester=chai.request(app)
		                    .keepOpen();
		requester.post("/players")
		         .send({
			               login: "tihlok",
			               password: "password"
		               })
		         .then((response) => {
			         response.status.should.be.equals(201);
			         response.body.login.should.be.equals("tihlok");
			         done();
		         })
		         .catch(done)
		         .finally(() => requester.close());
	});

	it(`should login, expect 200`, (done) => {
		const requester=chai.request(app)
		                    .keepOpen();
		requester.post("/players")
		         .send({
			               login: "tihlok",
			               password: "password"
		               })
		         .then((response) => {
			         response.status.should.be.equals(201);
			         response.body.login.should.be.equals("tihlok");
			         return requester.post("/players/login")
			                         .send({
				                               login: "tihlok",
				                               password: "password"
			                               });
		         })
		         .then((response) => {
			         response.status.should.be.equals(200);
			         response.body.login.should.be.equals("tihlok");
			         response.body.token.should.not.be.null;
			         done();
		         })
		         .catch(done)
		         .finally(() => requester.close());
	});

	it(`should not create player with same login, expect 409`, (done) => {
		const requester=chai.request(app)
		                    .keepOpen();
		requester.post("/players")
		         .send({
			               login: "tihlok",
			               password: "password"
		               })
		         .then((response) => {
			         response.status.should.be.equals(201);
			         response.body.login.should.be.equals("tihlok");
		         })
		         .then(() => requester.post("/players")
		                              .send({
			                                    login: "tihlok",
			                                    password: "password"
		                                    }))
		         .then((response) => {
			         response.status.should.be.equals(409);
			         done();
		         })
		         .catch(done)
		         .finally(() => requester.close());
	});
});

/** _TODO: /PLAYERS
 *  _todo: /login - register session uuid for player
 *  _todo: /logout - remove session
 **/

/** _TODO: DATA (spreadsheet)
 *  _todo: /data - download spreadsheet data (itens, monsters, maps, ...)
 *  _todo:         split data by sheets page, [1.0] [1.1] [1.2] and update player with following data
 *  _todo:         when logging in, server checks if player needs an update from server version
 *  _todo: /version - check server version, if it needs to update tables
 *  _todo:            by the last published sheet data
 */
