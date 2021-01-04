const debug=require("debug")("game:personas");
const DB=require("../hellpers/db");
const Persona=require("./personas.model");

class PersonasRepository {
	static async createOrUpdate(persona) {
		try {
			const find=await DB.findOneByID(Persona.collection, persona.id);
			if(find) {
				return this.update(persona, find);
			}
			return this.create(persona);
		} catch(e) {
			debug("failed creating persona:", persona, e);
			return null;
		}
	}

	static async create(persona) {
		return new Persona(await DB.create(Persona.collection, persona));
	}

	static async update(_new, _old) {
		const id=_old.id;
		_old=new Persona(_old);
		Object.keys(_new, (k) => (_old[k]=_new[k]));
		_old.id=id;
		return new Persona(await DB.update(Persona.collection, _old));
	}

	static async findBy(query) {
		try {
			return new Persona(await DB.findOne(Persona.collection, query));
		} catch(e) {
			debug("failed finding by", query, e);
			return null;
		}
	}

	static async findManyBy(query) {
		try {
			const personas=await (await DB.findMany(Persona.collection, query)).toArray();
			return personas.map((p) => new Persona(p));
		} catch(e) {
			debug("failed finding by", query, e);
			return null;
		}
	}
}

module.exports=PersonasRepository;
