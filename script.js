var world = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,2,1,2,2,2,1,1,1,1,1,2],
    [2,1,2,1,2,2,2,1,2,2,2,1,2],
    [2,1,1,1,0,0,1,1,1,1,1,1,2],
    [2,1,2,1,2,2,2,1,1,1,1,1,2],
    [2,1,2,1,1,0,1,1,2,2,1,1,2],
    [2,0,2,1,2,2,1,1,2,2,1,1,2],
    [2,0,1,1,0,0,1,2,2,1,1,1,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2]
];

var pacman = {x:1, y:1};
var ghost = {x:11, y:7};
var score = 0;
var maxScore = 1000;
var lives = 3;
var maxLives = 10;
var attempts = 1;
var lifeCost = 10;
var caught = false;

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
    document.getElementById('pacman').style.top = pacman.y*60+"px";
    document.getElementById('pacman').style.left = pacman.x*60+"px";
}
function displayGhost() {
    document.getElementById('ghost').style.top = ghost.y*60+"px";
    document.getElementById('ghost').style.left = ghost.x*60+"px";
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
        document.getElementById('score-text').style.marginLeft = '0px';
        document.getElementById('attempts-text').style.marginLeft = '40px';
    } else{
        document.getElementById('score').style.backgroundColor = 'white';
        document.getElementById('score').style.color = 'blue';
        document.getElementById('score').style.fontWeight = 'normal';
        document.getElementById('score-text').innerHTML = 'Score';
        document.getElementById('score-text').style.color = 'blue';
        document.getElementById('score-text').style.fontWeight = 'normal';
        document.getElementById('score-text').style.marginLeft = '40px';
        document.getElementById('attempts-text').style.marginLeft = '55px';
    }
}
function displayAttempts(){document.getElementById('attempts').innerHTML = attempts;}
function displayLives(){document.getElementById('lives').innerHTML = lives;}

function buyLife(){
    if(score>=lifeCost && score<maxScore){
        score = score-lifeCost;
        lives ++;
        if(lives>=maxLives){lives=maxLives};
    }
    displayScore();
    displayLives();
}

function resetCoins(){
    caught = false;
    if(lives > 0){attempts ++;}
    var numCoins = Math.floor(Math.random() * 20) + 25;
    for (var y=1; y<world.length-1; y++){
        for(var x=1; x<world[y].length-1; x++){
            if(world[y][x] != 2){
                world[y][x] = 0;
            }
        }
    }

    for(var i=1; i<=200 && numCoins>0; i++){
        var y = Math.floor(Math.random() * (world.length-2)) + 1;
        var x = Math.floor(Math.random() * (world[0].length-2)) + 1;
        if(world[y][x] != 2 && !(x==pacman.x && y==pacman.y)){
            if(world[y][x] == 1){continue;}
            world[y][x] = 1;
            numCoins--;
        }
    }

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
}

function resetGame(){
    resetCoins();
    score = 0;
    lives = 3;
    attempts = 1;
    caught = false;

    var found = false;
    for (var y=1; y<world.length-2 && found==false; y++){
        for(var x=1; x<world[y].length-2 && found==false; x++){
            if(world[y][x] == 0){
                found = true;
                pacman.y = y;
                pacman.x = x;
            }
        }
    }
    ghost.y = 7;
    ghost.x = 11;
    displayPacman();
    displayGhost();
    displayScore();
    displayAttempts();
    displayLives();
}

displayWorld();
displayPacman();
displayGhost();
displayScore();
displayAttempts();
displayLives();

document.onkeydown = function(e){
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

    if(pacman.y < ghost.y && world[ghost.y-1][ghost.x] != 2 && score<maxScore){
        ghost.y --;
    }
    else if(pacman.y > ghost.y && world[ghost.y+1][ghost.x] != 2 && score<maxScore){
        ghost.y ++;
        if(ghost.y == pacman.y && pacman.x < ghost.x && world[ghost.y][ghost.x-1] != 2){
            ghost.x --;
        }
    }

    if(ghost.y == pacman.y && pacman.x < ghost.x && world[ghost.y][ghost.x-1] != 2 && score<maxScore){
        ghost.x --;
    }
    if(ghost.y == pacman.y && pacman.x > ghost.x && world[ghost.y][ghost.x+1] != 2 && score<maxScore){
        ghost.x ++;
    }

    if(ghost.y==pacman.y && ghost.x==pacman.x && score<maxScore  && caught==false){
        caught=true;
        lives--;
        if(lives<0){lives=0;}
        displayLives();
    }

    if(world[pacman.y][pacman.x] == 1 && lives>0 && score<maxScore){
        world[pacman.y][pacman.x] = 0;
        score++;
        if(score >= maxScore){
            score = maxScore;
        }
        displayWorld();
        displayScore();
    }
    displayPacman();
    displayGhost();
}

