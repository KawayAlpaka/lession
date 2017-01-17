var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test_mongoose');
mongoose.connection.on('error', function (err) {
    console.log(err);
});
mongoose.connection.on('connected',function () {
    console.log(arguments);

    var Schema = mongoose.Schema;
    var schema = new Schema({
        name: {type: String, required: true},
        text: {type: String},
        createAt: {type: Date, default: Date.now},
        updateAt: {type: Date, default: Date.now}
    });
    schema.pre("save",function (next) {
        console.log("pre save");
        console.log(arguments);
        next();
    });
    schema.pre("update",function (next) {
        console.log("pre update");
        console.log(this);
        console.log(arguments);
        next();
    });
    schema.pre("validate",function (next) {
        console.log("pre validate");
        console.log(arguments);
        next();
    });

    var Test = mongoose.model('Test', schema);

    var test = new Test();
    test.name = "test1";
    test.save();
    Test.update({name:"test1"},{text:"text1"},{ multi: true },function (err,tests) {
        console.log("update");
        console.log(err);
        console.log(tests);
    });

});