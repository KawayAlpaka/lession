var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var schema = new Schema({
    name: { type: String,required:true },
    introduction:{ type: String },
    creator: { type: ObjectId,ref:"User" },
    members:{
        type:[{
            user:{type:ObjectId,ref:"User"}
        }],
        default: []
    },
    guests:{
        type:[{
            user:{type:ObjectId,ref:"User"}
        }],
        default: []
    },
    pNode: {type: ObjectId,ref:"RobotNode",required:true },
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