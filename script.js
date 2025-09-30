const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const color1 = 'red';
const color2 = 'blue';  
const squareSize =20;
const numSquareX = canvas.width / squareSize;
const numSquareY = canvas.height / squareSize;
const maxSpeed = 5;
let square=[];

for(let i=0; i<numSquareX; i++){
    square[i]=[];
    for(let j=0; j<numSquareY; j++){
        square[i][j]= i <numSquareX/2 ? color1:color2;}}

const ball1={
    x:canvas.width/4, 
    y:canvas.height/2,
    size:10,
    color:color2,
    dx:2,
    dy: Math.random() * 5 - 1,
    speed:0,
}
const ball2={
    x:canvas.width/(4/3), 
    y:canvas.height/2,
    size:10,
    color:color1,
    dx:-2,
    dy: Math.random() * 5 - 1,
    speed:0,
}
gameLoop();
function drawBall(x, y, color){
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
}
function drawSquare(){
    for(let i=0; i<numSquareX; i++){
        for(let j=0; j<numSquareY; j++){
            ctx.fillStyle = square[i][j];
            ctx.fillRect(i*squareSize, j*squareSize, squareSize, squareSize);
        }
    }
}
function moveBall(ball1,ball2){
    ball1.x += ball1.dx;
    ball2.x += ball2.dx;
    ball1.y += ball1.dy;
    ball2.y += ball2.dy;
}
function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSquare();
    drawBall(ball1.x, ball1.y, ball1.color);
    drawBall(ball2.x, ball2.y, ball2.color);
    moveBall(ball1, ball2);
    collisionDetection(ball1);
    collisionDetection(ball2);
    changeSquareColor(ball1);
    changeSquareColor(ball2);
    requestAnimationFrame(gameLoop);
}
function collisionDetection(ball){
    if(ball.x + ball.size > canvas.width || ball.x < 0){
        ball.dx *= -1;
    }
    if(ball.y + ball.size > canvas.height || ball.y <0){
        ball.dy *= -1;
    }
    const i = Math.floor(ball.x / squareSize);
    const j = Math.floor(ball.y / squareSize);
    if(i >= 0 && i < numSquareX && j >= 0 && j < numSquareY){
        if(square[i][j] === ball.color){
            ball.dx *= -1;
            ball.dy *= -1;
        }
    }
    
}
function changeSquareColor(ball){
    const i = Math.floor(ball.x / squareSize);
    const j = Math.floor(ball.y / squareSize);
    if(i >= 0 && i < numSquareX && j >= 0 && j < numSquareY){
        if(square[i][j] === ball.color){
            ball.dx *= 1.2;
            ball.dy *= 1.2;
            const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
            if(speed > maxSpeed){
                const scale = maxSpeed / speed;
                ball.dx *= scale;
                ball.dy *= scale;
            }
            square[i][j] = ball.color === color1 ? color2 : color1;
            ctx.fillStyle =square[i][j];
            ctx.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);}
    }
}