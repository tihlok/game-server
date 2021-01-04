const _=require("lodash");
const Model=require("../model");

class Persona extends Model {
	constructor(obj) {
		super(obj);
		Object.keys(obj).forEach((k) => (this[k]=obj[k]));
	}

	static get collection() {
		return "personas";
	}
}

module.exports=Persona;
