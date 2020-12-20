const DB = require("../hellpers/db");
const COLLECTIONS = require("../hellpers/enums").COLLECTIONS;

class PlayersRepository {
  static async create (player) {
    if (!player || !player.name || player.name === "") return null;

    return DB.create(COLLECTIONS.PLAYER, {
      name: player.name
    });
  }

  static async findByID (id) {
    try {
      return DB.findOneByID(COLLECTIONS.PLAYER, id);
    } catch (e) {
      return null;
    }
  }

  static async findBy (field, value) {
    try {
      return DB.findOne(COLLECTIONS.PLAYER, { [field]: value });
    } catch (e) {
      return null;
    }
  }
}

module.exports = PlayersRepository;
