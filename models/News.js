const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    newsImage:{
        type:String,
        required:true
    },
    relatedImage:[
        {
            type:String,
            requried:true
        }
    ],
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:'Categories',
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('News',newsSchema);