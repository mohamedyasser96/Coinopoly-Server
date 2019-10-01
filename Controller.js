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
  },

  insertPlayer: async (req, res) => {
    let result
    console.log(req.body)
    if(!req.body.userName || !req.body.gameCode)
      return res.status(400).send({"response": "Missing parameter"}) 

    

    try{
      const player = new Players({
        username: req.body.userName,
        code: req.body.gameCode,
        balance: 500,
        turn: false
      })

      await player.save(function (err){
        if(err){
          throw Error("Failed to save player")
        }
      })

    }catch(err){
      return res.status(500).send({ 'response': err.message})
    }

    return res.status(200).send({ 'response': "Player successfully inserted"})
  },
  getPlayer: async (req, res) => {
    let result 
    try{
      result  = await Players.findOne({ username: req.body.userName})

      res.header("Access-Control-Allow-Origin", "*")
      
    }catch(err){
      res.status(500).send({"response": err.message}) 
    }
    return res.status(200).send({'response': result})
  },
 
}


