const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator')
const {secret} = require("./config")

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController{

    async registration(request, response) {

       try{
            const errors = validationResult(request)
            if(!errors.isEmpty()){
                return response.status(400).json({message: "Registration was failed", errors})
            }
            const{username, password} = request.body
            const candidate = await User.findOne({username})
            if(candidate){
                return response.status(400).json({message: 'That username is already taken'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return response.json({message: 'User was successful registrated'})
       } catch(e){
            console.log(e)
            response.status(400).json({message: 'Registration error'})        
       }

    }

    async login(request, response) {
  
       try{
            const {username, password} = request.body
            const user = await User.findOne({username})
            if(!user){
                return response.status(400).json({message: `User ${username} was not found`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return response.status(400).json({message: 'Password is incorrect'})
            }
            const token = generateAccessToken(user._id, user.roles)
            return response.json({token})
       } catch(e){
            console.log(e)
            response.status(400).json({message: 'Login error'})                        
       }
    }

    async getUsers(request, response){
  
        try{
            const users = await User.find()
            response.json(users)
       } catch(e){
           console.log(e)
       }
    }
}

module.exports = new authController()