var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var schema = new Schema({
    project: {type:ObjectId,ref:"Project"},
    user: {type:ObjectId,ref:"User"},
    relate: {type:String,enum:['member','guest']},
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