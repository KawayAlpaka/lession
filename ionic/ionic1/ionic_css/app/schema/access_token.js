var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    accessToken: { type: String , unique: true ,required: true},
    jsapiTicket: { type: String , unique: true ,required: true},
    meta: {
        createAt: {
            type: Date,
            default: Date.now
        },
        updateAt: {
            type: Date,
            default: Date.now
        }
    }
});


schema.statics.getLast = function (cb) {
    this.find()
        .sort('-meta.createAt')
        .limit(1)
        .exec(function (err, objs) {
            cb(err,objs[0]);
        });
};

module.exports = schema;