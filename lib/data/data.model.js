const Model=require("../model");

class Data extends Model {
	constructor(obj) {
		super(obj);
		Object.keys(obj)
		      .forEach((key) => this[key]=obj[key]);
	}

	static get collection() {
		return "data";
	}

	isValid(is_new=false) {
		return true;
	}
}

module.exports=Data;
