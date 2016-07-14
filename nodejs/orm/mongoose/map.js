var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
mongoose.connect('mongodb://localhost/test_map');

var Schema = mongoose.Schema;

var studentSchema = new Schema({
    name: String
});

var lessonSchema = new Schema({
    name: String,
    teacher: {type:ObjectId,ref:"Teacher"}
});

var teacherSchema = new Schema({
    name: String
});

var mapSchema = new Schema({
    lesson: {type:ObjectId,ref:"Lession"},
    student: {type:ObjectId,ref:"Student"}
});

var Student = mongoose.model('Student', studentSchema);
var Lesson = mongoose.model('Lession', lessonSchema);
var Teacher = mongoose.model('Teacher', teacherSchema);
var Map = mongoose.model('Map', mapSchema);


// // 初始化测试数据
// new Student({name:"Student 1"}).save();
// new Student({name:"Student 2"}).save();
// new Student({name:"Student 3"}).save();
// new Teacher({name:"Teacher 1"}).save(function (err,teacher) {
//     new Lesson({name:"Lesson 1",teacher:teacher._id}).save();
//     new Lesson({name:"Lesson 2",teacher:teacher._id}).save();
// });

// Student.findOne({},function (err, student) {
//     Lesson.findOne({},function (err, lesson) {
//         new Map({lesson:lesson._id,student:student._id}).save(function (err, map) {
//             if(err){
//                 console.log(err)
//             }
//             Map.find({})
//                 .populate({
//                     path: 'lesson',
//                     // select: '_id name phone merchant',
//                     // model: 'sales',
//                     populate: {
//                         path: 'teacher'
//                         // select: '_id sname',
//                         // model: 'merchant'
//                     }
//                 })
//                 .populate('student')
//                 .exec(function (err,maps) {
//                     // maps[0].student.name = "new name";
//                     // maps[0].student.save();
//                     console.log(maps[0]);
//                 });
//         });
//     });
// });
//
