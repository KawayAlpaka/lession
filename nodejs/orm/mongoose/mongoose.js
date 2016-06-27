var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test_mongoose');

console.log(1);

var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title:  String,
    author: { type: String, default: 'hahaha' },
    body: {
        type: [[{
            bd: {type: String, default: 'hahaha'}
        }]],
        default: [[{
            bd: 11
        }], [{
            bd: 22
        }], [{}]]
    },
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs:  Number
    }
});

blogSchema.methods.findSimilarTitles = function (cb) {
    return this.model('Blog').find({ title: this.title }, cb);
};

var Blog = mongoose.model('Blog', blogSchema);

var oneBlog  = new Blog({title:11});

// oneBlog.findSimilarTitles(function (err, dogs) {
//     console.log(dogs.length); // woof
//     console.log(dogs); // woof
// });

oneBlog.save();
