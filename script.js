// Inital maze: 0=empty space, 1=coin, 2=brick
var world = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,2,1,2,2,2,1,1,1,1,1,1,0,0,1,1,1,1,1,2],
    [2,1,2,1,2,2,2,1,2,2,2,1,2,1,1,1,2,1,2,1,2],
    [2,1,1,1,0,1,1,1,1,0,1,1,2,2,2,1,1,1,2,1,2],
    [2,1,2,1,2,2,2,1,1,1,1,0,1,0,1,1,1,1,2,1,2],
    [2,1,2,1,1,1,1,1,2,2,1,2,1,1,1,2,2,2,2,1,2],
    [2,1,2,1,2,2,1,1,2,2,1,1,2,1,1,1,0,1,1,1,2],
    [2,1,1,1,1,0,1,2,2,1,1,1,2,1,2,2,2,2,2,1,2],
    [2,1,0,1,1,1,0,1,1,0,1,2,1,1,2,1,1,1,2,1,2],
    [2,2,2,2,2,1,1,0,1,1,1,1,1,1,2,2,1,2,2,1,2],
    [2,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,0,1,1,2],
    [2,1,2,1,2,1,1,1,2,2,1,1,2,2,1,0,1,1,1,1,2],
    [2,1,2,1,2,1,1,2,2,2,2,1,1,1,1,2,1,2,2,1,2],
    [2,1,1,0,1,1,1,1,1,1,0,0,1,1,1,2,1,1,1,1,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

let worldHeight = world.length;
let worldWidth = world[0].length;
var pacman = {x:1, y:1};
var ghost = {x:worldWidth-2, y:worldHeight-2};
var score = 0;
var maxScore = 5000;
var lives = 3;
var maxLives = 10;
var attempts = 1;
var lifeCost = 250;
var minCoin = 105;
let numCoins = 0;
var more = 40;
var caught = false;
const startingWorld = world.map((e) => {return [...e]});
// console.log("Starting: "+startingWorld);


function displayWorld() {
    var output = '';
    for (var i=0; i<world.length; i++){
        output += "\n<div class='row'>\n"
        for(var j=0; j<world[i].length; j++){
            if(world[i][j] == 2){output += "<div class='brick'></div>";}
            else if(world[i][j] == 1){output += "<div class='coin'></div>";}
            else if(world[i][j] == 0){output += "<div class='empty'></div>";}
        }
        output += "\n</div>"
    }
    document.getElementById('content').innerHTML = output;
}

function displayPacman() {
    document.getElementById('pacman').style.top = pacman.y*50+"px";
    document.getElementById('pacman').style.left = pacman.x*50+"px";
}
function displayGhost() {
    document.getElementById('ghost').style.top = ghost.y*50+"px";
    document.getElementById('ghost').style.left = ghost.x*50+"px";
}
function displayScore(){
    document.getElementById('score').innerHTML = score;
    if(score >= maxScore) {
        document.getElementById('score').style.backgroundColor = 'yellow';
        document.getElementById('score').style.color = 'red';
        document.getElementById('score').style.fontWeight = 'bolder';
        document.getElementById('score-text').innerHTML = 'WINNER!';
        document.getElementById('score-text').style.color = 'red';
        document.getElementById('score-text').style.fontWeight = 'bold';
    } else{
        document.getElementById('score').style.backgroundColor = 'white';
        document.getElementById('score').style.color = 'blue';
        document.getElementById('score').style.fontWeight = 'normal';
        document.getElementById('score-text').innerHTML = 'Score';
        document.getElementById('score-text').style.color = 'blue';
        document.getElementById('score-text').style.fontWeight = 'normal';
    }
}
function displayAttempts(){document.getElementById('attempts').innerHTML = attempts;}
function displayLives(){document.getElementById('lives').innerHTML = lives;}
function displayNumCoins(){
    countCoins();
    document.getElementById('num-coins').innerHTML = numCoins;
}

function buyLife(){
    if(score>=lifeCost && score<maxScore){
        score = score-lifeCost;
        lives ++;
        if(lives>=maxLives){lives=maxLives};
    }
    displayScore();
    displayLives();
}

function countCoins() {
    numCoins = 0;
    for (var y=1; y<world.length-1; y++){
        for(var x=1; x<world[y].length-1; x++){
            if(world[y][x] == 1){
                numCoins++;
            }
        }
    }
}

function resetCoins(){
    console.log("Reset Coins");
    // increment attempts if resetting coins while there are coins remaining
    if(lives > 0 && numCoins>0){
        attempts ++;
        caught = false;
    }
    var coins = Math.floor(Math.random() * more) + minCoin;
    // console.log(coins);
    // clear the maze of coins - blank
    for (var y=1; y<world.length-1; y++){
        for(var x=1; x<world[y].length-1; x++){
            if(world[y][x] != 2){
                world[y][x] = 0;
            }
        }
    }

    // randomly place the determined number of coins in the maze - try 400 times to place all coins
    for(var i=1; i<=400 && coins>0; i++){
        var y = Math.floor(Math.random() * (world.length-2)) + 1;
        var x = Math.floor(Math.random() * (world[0].length-2)) + 1;
        if(world[y][x] != 2 && !(x==pacman.x && y==pacman.y)){
            if(world[y][x] == 1){continue;}
            world[y][x] = 1;
            coins--;
        }
    }

    // starting bottom right place ghost in first location with a coin
    var found = false;
    for (var y=world.length-2; y>0 && found==false; y--){
        for(var x=world[y].length-2; x>0 && found==false; x--){
            if(world[y][x] == 1){
                found = true;
                ghost.y = y;
                ghost.x = x;
            }
        }
    }
    displayWorld();
    displayGhost();
    displayAttempts();
    displayNumCoins();
}

function resetGame(){
    world = startingWorld.map((e)=>{return [...e]})
    // console.log("World: "+world);
    score = 0;
    lives = 3;
    attempts = 1;
    caught = false;

    pacman.y = 1;
    pacman.x = 1;
    // starting bottom right place ghost in first location with a coin
    var found = false;
    for (var y=world.length-2; y>0 && found==false; y--){
        for(var x=world[y].length-2; x>0 && found==false; x--){
            if(world[y][x] == 1){
                found = true;
                ghost.y = y;
                ghost.x = x;
            }
        }
    }
    displayWorld();
    displayPacman();
    displayGhost();
    displayScore();
    displayAttempts();
    displayLives();
    displayNumCoins();
}


//Inital Display of Pacman World
displayWorld();
displayPacman();
displayGhost();
displayScore();
displayAttempts();
displayLives();
displayNumCoins();

document.onkeydown = function(e){
    //count coins - check for zero

    if(e.keyCode == 37 && pacman.x > 0 && caught==false){
        if(world[pacman.y][pacman.x-1] != 2){
            pacman.x --;
        }
    }
    else if(e.keyCode == 38 && pacman.y > 0 && caught==false){
        if(world[pacman.y-1][pacman.x] != 2){
            pacman.y --;
        }
    }
    else if(e.keyCode == 39 && pacman.x < world[pacman.y].length-1 && caught==false){
        if(world[pacman.y][pacman.x+1] != 2){
            pacman.x ++;
        }
    }
    else if(e.keyCode == 40 && pacman.y < world.length-1 && caught==false){
        if(world[pacman.y+1][pacman.x] != 2){
            pacman.y ++;
        }
    }


    // pick a direction for Ghost - looks for walls
    var upOk = false;
    var downOk = false;
    var leftOk = false;
    var rightOk = false;
    let pacmanAbove = false;
    let pacmanBelow = false;
    let pacmanLeft = false;
    let pacmanRight = false;
    let moveGhost = false;

    // allow the Ghost to move approx. 1 in 2 times
    let move = Math.floor(Math.random() * 2);
    move = 1;
    if (move == 1 && numCoins>0){moveGhost = true}
    // console.log("Move Gohst: "+moveGhost);

    if (pacman.y<ghost.y){pacmanAbove=true}
    if (pacman.y>ghost.y){pacmanBelow=true}
    if (pacman.x<ghost.x){pacmanLeft=true}
    if (pacman.x>ghost.x){pacmanRight=true}

    if (world[ghost.y-1][ghost.x] != 2){upOk=true}
    if (world[ghost.y+1][ghost.x] != 2){downOk=true}
    if(((pacmanAbove && upOk) || (pacmanBelow && !downOk && upOk)) && moveGhost){
        ghost.y --;
    }
    else if(((pacmanBelow && downOk) || (pacmanAbove && !upOk && downOk)) && moveGhost){
        ghost.y ++;
    }

    if (world[ghost.y][ghost.x-1] != 2){leftOk=true}
    if (world[ghost.y][ghost.x+1] != 2){rightOk=true}
    if(((pacmanLeft && leftOk) || (pacmanRight && !rightOk && leftOk)) && moveGhost){
        ghost.x --;
    }
    if(((pacmanRight && rightOk) || (pacmanLeft && !leftOk && rightOk)) && moveGhost){
        ghost.x ++;
    }

    // check for ghost catching pacman - same location? - decrement lives
    if(ghost.y==pacman.y && ghost.x==pacman.x && score<maxScore  && caught==false){
        caught=true;
        lives--;
        if(lives<0){lives=0;}
        displayLives();
    }

    //increment score if pacman location has a coin - clear the coin
    if(world[pacman.y][pacman.x] == 1 && lives>0 && score<maxScore){
        world[pacman.y][pacman.x] = 0;
        score++;
        if(score >= maxScore){score = maxScore;}
        numCoins--;
        if(numCoins<0){numCoins=0;}
        displayWorld();
        displayScore();
        displayNumCoins();
    }
    displayPacman();
    displayGhost();
}

