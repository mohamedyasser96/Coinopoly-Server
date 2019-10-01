const mongoose = require('mongoose')
require('./models/answers')
require('./models/property')
require('./models/players')
require('./models/questions')
const Players = mongoose.model('players')
const Properties = mongoose.model('properties')
const Questions = mongoose.model('Questions')
const Answers = mongoose.model("Answers")



module.exports = {
  getPlayers: async (req, res) => {
    let result 
    try{
      result  = await Players.find()

      res.header("Access-Control-Allow-Origin", "*")
      
    }catch(err){
      res.status(500).send({"response": err.message}) 
    }
    return res.status(200).send({'response': result})
    
  },

  getQuestions: async (req, res) => {
    let result 
    try{
    result  = await Questions.find()

      res.header("Access-Control-Allow-Origin", "*")
      
    }catch(err){
      res.status(500).send({"response": err.message}) 
    }
    return res.status(200).send({'response': result})
  }
 
}


