const debug=require("debug")("game:player");
const DB=require("../hellpers/db");
const Player=require("./players.model");

class PlayersRepository {
	static async create(player) {
		try {
			player=new Player(player);
			if(!player.isValid(true)) return null;

			return new Player(await DB.create(Player.collection, {
				login: player.login,
				password: Player.md5(player.password),
				created_at: Date.now(),
				modified_at: Date.now()
			}));
		} catch(e) {
			debug("failed creating player:", player, e);
			return null;
		}
	}

	static async findBy(query) {
		try {
			return new Player(await DB.findOne(Player.collection, query));
		} catch(e) {
			debug("failed finding by", query, e);
			return null;
		}
	}
}

module.exports=PlayersRepository;
