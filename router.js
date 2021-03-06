const express = require('express')
const router = express.Router()

const controller = require('./Controller')

router.use(express.json())

// Properties
router.route('/properties').post(controller.getAllProperties)
router.route('/properties/buy').post(controller.buyProperty)

//Rent
// router.route('/payRent').post(controller.payRent)

//Rent
router.route('/payRent').post(controller.payRent)

router.route('/getChance').get(controller.getChance)

// Questions
router.route('/questions/getQuestions').post(controller.getQuestions)
router.route('/questions/randomQuestion').post(controller.getRandomQuestion)

//Players
router.route('/players/getAllPlayers').post(controller.getPlayers)
router.route('/players/insert').post(controller.insertPlayer)
router.route('/players/getPlayer').post(controller.getPlayer)


module.exports = router
