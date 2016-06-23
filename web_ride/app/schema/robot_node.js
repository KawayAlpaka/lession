var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var robotNodeSchema = new Schema({
    name: { type: String ,required:true},
    parent: { type: ObjectId ,ref:"RobotNode" },
    type:{ type: String ,enum:['project','suite','case']},
    fileType:{ type:String,enum:['file','dir'],required:true},
    fileFormat:{ type:String,enum:['robot','txt'],required:true},
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

robotNodeSchema.methods.myName = function (cb) {
    return this.name;
};

robotNodeSchema.statics.all = function(cb){
    this.find({},cb);
};

module.exports = robotNodeSchema;