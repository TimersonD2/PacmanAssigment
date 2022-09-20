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
var score = 0;

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

function displayScore(){
    document.getElementById('score').innerHTML = score;
}

function resetCoins(){
    var numCoins = Math.floor(Math.random() * 20) + 25;
    // console.log(numCoins);
    for(var i=1; i<=200 && numCoins>0; i++){
        var y = Math.floor(Math.random() * (world.length-2)) + 1;
        var x = Math.floor(Math.random() * (world[0].length-2)) + 1;
        if(world[y][x] != 2 && !(x==pacman.x && y==pacman.y)){
            world[y][x] = 1;
            numCoins--;
            // console.log(y+" , "+x+" , "+ " | "+pacman.y+" , "+pacman.x+" | "+numCoins);
        }
    }
    displayWorld();
}

displayWorld();
displayPacman();
displayScore();

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

    if(world[pacman.y][pacman.x] == 1){
        world[pacman.y][pacman.x] = 0;
        score += 1;
        displayWorld();
        displayScore();
    }
    displayPacman();
}

