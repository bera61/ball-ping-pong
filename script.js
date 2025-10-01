const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.querySelector('.score');

const color1 = 'red';
const color2 = 'blue';  
const squareSize =20;
const numSquareX = canvas.width / squareSize;
const numSquareY = canvas.height / squareSize;
const maxSpeed = 5;
let square=[];
let score1=0;
let score2=0;

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
    score1 = 0; // <-- Ekle
    score2 = 0;
    for(let i=0; i<numSquareX; i++){
        for(let j=0; j<numSquareY; j++){
            ctx.fillStyle = square[i][j];
            ctx.fillRect(i*squareSize, j*squareSize, squareSize, squareSize);
            if(square[i][j] === color1){
                score1++;
            }else{
                score2++;}
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
    scoreDisplay.innerHTML = `score1: ${score1} - score2: ${score2}`;
}
function collisionDetection(ball){
    // Sadece kenar çarpışmalarını kontrol et
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
        ball.dx *= -1;
    }
    if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0){
        ball.dy *= -1;
    }
}
function changeSquareColor(ball){
    for(let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4){
        const checkX = ball.x + Math.cos(angle) * (ball.size / 2);
        const checkY = ball.y + Math.sin(angle) * (ball.size / 2);

        const i = Math.floor(checkX / squareSize);
        const j = Math.floor(checkY / squareSize);

        if(i >= 0 && i < numSquareX && j >= 0 && j < numSquareY){
            if(square[i][j] === ball.color){
                // Yön değiştir
                ball.dx = -ball.dx;
                ball.dy = -ball.dy;
                // Kare rengini değiştir
                square[i][j] = (ball.color === color1) ? color2 : color1;
                break; // Aynı anda birden fazla kareye çarpmayı engelle
            }
        }
    }
}
