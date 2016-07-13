var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
mongoose.connect('mongodb://localhost/test_mongoose');

var Schema = mongoose.Schema;

var studentSchema = new Schema({
    name: String
});

var lessonSchema = new Schema({
    name: String
});

var mapSchema = new Schema({
    lesson: {type:ObjectId,ref:"Lession"},
    student: {type:ObjectId,ref:"Student"}
});

var Student = mongoose.model('Student', studentSchema);
var Lesson = mongoose.model('Lession', lessonSchema);
var Map = mongoose.model('Map', mapSchema);


// // 初始化测试数据
// new Student({name:"Student 1"}).save();
// new Student({name:"Student 2"}).save();
// new Student({name:"Student 3"}).save();
// new Lesson({name:"Lesson 1"}).save();
// new Lesson({name:"Lesson 2"}).save();

Student.findOne({},function (err, student) {
    Lesson.findOne({},function (err, lesson) {
        new Map({lesson:lesson._id,student:student._id}).save(function (err, map) {
            if(err){
                console.log(err)
            }
            Map.find({})
                .populate('lesson')
                .populate('student')
                .exec(function (err,maps) {
                    console.log(maps[2]);
                });
        });
    });
});

