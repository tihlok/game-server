const Model=require("../model");

class Player extends Model {
	constructor(obj) {
		super(obj);
		this.login=obj.login;
		this.password=obj.password;
		this.token=obj.token;
	}

	static get collection() {
		return "players";
	}

	isValid(is_new=false) {
		if(!this.login || !this.login.length) return false;
		if(is_new && (!this.password || this.password.length < 3)) return false;
		return true;
	}

	isPasswordValid(password) {
		return this.password === Player.md5(password);
	}
}

module.exports=Player;
