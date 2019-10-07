const express = require('express')
const router = express.Router()

const controller = require('./Controller')

router.use(express.json())

// Properties
router.route('/properties').get(controller.getAllProperties)

//Rent
router.route('/payRent').post(controller.payRent)

// Questions
router.route('/questions/getQuestions').get(controller.getQuestions)
router.route('/questions/randomQuestion').get(controller.getRandomQuestion)

//Players
router.route('/players/getAllPlayers').get(controller.getPlayers)
router.route('/players/insert').post(controller.insertPlayer)
router.route('/players/getPlayer').get(controller.getPlayer)


module.exports = router
