var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test_mongoose');

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
    hidden: {type: Boolean,enum:['member','guest']},
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

// oneBlog.save();

// console.log(Blog.schema.paths);
console.log(Blog.schema.tree.hidden.enum);
console.log(Blog.schema);
// console.log(Blog.schema);