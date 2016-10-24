var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var robotNodeSchema = new Schema({
    name: { type: String ,required:true},
    parent: { type: ObjectId ,ref:"RobotNode" },
    type:{ type: String ,enum:['project','suite','case','resource','keyword','variable','other'],required:true},
    fileType:{ type:String,enum:['file','dir','content'],default:'content'},
    fileFormat:{ type:String,enum:['robot','txt']},
    //通用Settings
    documentation:{ type:String },
    //套件Settings
    suiteSetup:{value:{type:String}, comment: {type:String}},
    suiteTeardown:{value:{type:String}, comment: {type:String}},
    testSetup:{value:{type:String}, comment: {type:String}},
    testTeardown:{value:{type:String}, comment: {type:String}},
    testTemplate:{value:{type:String}, comment: {type:String}},
    testTimeout:{value:{type:String}, comment: {type:String}},
    forceTags:{type:[{
        text:String
    }],
        default:[]
    },
    defaultTags:{type:[{
        text:String
    }],
        default:[]
    },
    imports: {
        type: [{
            type: {type: String,enum:['Library','Resource','Variables']},
            from: {type: String,enum:['file','db'],default:'file'},
            path: {type: String},
            resource: {type: ObjectId ,ref:"RobotNode"},
            args: {type: String},
            alias: {type: String},
            comment: {type: String}
        }],
        default: []
    },
    variables:{
        type: [{
            type: {type: String,enum:['Scalar','List','Dict']},
            name: {type: String},
            stringValue:{type: String},
            arrayValue:{type: Array,default:[]},
            columns:{type: Number,default:5},
            comment: {type: String}
        }],
        default: []
    },
    //用例Settings //tags - teardown - timeout 与 case 共用
    setup:{value:{type:String}, comment: {type:String}},
    teardown:{value:{type:String}, comment: {type:String}},
    tags:{type:[{
            text:String
        }],
        default:[]
    },
    template:{value:{type:String}, comment: {type:String}},
    timeout:{value:{type:String}, comment: {type:String}},
    //User Keyword Settings
    arguments:{value:{type:String}, comment: {type:String}},
    returnValue:{value:{type:String}, comment: {type:String}},

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
robotNodeSchema.methods.getParent = function (cb) {
    return this.model('RobotNode').find({ _id: this.parent }, cb);
};
robotNodeSchema.methods.getParentList = function (cb) {
    var list = [];
    var getParentCb = function (err,nodes) {
        if(err){
            cb(list);
            return;
        }
        if(nodes.length == 0){
            // console.log("已经到顶层");
            cb(list);
            return;
        }else{
            list.push(nodes[0]);
            nodes[0].getParent(getParentCb);
        }
    };
    this.getParent(getParentCb);
};

robotNodeSchema.statics.all = function(cb){
    this.find({},cb);
};

module.exports = robotNodeSchema;