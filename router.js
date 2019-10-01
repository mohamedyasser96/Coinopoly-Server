const express = require('express')
const router = express.Router()

const controller = require('./Controller')

router.use(express.json())

router.route('/questions/getQuestions').get(controller.getQuestions)

module.exports = router