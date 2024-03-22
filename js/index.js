
 let directions = {x: 0, y: 0};  // variable for directions 

 const foodSound = new Audio('music/food.mp3');
 const gameOverSound = new Audio('music/gameover.mp3');
 const moveSound = new Audio('music/move.mp3');
 const gameSound = new Audio('music/music.mp3');


let speed = 8;

let gameScore = 0;

// let HighScore = localStorage.getItem("highScore");

let lastPaintTime = 0;

let snakeArray = [
    {x: 17, y: 15}
];

food = {x: 6, y: 7};

function main(currentTime) {

    window.requestAnimationFrame(main); // FOR LOOPS , FOR RENDERING AGAIN AND AGAIN , OR FOR PAINTING AGAIN AND AGAIN

    if((currentTime - lastPaintTime)/1000 < 1/speed){   // TO REDUCE FPS
        return;
    }

    lastPaintTime = currentTime;

    gameEngine();
}


//logic for collision
function isCollapse(snake) {
    // If snake collides with itself 
    for (let i = 1; i < snakeArray.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // if snake collides with wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}




//Game Logic
function gameEngine(){
    // Part 1: Updating the snake array & Food
    gameSound.play();
    // IF COLLSION OCCURS
    if(isCollapse(snakeArray)){

        gameOverSound.play();

        gameSound.pause();

        directions =  {x: 0, y: 0}; 

        alert("Game Is Over. Press Any Key To Play Again!!");

        snakeArray = [{x: 13, y: 15}];

        gameSound.play();

        gameScore = 0; 
        scoreBox.innerHTML = "Score: " + gameScore;

    }

    // When You Have Eaten The Food Increment the gameScore and regenerate the food

    if(snakeArray[0].y === food.y && snakeArray[0].x ===food.x){

        gameScore += 1; //increment game score by 1
        foodSound.play(); //play food sound

        
        if(gameScore>hiscoreval){
            hiscoreval = gameScore;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HighScore: " + hiscoreval;
        }

        scoreBox.innerHTML = "Score: " + gameScore;

        snakeArray.unshift({x: snakeArray[0].x + directions.x, y: snakeArray[0].y + directions.y});

        let a = 3;
        let b = 17;

        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())} // To Generate a number between 3 and 17
    }

    // Moving the snake
    for (let i = snakeArray.length - 2; i>=0; i--) { 

        snakeArray[i+1] = {...snakeArray[i]};

    }

    snakeArray[0].x += directions.x;
    snakeArray[0].y += directions.y;

  
    // Displaying  the snake

    board.innerHTML = "";

    snakeArray.forEach((ee, ind)=>{

        snakeElement = document.createElement('div');

        snakeElement.style.gridRowStart = ee.y;  //  origin of grid is above in case of javascript

        snakeElement.style.gridColumnStart = ee.x;

        if(ind === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement); //put this element on the board

    });


    // Display the food // same process as displaying the snake
    foodElement = document.createElement('div');

    foodElement.style.gridRowStart = food.y;

    foodElement.style.gridColumnStart = food.x;

    foodElement.classList.add('food');

    board.appendChild(foodElement);


}

gameSound.play();



let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HighScore: " + hiscore;
}
window.requestAnimationFrame(main);

window.addEventListener('keydown', e =>{    //This event triggers whenever you presses a key

    directions = {x: 0, y: 1} //Game starts

    moveSound.play();

    switch (e.key) {

        case "ArrowUp":
            console.log("ArrowUp"); // To diplay which button is pressed
            directions.x = 0;
            directions.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            directions.x = 0;
            directions.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            directions.x = -1;
            directions.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            directions.x = 1;
            directions.y = 0;
            break;

        default:
            break;
    }

});