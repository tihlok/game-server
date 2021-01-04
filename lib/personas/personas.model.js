const _=require("lodash");
const Model=require("../model");

class Persona extends Model {
	constructor(obj) {
		super(obj);
		this.player_id=obj.player_id;
		this.name=obj.name;
		this.level=obj.level;
		this.origin=obj.origin;
		this.max_pv=obj.max_pv;
		this.current_pv=obj.current_pv;
		this.tactical_stress=obj.tactical_stress;
		this.combat_stress=obj.combat_stress;
		this.skills=obj.skills;
		this.combos=obj.combos;
		this.advantages=obj.advantages;
		this.inventory=obj.inventory;
		this.lore=obj.lore;
		this.diary=obj.diary;
		this.imageURL=obj.imageURL;
	}

	static get collection() {
		return "personas";
	}

	get power() {
		return _.sumBy(this.skills, (skill) => skill.power) || 0;
	}
}

module.exports=Persona;
