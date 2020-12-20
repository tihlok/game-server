const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

const app = require("../app");
const DB = require("../hellpers/db");
const enums = require("../hellpers/enums");

describe(`player`, () => {
  beforeEach((done) => {
    DB.flush(enums.COLLECTIONS.PLAYER)
      .then(() => done())
      .catch(done);
  });

  it(`should try to get player 1, expect 404`, (done) => {
    const requester = chai.request(app).keepOpen();
    requester.get("/players/1")
      .then((response) => {
        response.status.should.be.equals(404);
        done();
      })
      .catch(done)
      .finally(() => requester.close());
  });

  it(`should not create player, expect 403, no body`, (done) => {
    const requester = chai.request(app).keepOpen();
    requester.post("/players")
      .then((response) => {
        response.status.should.be.equals(403);
        done();
      })
      .catch(done)
      .finally(() => requester.close());
  });

  it(`should not create player, expect 403, null name`, (done) => {
    const requester = chai.request(app).keepOpen();
    requester.post("/players").send({ name: null })
      .then((response) => {
        response.status.should.be.equals(403);
        done();
      })
      .catch(done)
      .finally(() => requester.close());
  });

  it(`should not create player, expect 403, empty name`, (done) => {
    const requester = chai.request(app).keepOpen();
    requester.post("/players").send({ name: "" })
      .then((response) => {
        response.status.should.be.equals(403);
        done();
      })
      .catch(done)
      .finally(() => requester.close());
  });

  it(`should create player, expect 201`, (done) => {
    const requester = chai.request(app).keepOpen();
    requester.post("/players").send({ name: "tihlok" })
      .then((response) => {
        response.status.should.be.equals(201);
        response.body.name.should.be.equals("tihlok");
        return response.body._id;
      })
      .then((_id) => requester.get(`/players/${_id}`))
      .then((response) => {
        response.status.should.be.equals(200);
        response.body.name.should.be.equals("tihlok");
        done();
      })
      .catch(done)
      .finally(() => requester.close());
  });

  it(`should not create player with same name, expect 409`, (done) => {
    const requester = chai.request(app).keepOpen();
    requester.post("/players")
      .send({ name: "tihlok" })
      .then((response) => {
        response.status.should.be.equals(201);
        response.body.name.should.be.equals("tihlok");
      })
      .then(() => requester.post("/players").send({ name: "tihlok" }))
      .then((response) => {
        response.status.should.be.equals(409);
        done();
      })
      .catch(done)
      .finally(() => requester.close());
  });
});
