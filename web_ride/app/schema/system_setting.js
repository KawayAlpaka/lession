var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    key: {type: String, unique: true, default: "new setting"},
    value: {type: String},
    instruction: {type: String},
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

schema.statics.getSetting = function (key, cb) {
    this.findOne({ key: key }, function (err,systemSetting) {
        cb(err,systemSetting);
    });
};

module.exports = schema;