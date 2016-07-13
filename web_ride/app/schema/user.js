var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    user: { type: String , unique: true },
    name: { type: String ,default:"新用户" },
    password: { type: String ,default:"123456"},
    role: { type: String,enum:['admin','tester','guest'] ,default:"tester"},
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