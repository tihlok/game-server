const chai=require("chai");
const chaiHttp=require("chai-http");
chai.use(chaiHttp);
chai.should();

const app=require("../../app");
const DB=require("../hellpers/db");

const lucy={
	player_id: "strife.tiago@gmail.com",
	name: "Lucy",
	level: 5,
	origin: "Cósmico",
	max_hp: 45,
	current_hp: 45,
	tactical_stress: 0,
	combat_stress: 0,
	skills: [
		{
			id: 1,
			name: "Bola de Fogo 🔥",
			type: "FOGO",
			base_power: 25,
			power_mod: [],
			effects: [
				{ name: "STUN" },
				{ name: "EXPLOSÃO CONTROLADA" },
				{ name: "SLOW" }
			]
		},
		{
			id: 2,
			name: "Rabo de Aço 👿",
			type: "AÇO",
			base_power: 3,
			power_mod: [],
			effects: []
		},
		{
			id: 3,
			name: "Bola Cósmica 💥",
			type: "CÓSMICO",
			base_power: 0,
			power_mod: [
				{ type: "SUM", value1: ".power", value2: ".skills.1.power" }
			],
			effects: []
		}
	],
	combos: [],
	advantages: [
		{
			id: 1,
			name: "Fazer Carinho na Barriga do Lobisomem",
			mod: 1,
			permanent: false
		},
		{
			id: 2,
			name: "Blefar: Enganação",
			mod: 2,
			permanent: true
		},
		{
			id: 3,
			name: "Leitura de Idiomas Antigos",
			mod: 0,
			permanent: false
		},
		{
			id: 4,
			name: "Identificação de Feitiços",
			mod: 1,
			permanent: false
		},
		{
			id: 5,
			name: "Presença Cósmica",
			mod: 0,
			permanent: false
		},
		{
			id: 6,
			name: "Intimidar",
			mod: 0,
			permanent: false
		},
		{
			id: 7,
			name: "Carregar Peso",
			mod: 1,
			permanent: false
		}
	],
	disadvantages: [
		{
			id: 1,
			name: "Liderar Deslocamento",
			mod: 0,
			permanent: false
		},
		{
			id: 2,
			name: "Aproximação Furtiva",
			mod: 0,
			permanent: false
		},
		{
			id: 3,
			name: "Jogar Coisas",
			mod: 0,
			permanent: false
		},
		{
			id: 4,
			name: "Percepção",
			mod: 0,
			permanent: false
		},
		{
			id: 5,
			name: "Localizar no Mapa",
			mod: 0,
			permanent: false
		}
	],
	inventory: [
		{
			id: 1,
			name: "Esfera Mágica",
			description: "transforma skill com o tipo da origem e adiciona o power",
			quantity: 0
		},
		{
			id: 2,
			name: "Relógio de Ouro (que não é um relógio) 🕰",
			description: "?",
			quantity: 1
		},
		{
			id: 3,
			name: "Pulseira de Prata 💎",
			description: "?",
			quantity: 1
		},
		{
			id: 4,
			name: "Faca Pequena com Diamantes 💎",
			description: "vale muitoooo",
			quantity: 1
		},
		{
			id: 5,
			name: "Papiro Velho 📜",
			description: "Pele de Anão",
			quantity: 1
		},
		{
			id: 6,
			name: "Colar com Rosa Negra 🌹",
			description: "Diamante Negro, Alto Valor 🤑",
			quantity: 1
		},
		{
			id: 7,
			name: "Unha de Criatura",
			description: "Besta",
			quantity: 1
		},
		{
			id: 8,
			name: "Bestiário Bárbaro",
			description: "informações sobre criaturas da região do reino bárbaro",
			quantity: 1
		},
		{
			id: 9,
			name: "Madeira de Betulo",
			description: "Madeira antiga, que quando queimada a fumaça transporta para algum local seguro",
			quantity: 1
		},
		{
			id: 10,
			name: "Comida",
			description: "Porções de Comida, recupera vida",
			quantity: 2
		},
		{
			id: 11,
			name: "Vestes do Deserto",
			description: "Oferece proteção no deserto, não prejudicado pelo calor e garante deslocamento furtivo no deserto",
			quantity: 1
		}
	],
	lore: "foi expulso do paraiso",
	diary: "",
	imageURL: "https://s2.glbimg.com/oWSoXiCjZS2H_86OPLnRBAIh6Lo=/e.glbimg.com/og/ed/f/original/2014/08/28/lucy1.jpg"
};
const terat={
	player_id: "strife.tiago@gmail.com",
	name: "Terat",
	level: 99,
	origin: "Cósmico",
	max_hp: 1500,
	current_hp: 1000,
	tactical_stress: 3,
	combat_stress: 2,
	skills: [
		{
			id: 1,
			name: "Bola de Fogo 🔥",
			type: "FOGO",
			base_power: 99,
			power_mod: [],
			effects: [
				{ name: "STUN" },
				{ name: "EXPLOSÃO CONTROLADA" },
				{ name: "SLOW" }
			]
		},
		{
			id: 2,
			name: "Rabo de Aço 👿",
			type: "AÇO",
			base_power: 0,
			power_mod: [],
			effects: []
		},
		{
			id: 3,
			name: "Bola Cósmica 💥",
			type: "CÓSMICO",
			base_power: 0,
			power_mod: [
				{ type: "SUM", value1: ".power", value2: ".skills.1.power" }
			],
			effects: []
		}
	],
	combos: [],
	advantages: [],
	disadvantages: [],
	inventory: [],
	lore: "",
	diary: "",
	imageURL: "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/0/00/Vampire.jpg/revision/latest/scale-to-width-down/250?cb=20190527131740"
};
const flynn={
	player_id: null,
	name: "Flynn",
	level: 1,
	origin: "Cósmico",
	max_hp: 15,
	current_hp: 15,
	tactical_stress: 1,
	combat_stress: 1,
	skills: [
		{
			id: 1,
			name: "Bola de Fogo 🔥",
			type: "FOGO",
			base_power: 5,
			power_mod: [],
			effects: [
				{ name: "STUN" },
				{ name: "EXPLOSÃO CONTROLADA" },
				{ name: "SLOW" }
			]
		},
		{
			id: 2,
			name: "Rabo de Aço 👿",
			type: "AÇO",
			base_power: 0,
			power_mod: [],
			effects: []
		},
		{
			id: 3,
			name: "Bola Cósmica 💥",
			type: "CÓSMICO",
			base_power: 0,
			power_mod: [
				{ type: "SUM", value1: ".power", value2: ".skills.1.power" }
			],
			effects: []
		}
	],
	combos: [],
	advantages: [],
	disadvantages: [],
	inventory: [],
	lore: "",
	diary: "",
	imageURL: "https://static.wikia.nocookie.net/blackbandos-homebrew/images/0/0e/Edgy_rockstar.jpg/revision/latest?cb=20161214174708"
};
const the_big_boss={
	player_id: "strife.tiago@gmail.com",
	name: "The Final Boss",
	level: 255,
	origin: "Cósmico",
	max_hp: 250000,
	current_hp: 250000,
	tactical_stress: 0,
	combat_stress: 0,
	skills: [
		{
			id: 1,
			name: "Bola de Fogo 🔥",
			type: "FOGO",
			base_power: 3200,
			power_mod: [],
			effects: [
				{ name: "STUN" },
				{ name: "EXPLOSÃO CONTROLADA" },
				{ name: "SLOW" }
			]
		},
		{
			id: 2,
			name: "Rabo de Aço 👿",
			type: "AÇO",
			base_power: 0,
			power_mod: [],
			effects: []
		},
		{
			id: 3,
			name: "Bola Cósmica 💥",
			type: "CÓSMICO",
			base_power: 0,
			power_mod: [
				{ type: "SUM", value1: ".power", value2: ".skills.1.power" }
			],
			effects: []
		}
	],
	combos: [],
	advantages: [],
	disadvantages: [],
	inventory: [],
	lore: "",
	diary: "",
	imageURL: "https://i.pinimg.com/564x/ab/e6/60/abe6604aba9c014f2c98bb771ab7dac2.jpg"
};

describe(`personas`, () => {
	beforeEach((done) => {
		DB.flush("personas")
		  .then(() => done())
		  .catch(done);
	});

	it(`should try to get personas for player 1, expect 200, empty`, (done) => {
		const requester=chai.request(app)
		                    .keepOpen();
		requester.get("/personas/1")
		         .then((response) => {
			         response.status.should.be.equals(200);
			         response.body.should.be.an("array");
			         response.body.length.should.be.equals(0);
		         })
		         .then(() => done())
		         .catch(done)
		         .finally(() => requester.close());
	});

	it(`should create a persona, expect 201`, (done) => {
		let _login;
		const requester=chai.request(app)
		                    .keepOpen();
		requester.post("/personas/save")
		         .send(lucy)
		         .then((response) => {
			         response.status.should.be.equals(201);
			         response.body.id.should.not.be.null;
			         delete response.body.id;
			         delete response.body._id;
			         delete response.body.created_at;
			         delete response.body.modified_at;
			         response.body.should.be.deep.equals(lucy);
		         })
		         .then(() => done())
		         .catch(done)
		         .finally(() => requester.close());
	});

	it(`should update a persona, expect 201`, (done) => {
		let _login;
		const requester=chai.request(app)
		                    .keepOpen();
		requester.post("/personas/save")
		         .send(lucy)
		         .then((response) => {
			         response.status.should.be.equals(201);
			         response.body.id.should.not.be.null;
			         const id=response.body.id;
			         delete response.body.id;
			         delete response.body._id;
			         delete response.body.created_at;
			         delete response.body.modified_at;
			         response.body.should.be.deep.equals(lucy);

			         lucy.id=id;
			         lucy.level=6;
			         lucy.max_pv=60;
			         return requester.post("/personas/save")
			                         .send(lucy);
		         })
		         .then((response) => {
			         response.status.should.be.equals(201);
			         response.body.level.should.be.equals(6);
			         response.body.max_pv.should.be.equals(60);
			         return requester.post("/personas/save")
			                         .send(terat);
		         })
		         .then(() => {
			         return requester.post("/personas/save")
			                         .send(flynn);
		         })
		         .then(() => {
			         return requester.post("/personas/save")
			                         .send(the_big_boss);
		         })
		         .then(() => done())
		         .catch(done)
		         .finally(() => requester.close());
	});
});
