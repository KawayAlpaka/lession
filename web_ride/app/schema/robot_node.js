var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var robotNodeSchema = new Schema({
    name: { type: String ,required:true},
    parent: { type: ObjectId ,ref:"RobotNode" },
    type:{ type: String ,enum:['project','suite','case','other'],required:true},
    fileType:{ type:String,enum:['file','dir','content'],default:'content'},
    fileFormat:{ type:String,enum:['robot','txt']},
    //通用Settings
    documentation:{ type:String },
    //套件Settings
    suiteSetup:{ type:String },
    suiteTeardown:{ type:String },
    testSetup:{ type:String },
    testTeardown:{ type:String },
    testTemplate:{ type:String },
    testTimeout:{ type:String },
    forceTags:{ type:String },
    defaultTags:{ type:String },
    //用例Settings
    setup:{
        value:{
            type:String
        },
        comment: {
            type:String
        }
    },
    teardown:{
        value:{
            type:String
        },
        comment: {
            type:String
        }
    },
    tags:{ type:String },
    timeout:{
        value:{
            type:String
        },
        comment: {
            type:String
        }
    },
    template:{
        value:{
            type:String
        },
        comment: {
            type:String
        }
    },
    //表格
    form: {
        type:Object,
        default:{
            rows:[{
                cells:[{
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
robotNodeSchema.methods.children = function (cb) {
    return this.model('RobotNode').find({ parent: this._id }, cb);
};

robotNodeSchema.statics.all = function(cb){
    this.find({},cb);
};

module.exports = robotNodeSchema;