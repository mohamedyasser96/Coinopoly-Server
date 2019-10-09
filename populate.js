const mongoose = require("mongoose");
let questions = require("./models/questions")
let players = require("./models/players")
let properties = require("./models/property")
let answers = require("./models/answers")

const Questions = [
	{
		id:'1',
		text: 'The first official egyptian currency was minted and issued for circualtion in: ',
		property_id: '1'

	},

{
		id:'2',
		text: 'Before the first official egyptian pound was minted, the main currency in circulation was',
		property_id: '2'

	},

{
		id:'3',
		text: 'Egyptian pounds were minted on gold and silver coins until 1898, the first paper banknote was issued in April of 1899. It was worth',
		property_id: '3'

	},
{
		id:'4',
		text: 'The egyptian pound as we know it today was first announced in',
		property_id: '4'

	},
{
		id:'5',
		text: 'Since 1914, there have been many adjustments to the design of banknotes, such as adding the metal thread in 1968',
		property_id: '5'

	},
{
		id:'6',
		text: 'Since 1914, there have been many adjustments to the design of banknotes, such as adding the metal thread in 1968',
		property_id: '6'

	},
]

const Answers = [
	{
		id: '1',
		text: '1919',
		question_id: '1',
		correct: false
	},
	{
		id: '2',
		text: '1945',
		question_id: '1',
		correct: false
	},
	{
		id: '3',
		text: '1936',
		question_id: '1',
		correct: true
	},
	{
		id: '4',
		text: '1990',
		question_id: '1',
		correct: false
	}
]

const Players = [
	{
		username:'mohamed',
		code: '111222',
		balance: '500',
		turn: false
	},
	{
		username:'sherifa',
		code: '111222',
		balance: '500',
		turn: false
	},
	{
		username:'youssef',
		code: '111222',
		balance: '500',
		turn: false
	}

]

const Properties = [
	{
		id: '1',
		name: 'Yasser Mall',
		Value: '80',
		rentValue: '10',
		info: 'Yasser Mall is so cool',
		owner: null	  
	},
	{
		id: '2',
		name: 'Oufi Train',
		Value: '180',
		rentValue: '20',
		info: 'Testtttttttt',
		owner: null	  
	},
	{
		id: '3',
		name: 'Wallstreet',
		Value: '120',
		rentValue: '18',
		info: 'AAAAAABBBBBBBB',
		owner: null	  
	}
]


// Connect to MongoDB
mongoose.connect('mongodb://localhost/oufi');

// Go through each movie
Questions.map(data => {
  // Initialize a model with movie data
  const question = new questions(data);
  // and save it into the database
  question.save();
});
Players.map(data => {
	// Initialize a model with movie data
	const player = new players(data);
	// and save it into the database
	player.save();
  });
Properties.map(data => {
// Initialize a model with movie data
const property = new properties(data);
// and save it into the database
property.save();
});
Answers.map(data => {
	// Initialize a model with movie data
	const answer = new answers(data);
	// and save it into the database
	answer.save();
});