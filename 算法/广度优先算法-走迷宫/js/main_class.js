var maze = require("./maze");
var maze1 = require("./maze1");
var Maze = require("./maze_class");


let start1 = {i:0,j:0};
let end1 = {i:maze.length-2,j:maze[0].length-2};
new Maze(maze,start1,end1).getPath();

let start2 = {i:0,j:0};
let end2 = {i:maze.length-1,j:maze[0].length-1};
new Maze(maze,start2,end2).getPath();

let start3 = {i:0,j:0};
let end3 = {i:maze.length-1,j:maze[0].length-1};
new Maze(maze1,start3,end3).getPath();