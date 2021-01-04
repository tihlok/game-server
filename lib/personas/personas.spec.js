const chai=require("chai");
const chaiHttp=require("chai-http");
chai.use(chaiHttp);
chai.should();

const app=require("../../app");
const DB=require("../hellpers/db");

const persona={
	player_id: null,
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
	imageURL: "https://i.pinimg.com/originals/8f/70/7f/8f707fd89d0b0d0148056fca835aa80e.jpg"
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
		requester.post("/players/login")
		         .send({
			               login: "tihlok",
			               password: "password"
		               })
		         .then((login) => {
			         _login=login;
			         persona.player_id=_login.body.id;
			         return requester.post("/personas/save")
			                         .send(persona);
		         })
		         .then((response) => {
			         response.status.should.be.equals(201);
			         response.body.id.should.not.be.null;
			         delete response.body.id;
			         delete response.body._id;
			         response.body.should.be.deep.equals(persona);
		         })
		         .then(() => done())
		         .catch(done)
		         .finally(() => requester.close());
	});

	it(`should update a persona, expect 201`, (done) => {
		let _login;
		const requester=chai.request(app)
		                    .keepOpen();
		requester.post("/players/login")
		         .send({
			               login: "tihlok",
			               password: "password"
		               })
		         .then((login) => {
			         _login=login;
			         persona.player_id=_login.body.id;
			         return requester.post("/personas/save")
			                         .send(persona);
		         })
		         .then((response) => {
			         response.status.should.be.equals(201);
			         response.body.id.should.not.be.null;
			         const id=response.body.id;
			         delete response.body.id;
			         delete response.body._id;
			         response.body.should.be.deep.equals(persona);

			         persona.id=id;
			         persona.level=6;
			         persona.max_pv=60;
			         return requester.post("/personas/save")
			                         .send(persona);
		         })
		         .then((response) => {
			         response.status.should.be.equals(201);
			         response.body.level.should.be.equals(6);
			         response.body.max_pv.should.be.equals(60);
		         })
		         .then(() => done())
		         .catch(done)
		         .finally(() => requester.close());
	});
});
