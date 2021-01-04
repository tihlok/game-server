const debug=require("debug")("game:mongo");
const _mongodb=require("mongodb");
const mongodb=_mongodb.MongoClient;

class DB {
	static async connect() {
		if(DB.connection) return DB.connection;
		debug(`starting mongo connection...`);
		return mongodb.connect("mongodb://localhost/game", { useUnifiedTopology: true })
		              .then((connection) => {
			              debug(`success!`);
			              DB.connection=connection.db("game");
			              return DB.connection;
		              })
		              .catch((err) => debug(`failed to connect to mongo: `, err));
	}

	static async flush(collection) {
		return DB.connect()
		         .then((connection) => connection.collection(collection)
		                                         .drop())
		         .catch((err) => {});
	}

	static async create(collection, data) {
		return DB.connect()
		         .then((connection) => connection.collection(collection)
		                                         .insertOne(data))
		         .then((result) => this.findOne(collection, { _id: result.insertedId }));
	}

	static async update(collection, data) {
		return DB.connect()
		         .then((connection) => connection.collection(collection)
		                                         .updateOne({ _id: DB.id(data.id) }, data))
		         .then((result) => this.findOne(collection, { _id: result.upsertedId }));
	}

	static async findMany(collection, query) {
		return DB.connect()
		         .then((connection) => connection.collection(collection)
		                                         .find(query));
	}

	static async findOne(collection, query) {
		return DB.connect()
		         .then((connection) => connection.collection(collection)
		                                         .findOne(query));
	}

	static async findOneByID(collection, id) {
		return DB.findOne(collection, { _id: DB.id(id) });
	}

	static id(_id) {
		try {
			return _mongodb.ObjectID(_id);
		} catch(e) {
			return null;
		}
	}
}

module.exports=DB;
