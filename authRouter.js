const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require("express-validator")
const authMiddleware = require('./middlewaree/authMiddleware')
const roleMiddleware = require('./middlewaree/roleMiddleware')

router.post('/registration',[
    check('username', 'Please enter a usename').notEmpty(),
    check('password', 'Password length must be 6-12 symbols').isLength({min:6, max:12})
] 
,controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['USER']), controller.getUsers)

module.exports = router 