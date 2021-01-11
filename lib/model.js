const _md5=require("md5");
const _uuid=require("uuid");

class Model {
	constructor(obj) {
		this.id=obj.id;
		this.created_at=obj.created_at ? obj.created_at : new Date();
		this.modified_at=obj.modified_at ? obj.modified_at : new Date();
	}

	static get uuid() {
		return _uuid.v4();
	}

	static get collection() {
		return "_model";
	}

	static md5(value) {
		return _md5(value);
	}

	isValid(is_new=false) {
		return true;
	}
}

module.exports=Model;
