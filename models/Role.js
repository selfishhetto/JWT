const {Schema, model} = require('mongoose')

const Role = new Schema( // описываем как пользователь будет храниться в базе данных объектом 
    {
        value: {type: String, unique: true, default: "USER"},
        
    }

)

module.exports = model('Role', Role)