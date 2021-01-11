const debug=require("debug")("game:personas");
const DB=require("../hellpers/db");
const Persona=require("./personas.model");

class PersonasRepository {
	static async createOrUpdate(persona) {
		return DB.queryOne(`SELECT *
                            FROM personas
                            WHERE id = $1;`, [persona.id])
		         .then((existing) => {
			         if(existing) return this.update(existing);
			         return this.create(persona);
		         })
		         .catch((err) => {
			         debug("failed creating persona:", persona, err);
			         return null;
		         });
	}

	static async create(persona) {
		return DB.queryOne(`INSERT INTO personas(player_id, name, level, origin, max_hp, current_hp, tactical_stress, combat_stress, skills, advantages, disadvantages, combos, inventory, lore, diary, image_url)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
                            RETURNING *;`, [
			                                   persona.player_id,
			                                   persona.name,
			                                   persona.level,
			                                   persona.origin,
			                                   persona.max_hp,
			                                   persona.current_hp,
			                                   persona.tactical_stress,
			                                   persona.combat_stress,
			                                   persona.skills,
			                                   persona.advantages,
			                                   persona.disadvantages,
			                                   persona.combos,
			                                   persona.inventory,
			                                   persona.lore,
			                                   persona.diary,
			                                   persona.image_url])
		         .then((created) => new Persona(created));
	}

	static async update(_new, persona) {
		persona=new Persona(persona);
		Object.keys(_new)
		      .forEach((k) => (persona[k]=_new[k]));
		return DB.queryOne(`UPDATE personas
                            SET player_id=$2,
                                name=$3,
                                level=$4,
                                origin=$5,
                                max_hp=$6,
                                current_hp=$7,
                                tactical_stress=$8,
                                combat_stress=$9,
                                skills=$10,
                                advantages=$11,
                                disadvantages=$12,
                                combos=$13,
                                inventory=$14,
                                lore=$15,
                                diary=$16,
                                image_url=$17
                            WHERE id = $1
                            RETURNING *;`,
			[
				persona.id,
				persona.player_id,
				persona.name,
				persona.level,
				persona.origin,
				persona.max_hp,
				persona.current_hp,
				persona.tactical_stress,
				persona.combat_stress,
				persona.skills,
				persona.advantages,
				persona.disadvantages,
				persona.combos,
				persona.inventory,
				persona.lore,
				persona.diary,
				persona.image_url])
		         .then((created) => new Persona(created));
	}

	static async findByPlayerID(player_id) {
		return DB.query(`SELECT *
                         FROM personas
                         WHERE player_id = $1;`, [player_id])
		         .then((personas) => personas.map((p) => new Persona(p)))
		         .catch((err) => {
			         debug("failed finding", player_id, err);
			         return [];
		         });
	}
}

module.exports=PersonasRepository;
