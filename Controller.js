const mongoose = require('mongoose')
require('./models/answers')
require('./models/property')
require('./models/players')
require('./models/questions')
require('./models/chance')
const Players = mongoose.model('players')
const Properties = mongoose.model('properties')
const Questions = mongoose.model('Questions')
const Answers = mongoose.model("Answers")
const Chances = mongoose.model("chance")


module.exports = {

  buyProperty: async(req, res) =>{
    
    if(!req.body.id || !req.body.username)
      return res.status(400).send("Request is missing a required parameter.")


    // Get property's price
    let property
    try{
      property = await Properties.findOne({id:req.body.id})
      console.log("Property: ", property)
    }catch(err){
      return res.status(404).send("Property not found.")
    }
    let price = property.Value


    // Make sure player has enough balance
    let player
    try{
    player = await Players.findOne({username:req.body.username})
    console.log("Player: ", player)
    }catch(err){
      return res.status(404).send("Player not found.")
    }
    if(player.balance < price)
      return res.status(400).send("The Player doesn't have enough balance.")

    let bal = player.balance

    let prop

    try{
      await Players.findOneAndUpdate({username:req.body.username},
      {$set: { balance: bal-price}})
    }catch(err){
      console.log("Error1")
    }
    try{
      prop = await Properties.findOneAndUpdate({id:req.body.id},
      {$set: { owner: req.body.username}})
    }catch(err){
      console.log("Error2")
    }
    

    // await Players.findOneAndUpdate({username:req.body.username}, async(err, buyer)=>{
    //   console.log("In playerss")
    //   if (err)
    //     return res.status(500).send({"response": err.message}) 

    //   // Assign player as property owner
    //   await Properties.findOneAndUpdate({id:req.body.id}, (err, propertyBeingBought)=>{
    //     console.log("In propss")
    //     if (err)
    //       return res.status(500).send({"response": err.message}) 

    //     propertyBeingBought.owner = buyer.username 
    //   })
    //   console.log("Buyer: ", buyer)
    //   console.log("Property: ", propertyBeingBought)

    //   // Deduct amount from player
    //   buyer.balance = buyer.balance - price      
    // })
    return res.status(200).send({'response': prop})
    
  },  

  getRandomQuestion: async(req,res)=>{
    if(!req.body.propertyId)
      return res.status(400).send("Request is missing a required parameter.")

    // Get Questions for given propertyId
    let propertyQuestions
    try{
      propertyQuestions = await Questions.find({property_id:req.body.propertyId})
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
      result  = await Properties.find()
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
      await Players.findOneAndUpdate({username:req.body.from}, async(err, sender)=>{
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
  
  },
  
  getPlayers: async (req, res) => {
    let result 
    try{
      result  = await Players.find({code: req.body.gameCode})

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
        balance: 2000,
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
    console.log("Getting player")
    try{
      result  = await Players.findOne({ username: req.body.userName})

      res.header("Access-Control-Allow-Origin", "*")
      
    }catch(err){
      res.status(500).send({"response": err.message}) 
      console.log("a7a", err)
    }
    return res.status(200).send({'response': result})
  },
  getChance: async (req, res) => {
    let cards 
    try{
      cards  = await Chances.find()

      res.header("Access-Control-Allow-Origin", "*")
      
    }catch(err){
      res.status(500).send({"response": err.message}) 
    }

    let ch
    try{
      ch = cards[Math.floor(Math.random()*cards.length)];
    }catch(err){
      return res.status(500).send({"response": err.message})
    }

    return res.status(200).send({'response': ch})
  },

  
 
}


