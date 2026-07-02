const {Schema, model} = require('mongoose')

const User = new Schema( // описываем как пользователь будет храниться в базе данных объектом 
    {
        username: {type: String, unique: true, required: true},
        password: {type: String, unique: true, required: true},
        roles: [{type: String, ref: 'Role'}]
    }

)

module.exports = model('User', User)