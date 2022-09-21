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
]

var pacman = {
    x:1,
    y:1
}
var ghost = {
    x:11,
    y:7
}
var score = 0;
var lives = 1;
var attempts = 1;

function displayWorld() {
    var output = '';
    for (var i=0; i<world.length; i++){
        output += "\n<div class='row'>\n"
        for(var j=0; j<world[i].length; j++){
            if(world[i][j] == 2){
                output += "<div class='brick'></div>";
            }
            else if(world[i][j] == 1){
                output += "<div class='coin'></div>";
            }
            else if(world[i][j] == 0){
                output += "<div class='empty'></div>";
            }
        }
        output += "\n</div>"
    }

    // console.log(output);
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
}

function displayAttempts(){
    document.getElementById('attempts').innerHTML = attempts;
}

function displayLives(){
    document.getElementById('lives').innerHTML = lives;
}

function resetCoins(){
    if(lives > 0){
        attempts ++;
    }
    var numCoins = Math.floor(Math.random() * 20) + 25;
    // console.log(numCoins);

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
            // console.log(y+" , "+x+" , "+ " | "+numCoins);
            if(world[y][x] == 1){
                // console.log("Already a coin");
                continue;
            }
            world[y][x] = 1;
            numCoins--;
        }
    }

    var found = false;
    for (var y=world.length-2; y>0 && found==false; y--){
        for(var x=world[y].length-2; x>0 && found==false; x--){
            if(world[y][x] == 1){
                // console.log("Found a spot");
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
    lives = 1;
    attempts = 1;

    var found = false;
    for (var y=1; y<world.length-2 && found==false; y++){
        for(var x=1; x<world[y].length-2 && found==false; x++){
            if(world[y][x] == 0){
                found = true;
                pacman.y = y;
                pacman.x = x;
                // console.log("Found at: "+y+" , "+x+"  Pacman at: "+pacman.y+" , "+pacman.x);
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
    
    // console.log(e.keyCode);
    if(e.keyCode == 37 && pacman.x > 0){
        if(world[pacman.y][pacman.x-1] != 2){
            pacman.x --;
        }
    }
    else if(e.keyCode == 38 && pacman.y > 0){
        if(world[pacman.y-1][pacman.x] != 2){
            pacman.y --;
        }
    }
    else if(e.keyCode == 39 && pacman.x < world[pacman.y].length-1){
        if(world[pacman.y][pacman.x+1] != 2){
            pacman.x ++;
        }
    }
    else if(e.keyCode == 40 && pacman.y < world.length-1){
        if(world[pacman.y+1][pacman.x] != 2){
            pacman.y ++;
        }
    }

    if(pacman.y < ghost.y && world[ghost.y-1][ghost.x] != 2){
        ghost.y --;
    }
    else if(pacman.y > ghost.y && world[ghost.y+1][ghost.x] != 2){
        ghost.y ++;
        if(ghost.y == pacman.y && pacman.x < ghost.x && world[ghost.y][ghost.x-1] != 2){
            ghost.x --;
        }
    }
    // console.log("Pacman: "+pacman.y+" , "+pacman.x)
    // console.log("Ghost: "+ghost.y+" , "+ghost.x)
    if(ghost.y == pacman.y && pacman.x < ghost.x && world[ghost.y][ghost.x-1] != 2){
        ghost.x --;
    }
    if(ghost.y == pacman.y && pacman.x > ghost.x && world[ghost.y][ghost.x+1] != 2){
        ghost.x ++;
    }

    if(ghost.y==pacman.y && ghost.x==pacman.x){
        lives--;
        // console.log("YOU'RE DEAD");
        if(lives<0){
            lives=0;
        }
        displayLives();
    }

    if(world[pacman.y][pacman.x] == 1 && lives>0){
        world[pacman.y][pacman.x] = 0;
        score++;
        displayWorld();
        displayScore();
    }
    displayPacman();
    displayGhost();
}

