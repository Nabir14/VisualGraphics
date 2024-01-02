/*
VisualGL is an open-source web game engine.
VisualGL currently supports 2D rendering.
VisualGL is written by MD Mushfique Farhan Nabir.
VisualGL is also contributed by:
N/A
*/

// Function For Creating A Shader
function newShader(gl, shaderType, shaderSource)
{
  // Shader variable
  var shader = gl.createShader(shaderType);
  
  // Providing the shader source
  gl.shaderSource(shader, shaderSource);
  
  // Compiling the shader
  gl.compileShader(shader);
  
  // Declaring a variable to check if the shader is complete
  var complete = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  
  // Checking if the shader is complete
  if(complete)
  {
    // Returning the shader if its complete
    return shader;
  }
  
  // Printing shader info to console
  console.log(gl.getShaderInfoLog(shader));
  
  // Deleting The Shader
  gl.deleteShader(shader);
}

// Function for creating a new program
function newProgram(gl, vertexShader, fragmentShader)
{
  // Program variable
  var program = gl.createProgram();
  
  // Attaching the vertex shader to the program
  gl.attachShader(program, vertexShader);
  
  // Attaching the fragment shader to the program
  gl.attachShader(program, fragmentShader);
  
  // linking the program
  gl.linkProgram(program);
  
  // Declaring A variable for checking if the program is complete
  var complete = gl.getProgramParameter(program, gl.LINK_STATUS);
  
  // Checking if the program is complete
  if(complete)
  {
    // Returning the program if its complete
    return program;
  }
  
  // Printing the program information
  console.log(gl.getProgramInfoLog(program));
  
  // Deleting the program
  gl.deleteProgram(program);
}

// Function for resizing the canvas
function resizeCanvas(canvas)
{
  // Declaring a variable for getting the display width
  const displayWidth = canvas.clientWidth;
  
  // Declaring a variable for getting the display height
  const displayHeight = canvas.clientHeight;
  
  // Declaring a variable for checking if it needs resizing
  const doResize = canvas.width !== displayWidth || canvas.height !== displayHeight;
  
  // Checking if it needs resize
  if(doResize)
  {
    // Resizing the width if its needed to be resized
    canvas.width == displayWidth;
    
    // Resizing the height if its needed to be resized
    canvas.height == displayHeight;
  }
  else
  {
    // Returning the variable if it didn't needed any resizing
    return doResize;
  }
}

// Function For Creating A New Triangle
function newTriangle(gl, x, y, width, height)
{
  // Declaring variables for triangle data
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  
  // Triangle data
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x1, y1,
    x2, y2,
    x1, y2,
    ]), gl.STATIC_DRAW);
}

// Function For Creating A New Rectangle
function newRect(gl, x, y, width, height)
{
  // Declaring variables for rectangle data
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  
  // Rectangle data
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x1, y1,
    x2, y2,
    x1, y2,
    x2, y2,
    x1, y1,
    x2, y1,
    ]), gl.STATIC_DRAW);
}

// Main function
function main()
{
  // Getting the canvas
  var canvas = document.querySelector("#canvas");
  
  // Declaring a variable for checking if the user has webgl support
  var gl = canvas.getContext("webgl");
  
  // Checking if the user doesn't have webgl support
  if(!gl)
  {
    // Printing if the user doesn't have webgl support
    console.log("webgl context error");
  }
  else
  {
    // Printing if the user has webgl support
    console.log("webgl context success");
  }
  
  // Getting the vertex shader
  var vertexShaderSource = document.querySelector("#vertexShader").text;
  
  // Getting the fragment shader
  var fragmentShaderSource = document.querySelector("#fragmentShader").text;
  
  // Creating the vertex shader
  var vertexShader = newShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  
  // Creating the fragment shader
  var fragmentShader = newShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  
  // Creating the program
  var program = newProgram(gl, vertexShader, fragmentShader);
  
  // Getting the attribute position location
  var posAttributeLocation = gl.getAttribLocation(program, "atrribPos");
  
  // Getting the resolution uniform location
  var resUniformLocation = gl.getUniformLocation(program, "uniRes");
  
  // Getting color uniform location
  var colorUniformLocation = gl.getUniformLocation(program, "uniColor");
  
  // Creating the position buffer
  var posBuffer = gl.createBuffer();
  
  // Binding the position buffer to array buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  
  // Resizing the canvas
  resizeCanvas(gl.canvas);
  
  // Setting GL viewport
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  
  // Setting clear color for canvas
  gl.clearColor(Math.random(), Math.random(), Math.random(), 1);
  
  // Clearing the canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  // Telling GL to use program
  gl.useProgram(program);
  
  // Enabling Vertex Attribute Array
  gl.enableVertexAttribArray(gl.posAttributeLocation);
  
  // Setting the resolution
  gl.uniform2f(resUniformLocation, gl.canvas.width, gl.canvas.height);
  
  // Binding Position Buffer to Array Buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  
  // Setting size
  var size = 2;
  
  // Setting type
  var type = gl.FLOAT;
  
  // Not normalizing
  var normalize = false;
  
  // Setting stride
  var stride = 0;
  
  // Setting offset
  var offset = 0;
  
  // Providing the values to Vertex Attribute Pointer
  gl.vertexAttribPointer(posBuffer, size, type, normalize, stride, offset);
  
  // Creating a new Triangle
  newTriangle(gl, 64, 64, 128, 128);
  
  // Setting the color for objects
  gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
  
  // Drawing arrays
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}