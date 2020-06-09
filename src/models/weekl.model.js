const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WeeklySchema = new Schema({
    userID: {
        type:Number,
        required: true,
        unique: true
    },
    list:{
        type: String
    }
})

mongoose.model('weeklist',WeeklySchema)