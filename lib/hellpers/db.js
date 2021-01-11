const debug=require("debug")("game:db");
const Pool=require("pg").Pool;
const uri=process.env.DATABASE_URL;

class DB {
	static async connect() {
		if(DB.connection) return DB.connection;
		debug(`starting db connection...`);
		const pool=new Pool({ connectionString: uri });
		return pool.connect()
		           .then((connection) => {
			           debug(`success!`);
			           DB.connection=connection;
			           return DB.connection;
		           })
		           .catch((err) => debug(`failed to connect to db: `, err));
	}

	static promised(connection, query, args=[]) {
		return new Promise((resolve, reject) => connection.query(query, args, (err, result) => {
			if(err) return reject(err);
			return resolve(result.rows);
		}));
	}

	static async query(query, args=[]) {
		return DB.connect()
		         .then((connection) => DB.promised(connection, query, args));
	}

	static async queryOne(query, args=[]) {
		return DB.query(query, args)
		         .then((results) => results[0]);
	}
}

module.exports=DB;
