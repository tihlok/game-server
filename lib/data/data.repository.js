const debug=require("debug")("game:mongo");
const DB=require("../hellpers/db");
const Data=require("./data.model");

class DataRepository {
	static async push(data) {
		try {
			data=new Data(data);
			if(!data.isValid(true)) return null;

			await DB.flush(Data.collection);
			return new Data(await DB.create(Data.collection, data));
		} catch(e) {
			debug("failed pushing data:", e);
			return null;
		}
	}

	static async fetch() {
		try {
			return new Data(await DB.findOne(Data.collection, {}));
		} catch(e) {
			debug("failed fetching data", e);
			return null;
		}
	}
}

module.exports=DataRepository;
