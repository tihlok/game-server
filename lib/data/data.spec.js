const chai=require("chai");
const chaiHttp=require("chai-http");
chai.use(chaiHttp);
chai.should();

const app=require("../../app");
const DB=require("../hellpers/db");

describe(`data`, () => {
	beforeEach((done) => {
		DB.flush("data")
		  .then(() => done())
		  .catch(done);
	});

	it(`get data, no data, expect 403`, (done) => {
		const requester=chai.request(app)
		                    .keepOpen();
		requester.get("/data")
		         .then((response) => {
			         response.status.should.be.equals(403);
			         done();
		         })
		         .catch(done)
		         .finally(() => requester.close());
	});

	it(`post data, no data, expect 403`, (done) => {
		const requester=chai.request(app)
		                    .keepOpen();
		requester.post("/data")
		         .send({
			               version: "1.0.0",
			               author: "@tihlok"
		               })
		         .then((response) => {
			         response.status.should.be.equals(201);
			         return requester.get("/data");
		         })
		         .then((response) => {
			         response.status.should.be.equals(200);
			         done();
		         })
		         .catch(done)
		         .finally(() => requester.close());
	});
});
