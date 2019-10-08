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

  buyProperty: async(req, res) =>{
    
    if(!req.body.id || !req.body.username)
      return res.status(400).send("Request is missing a required parameter.")


    // Get property's price
    let property
    try{
      property = Properties.findOne({id:req.body.id})
    }catch(err){
      return res.status(404).send("Property not found.")
    }
    let price = property.Value


    // Make sure player has enough balance
    let player
    try{
    player = Players.findOne({username:req.body.username})
    }catch(err){
      return res.status(404).send("Player not found.")
    }
    if(player.balance < price)
      return res.status(400).send("The Player doesn't have enough balance.")


    
    await Players.findOneAndUpdate({username:req.body.username}, async(err, buyer)=>{
      if (err)
        return res.status(500).send({"response": err.message}) 

      // Assign player as property owner
      await Properties.findOneAndUpdate({id:req.body.id}, (err, propertyBeingBought)=>{
        if (err)
          return res.status(500).send({"response": err.message}) 
        
          propertyBeingBought.owner = buyer.username 
      })

      // Deduct amount from player
      buyer.balance = buyer.balance - price      
    })
    
  },  

  getRandomQuestion: async(req,res)=>{
    if(!req.query.propertyId)
      return res.status(400).send("Request is missing a required parameter.")

    // Get Questions for given propertyId
    let propertyQuestions
    try{
      propertyQuestions = await Questions.find({property_id:req.query.propertyId})
    }catch(err){
      return res.status(500).send({"response": err.message})
    }

    // Choose a random Question
    let question
    try{
      question = propertyQuestions[Math.floor(Math.random()*propertyQuestions.length)];
    }catch(err){
      return res.status(500).send({"response": err.message})
    }

    // Fetch chosen Question's answers
    let answers
    try{
      answers = await Answers.find({question_id:question.id})
    }catch(err){
      return res.status(500).send({"response": err.message})
    }

    // Construct and return result
    return res.status(200).send({"response":{"Question":question, "Answers":answers}})
    
  },

  getAllProperties: async(req, res)=>{
    try{
      result  = await Propertiess.find()
      res.header("Access-Control-Allow-Origin", "*")
    }catch(err){
      return res.status(500).send({"response": err.message})
    }
    return res.status(200).send({'response': result})
  },
  
  payRent: async (req, res) => {

    if(!req.body.from || !req.body.amount || !req.body.to)
        return res.status(400).send("Request is missing a required parameter.")

    res.header("Access-Control-Allow-Origin", "*")

    try{
      await Players.findOneAndUpdate({username:req.body.from}, (err, sender)=>{
          if (err)
              return res.status(500).send({"response": err.message}) 

          await Players.findOneAndUpdate({username:req.body.to}, (err, reciever)=>{
              if (err)
                return res.status(500).send({"response": err.message}) 
              reciever.balance = reciever.balance + req.body.amount
          })

          sender.balance = sender.balance - req.body.amount
      })
 
    }catch(err){
      return res.status(500).send({"response": err.message}) 
    }
    return res.status(204).send({"response":"OK"})
  
<<<<<<< HEAD
},
=======
  },
>>>>>>> 68f30212f71d9f8dccb185689491a88b072cd00c

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


