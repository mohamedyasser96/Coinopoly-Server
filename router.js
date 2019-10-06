const express = require('express')
const router = express.Router()

const controller = require('./Controller')

router.use(express.json())

// Properties
router.route('/properties').get(controller.getAllProperties)
router.route('/properties/buy').post(controller.buyProperty)

//Rent
router.route('/payRent').post(controller.payRent)

// Questions
router.route('/questions/getQuestions').get(controller.getQuestions)

//Players
router.route('/players/getAllPlayers').get(controller.getPlayers)
router.route('/players/insert').post(controller.insertPlayer)
router.route('/players/getPlayer').get(controller.getPlayer)


module.exports = router