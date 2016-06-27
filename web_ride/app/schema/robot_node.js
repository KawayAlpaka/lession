var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var robotNodeSchema = new Schema({
    name: { type: String ,required:true},
    parent: { type: ObjectId ,ref:"RobotNode" },
    type:{ type: String ,enum:['project','suite','case','other'],required:true},
    fileType:{ type:String,enum:['file','dir']},
    fileFormat:{ type:String,enum:['robot','txt']},
    //套件属性
    documentation:{ type:String },
    suiteSetup:{ type:String },
    suiteTeardown:{ type:String },
    testSetup:{ type:String },
    testTeardown:{ type:String },
    testTemplate:{ type:String },
    testTimeout:{ type:String },
    forceTags:{ type:String },
    defaultTags:{ type:String },

    //表格
    form: {
        type:Object,
        default:{
            rows:[{
                cols:[{
                    text:""
                }]
            }]
        }
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

robotNodeSchema.methods.myName = function (cb) {
    return this.name;
};

robotNodeSchema.statics.all = function(cb){
    this.find({},cb);
};

module.exports = robotNodeSchema;