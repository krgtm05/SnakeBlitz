  const playBoard = document.querySelector(".play-board");
  const scoreElemnt = document.querySelector(".score");
  const highScoreElement = document.querySelector(".high-score");
  const controls = document.querySelectorAll(".controls i");

  let foodX ,foodY;
  let snakeX = 5,snakeY =  10;
  let snakeBody = [];
  let velocityX = 0,velocityY = 0;
  let gameOver = false;
  let setIntervalId;
  let score=0;
  // GEtting high score from the local storage
  let highScore = localStorage.getItem("high-score") ||0
  highScoreElement.innerText = `High Score: ${highScore}`;

  const changeFoodPosition = () =>{
    //passing a random 0-30 vakue as food postion

    foodX = Math.floor(Math.random() *30) +1;
    foodY = Math.floor(Math.random() *30) +1;

  }
  const handleGameOver = () =>{
    clearInterval(setIntervalId);
    alert('Game Over. Press OK to play...');
    location.reload();
  }
  const changeDirection = (e) =>{
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }

  }

  controls.forEach(key => {
    key.addEventListener("click", () =>changeDirection({ key: key.dataset.key}))
  })

  const initGame = () =>{
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`
//chaecking if the snake hits the food
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX,foodY]);//pushing food postions to snake body array
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElemnt.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
//shifting forward the values of the elemnt in the snake body by onne
    for (let i = snakeBody.length-1; i > 0; i--){
    snakeBody[i] = snakeBody[i-1];    
    }


snakeBody[0] = [snakeX,snakeY];//setting 1st element of the snake body to current snake position
    //updating the snake's head position based on the current velocity
    snakeX += velocityX;
    snakeY  += velocityY;
   
    if (snakeX <=0 || snakeX >30 || snakeY <=0 ||  snakeY >30 ){
        gameOver = true;
    }

    for(let i =0;i<snakeBody.length;i++){
//adding a div for eacch part of the snake body
        htmlMarkup += `<div class="head " style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`
        if( i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0] ){
            gameOver = true;
        }
    }

    playBoard.innerHTML = htmlMarkup;
  }
  changeFoodPosition();
  setIntervalId = setInterval(() => {
     initGame();
 }, 125);
  document.addEventListener("keydown", changeDirection);