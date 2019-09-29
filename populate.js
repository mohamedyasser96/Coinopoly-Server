// import mongoose from 'mongoose';
const mongoose = require("mongoose");
let questions = require("./models/questions")
// import questions from './models/questions';

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


// Connect to MongoDB
mongoose.connect('mongodb://localhost/oufi');

// Go through each movie
Questions.map(data => {
  // Initialize a model with movie data
  const question = new questions(data);
  // and save it into the database
  question.save();
});