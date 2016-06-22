var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    user: { type: String,unique: true },
    name: { type: String },
    password: { type: String },
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

userSchema.methods.myName = function (cb) {
    return this.name;
};

module.exports = userSchema;