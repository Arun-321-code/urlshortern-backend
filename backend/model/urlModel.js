const mongoose = require('mongoose')
const urlschema = mongoose.Schema({
    original_url:{
        type:String
    },
    short_url:{
        type:String,
        unique: true, 
    },
    redirect_count:{
        type:Number,
        default:0
    }
},{
    timestamps: true
  })
  
  module.exports = mongoose.model('urlShorten', urlschema);

