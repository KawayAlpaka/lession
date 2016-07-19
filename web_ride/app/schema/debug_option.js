var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var schema = new Schema({
    name: { type: String ,default:"调试名称" ,required:true },
    creator: { type: ObjectId,ref:"User",required:true },
    way: { type: String,enum:['add param after keyword'] ,default:"add param after keyword"},
    params: {
        type: {
            keyword: String,
            param: String
        },
        default: {}
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

module.exports = schema;