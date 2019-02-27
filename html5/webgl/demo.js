var canvas = document.getElementById("myCanvas");
var gl = canvas.getContext("webgl");
var program = gl.createProgram();

var VSHADER_SOURCE,FSHADER_SOURCE;

VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main () {
    gl_Position = a_Position;
  }
`;
FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0,0.0,1.0);
  }
`;

var vertexShader,fragmentShader;

function createShader (gl,sourceCode,type) {
  var shader= gl.createShader(type);
  gl.shaderSource(shader,sourceCode);
  gl.compileShader(shader);
  return shader;
}

vertexShader = createShader(gl, VSHADER_SOURCE, gl.VERTEX_SHADER);

fragmentShader = createShader(gl, FSHADER_SOURCE, gl.FRAGMENT_SHADER);

var vertexShader,fragmentShader;
gl.attachShader(program,vertexShader);
gl.attachShader(program,fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);
gl.program = program;

function initVertexBuffers (gl) {
  var vertices = new Float32Array([
    0,0.5,-0.5,-0.5,0.5,-0.5
  ]);
  var n = 3;
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
  var a_Position = gl.getAttribLocation(gl.program,"a_Position");
  gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
  gl.enableVertexAttribArray(a_Position);
  return n;
}

var n = initVertexBuffers(gl);

gl.clearColor(0,0,0,1);
function draw () {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES,0,n);
}
draw();