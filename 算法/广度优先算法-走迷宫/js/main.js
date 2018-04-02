var maze = require("./maze");

var walk =  function(maze,start,end){
    // console.log(maze);
    // console.log(start);
    // console.log(end);
    var rowNum = maze.length;
    var colNum = maze[0].length;
    var steps = [];
    // maze.forEach(m => {
    //     steps.push(Object.assign([],m));
    // });
    for(let i=0;i< rowNum;i++){
        let s = [];
        for(let j=0;j<colNum;j++){
            s.push(0);
        }
        steps.push(s);
    }

    console.log(maze);
    // getAroundPoints(maze,{i:0,j:0});
    // getAroundPoints(maze,{i:6,j:5});
    // getAroundPoints(maze,{i:1,j:1});
    // getAroundPoints(maze,{i:1,j:0});
    // getAroundPoints(maze,{i:0,j:1});

    let queue = [];
    queue.push(start);
    
    for(let i=0;i<1000;i++){
        console.log(queue);
        let cPoint = queue.shift();
        if(cPoint && !(cPoint.i == end.i && cPoint.j == end.j) ){
            let aroundPoints = getAroundPoints(maze,cPoint);
            aroundPoints.forEach(point=>{
                if(maze[point.i][point.j] == 0 && //要能走
                    steps[point.i][point.j] == 0 && //没有走过
                    !(point.i == start.i && point.j == start.j) //不是起点
                ){
                    steps[point.i][point.j] = steps[cPoint.i][cPoint.j]+1;
                    queue.push(point);
                }
            });
        }else{
            break;
        }

    }
    console.log(steps);
};

var getAroundPoints = function(maze,point){
    var rowNum = maze.length;
    var colNum = maze[0].length;
    var points = [];
    if(point.i-1>=0){
        points.push({i:point.i-1,j:point.j});
    }
    if(point.i+1<rowNum){
        points.push({i:point.i+1,j:point.j});
    }
    if(point.j-1>=0){
        points.push({i:point.i,j:point.j-1});
    }
    if(point.j+1<colNum){
        points.push({i:point.i,j:point.j+1});
    }
    return points;
};


walk(maze,{i:0,j:0},{i:maze.length-2,j:maze[0].length-2});
walk(maze,{i:0,j:0},{i:maze.length-1,j:maze[0].length-1});