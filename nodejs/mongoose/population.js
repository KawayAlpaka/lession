var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
mongoose.connect('mongodb://localhost:27017/test_mongoose');
mongoose.connection.on('error', function (err) {
    console.log(err);
});
mongoose.connection.on('connected',function () {
    var personSchema = Schema({
        name    : String,
        age     : Number,
        stories : [{ type: ObjectId, ref: 'Story' }]
    });

    var storySchema = Schema({
        _creator : { type: ObjectId, ref: 'Person' },
        title    : String,
        fans     : [{ type: ObjectId, ref: 'Person' }]
    });

    var Story  = mongoose.model('Story', storySchema);
    var Person = mongoose.model('Person', personSchema);


    var aaron = new Person({ name: 'Aaron', age: 100 });
    aaron.save(function (err) {
        if (err) return console.log(err);

        var story1 = new Story({
            title: "Once upon a timex.",
            _creator: aaron._id    // assign the _id from the person
        });
        story1.fans.push(aaron._id);
        story1.fans.push(aaron._id);
        story1.save(function (err) {
            if (err) return console.log(err);
            // thats it!
        });
    });



    Story
        .find({ title: 'Once upon a timex.' })
        .populate('_creator fans')
        .exec(function (err, storys) {
            if (err) return console.log(err);
            // console.log('The creator is %s', story._creator.name);
            console.log('storys:', storys);
            storys.forEach(function (story) {
                console.log("fans:",story.fans);
            });
            // prints "The creator is Aaron"
        });
});