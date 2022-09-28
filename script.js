// Inital maze: 0=empty space, 1=coin, 2=brick
var world1 = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,0,2],
    [2,1,2,1,2,1,2,1,2,2,2,2,2,1,2,1,2,1,2,1,2],
    [2,1,1,1,2,1,2,0,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,2,2,1,2,1,2,1,2,2,2,2,2,0,2,1,2,1,2,1,2],
    [2,2,2,1,2,1,2,1,1,0,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,2,1,2,0,2,1,2,2,0,1,2,1,2,1,2,1,2,1,2],
    [2,1,1,1,1,0,1,1,2,0,0,1,2,1,1,1,1,0,1,0,2],
    [2,1,2,1,2,1,2,1,2,2,1,2,2,1,2,2,2,2,2,1,2],
    [2,1,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,2],
    [2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,2,0,2,2,1,2],
    [2,1,1,0,1,1,1,1,2,1,2,1,2,1,1,0,1,1,1,0,2],
    [2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,2,2,2,2,1,2],
    [2,0,1,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

var world2 = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,2,1,2,2,2,1,1,1,1,1,1,0,0,1,1,1,1,1,2],
    [2,1,2,1,2,2,2,1,2,2,2,1,2,1,1,1,2,1,2,1,2],
    [2,1,1,1,0,1,1,1,2,2,1,1,2,2,2,1,1,1,2,1,2],
    [2,1,2,1,2,2,2,1,1,2,1,0,1,0,1,1,1,1,2,1,2],
    [2,1,2,1,1,1,1,1,1,1,1,2,1,1,1,2,2,2,2,1,2],
    [2,1,2,1,2,2,2,1,2,2,1,1,2,1,1,1,0,1,1,0,2],
    [2,0,1,1,1,0,1,1,2,0,1,2,1,1,2,2,1,2,2,1,2],
    [2,1,2,1,2,1,2,1,2,2,1,1,2,1,2,1,1,1,2,1,2],
    [2,2,2,2,2,1,1,0,1,1,1,2,1,0,2,1,1,1,2,1,2],
    [2,1,1,1,1,1,2,2,2,2,1,1,2,1,2,2,2,2,2,1,2],
    [2,1,2,1,2,1,1,2,2,1,1,2,1,1,1,0,1,1,1,1,2],
    [2,1,2,1,2,1,2,2,2,2,1,1,2,1,2,1,2,1,2,1,2],
    [2,1,1,0,1,1,1,1,1,1,0,0,1,1,2,1,2,1,1,1,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];
var world3 = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,1,1,2,2,2,1,1,1,1,2,2,1,1,1,0,1,1,1,2],
    [2,1,2,1,2,2,2,1,2,2,0,1,2,1,2,1,2,1,2,1,2],
    [2,1,1,1,0,1,1,1,1,1,1,1,1,1,2,1,1,1,2,1,2],
    [2,2,2,1,2,2,0,2,2,2,2,2,2,0,1,1,2,1,1,0,2],
    [2,2,2,1,2,2,1,2,1,1,1,1,2,1,2,2,2,2,2,1,2],
    [2,1,2,1,2,2,1,2,1,2,2,1,2,1,1,1,0,1,1,1,2],
    [2,1,1,1,1,1,1,2,1,1,2,1,2,1,2,2,2,1,2,1,2],
    [2,2,2,1,1,2,1,2,2,2,2,1,2,1,2,1,1,1,2,1,2],
    [2,2,2,2,0,1,1,0,1,1,1,1,1,1,2,2,2,2,2,1,2],
    [2,1,1,1,1,1,2,1,2,2,1,1,1,1,1,1,1,0,1,0,2],
    [2,1,2,1,2,1,2,1,2,1,1,2,2,2,1,2,1,2,2,1,2],
    [2,1,2,2,2,1,2,1,2,2,1,1,1,2,1,1,1,2,2,1,2],
    [2,1,1,0,1,1,1,1,1,1,0,1,1,1,1,2,1,1,1,1,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];


// define variables
let world = world1.map((e) => {return [...e]});
let startingWorld = world1.map((e) => {return [...e]});

const worldHeight = world.length;
const worldWidth = world[0].length;
let pacman = {x:1, y:1};
let ghost = {x:worldWidth-2, y:worldHeight-2};
let cherry = {x:9, y:7};
let score = 0;
const maxScore = 5000;
let lives = 3;
const maxLives = 10;
let attempts = 1;
const lifeCost = 250;
const minCoin = 120;
const moreCoins = 30;
let numCoins = 0;
let caught = false;
let easyMode = false;
let maze = 1;
let ateCherry = false;

function changeMaze() {
    maze++;
    if(maze>3){maze=1;}
    if (maze == 1) {
        cherry = {x:9, y:7};
        world = world1.map((e)=>{return [...e]})
        startingWorld = world1.map((e)=>{return [...e]})
    } else if (maze == 2) {
        cherry = {x:12, y:9};
        world = world2.map((e)=>{return [...e]})
        startingWorld = world2.map((e)=>{return [...e]})
    } else if (maze ==3) {
        cherry = {x:9, y:7};
        world = world3.map((e)=>{return [...e]})
        startingWorld = world3.map((e)=>{return [...e]})
    } else {
        world = world1.map((e)=>{return [...e]})
        startingWorld = world1.map((e)=>{return [...e]})
    }
    // console.log("Starting: "+startingWorld);
    resetGame();
}

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
function displayCherry() {
    if(!ateCherry){
        document.getElementById('cherry').hidden = false;
        document.getElementById('cherry').style.top = cherry.y*50+"px";
        document.getElementById('cherry').style.left = cherry.x*50+"px";
    } else if (ateCherry) {
        document.getElementById('cherry').hidden = true;
    }
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

//Inital Display of Pacman World
displayWorld();
displayPacman();
displayGhost();
displayScore();
displayAttempts();
displayLives();
displayNumCoins();
displayCherry();

// update current game mode
function updateMode(){
    easyMode = mode.checked;
    // console.log(easyMode);
}


// if enough points available add a life and decrement score
function buyLife(){
    if(score>=lifeCost && score<maxScore){
        score = score-lifeCost;
        lives ++;
        if(lives>=maxLives){lives=maxLives};
    }
    displayScore();
    displayLives();
}

// count the current number of coins in the maze
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

// reset the maze with a random number of coins - min coins + random more coins
// Pacman remains in current position Ghost moves to bottom right somewhere on a coin
function resetCoins(){
    console.log("Reset Coins");
    // increment attempts if resetting coins while there are coins remaining
    if(lives > 0 && numCoins>0){
        attempts ++;
        caught = false;
    }
    var coins = Math.floor(Math.random() * moreCoins) + minCoin;
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
    for(var i=1; i<=500 && coins>0; i++){
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

// Reset the game statistics, place Pacman top left Ghost bottom right, reset coin maze to default
function resetGame(){
    //set current coin maze to the original maze
    world = startingWorld.map((e)=>{return [...e]})
    // console.log("World: "+world);
    score = 0;
    lives = 3;
    attempts = 1;
    caught = false;
    ateCherry = false;

    // place Pacman top left
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
    displayCherry();
    displayScore();
    displayAttempts();
    displayLives();
    displayNumCoins();
}

document.onkeydown = function(e){
    // move Pacman using key code if desired location is not a brick and hasn't been caught by Ghost
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


    // check for available directions for Ghost - looks for walls
    let upOk = false;
    let downOk = false;
    let leftOk = false;
    let rightOk = false;
    let pacmanAbove = false;
    let pacmanBelow = false;
    let pacmanLeft = false;
    let pacmanRight = false;
    let moveGhost = false;

    let move = 0;
    // if Easy Mode is ON move Ghost approx every other keypress ELSE move every keypress
    if (easyMode == true){move = Math.floor(Math.random() * 2);} else{move = 1;}

    if (move == 1 && numCoins>0){moveGhost = true}
    // console.log("Move Gohst: "+moveGhost);

    // check if Pacman left, right, above, below Ghost
    if (pacman.y<ghost.y){pacmanAbove=true}
    if (pacman.y>ghost.y){pacmanBelow=true}
    if (pacman.x<ghost.x){pacmanLeft=true}
    if (pacman.x>ghost.x){pacmanRight=true}

    // first move up or down based on Pacman and bricks
    if (world[ghost.y-1][ghost.x] != 2){upOk=true}
    if (world[ghost.y+1][ghost.x] != 2){downOk=true}
    if(((pacmanAbove && upOk) || (pacmanBelow && !downOk && upOk)) && moveGhost){
        ghost.y --;
    }
    else if(((pacmanBelow && downOk) || (pacmanAbove && !upOk && downOk)) && moveGhost){
        ghost.y ++;
    }

    // second move left or right based on Pacman and bricks
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

    if(pacman.y == cherry.y && pacman.x == cherry.x && score<maxScore && ateCherry==false){
        score=score+20;
        ateCherry = true;
        if(score >= maxScore){score = maxScore;}
        displayWorld();
        displayCherry();
        displayScore();
    }

    displayPacman();
    displayGhost();
}

