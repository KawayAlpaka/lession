class Maze{
    constructor(maze,start,end){
        this.maze = maze;
        this.start = start;
        this.end = end;
    }
    getAroundPoints(point){
        var rowNum = this.maze.length;
        var colNum = this.maze[0].length;
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

    walk(){

        var rowNum = this.maze.length;
        var colNum = this.maze[0].length;
        var steps = [];

        for(let i=0;i< rowNum;i++){
            let s = [];
            for(let j=0;j<colNum;j++){
                s.push(0);
            }
            steps.push(s);
        }
    
        let queue = [];
        queue.push(this.start);
        for(let i=0;i<1000;i++){
            let cPoint = queue.shift();
            if(cPoint && !(cPoint.i == this.end.i && cPoint.j == this.end.j) ){
                let aroundPoints = this.getAroundPoints(cPoint);
                aroundPoints.forEach(point=>{
                    if(this.maze[point.i][point.j] == 0 && //要能走
                        steps[point.i][point.j] == 0 && //没有走过
                        !(point.i == this.start.i && point.j == this.start.j) //不是起点
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
        this.steps = steps;
        return steps;
    };
    getPath(){
        if(!this.steps){
            this.walk();
        }
        var paths = [];
        let cPoint = this.end;
        paths.unshift(cPoint);
        for(let i=0;i<10000;i++){
            let long = this.steps[cPoint.i][cPoint.j];
            let points = this.getAroundPoints(cPoint);
            let _point = null;
            points.forEach(point=>{
                if(long == 1){
                    if(point.i == this.start.i && point.j == this.start.j){
                        _point = point;
                    }
                }else if(this.steps[point.i][point.j] == long-1){
                    _point = point;
                }
            });
            if(_point){
                cPoint = _point;
                paths.unshift(_point);
            }else{
                break;
            }
        }
        console.log(paths);
        return paths;
    };
}

module.exports = Maze;