let width = 1520;
let height = 730;

let slabX = 700;
let slabY = 660;
let slabWidth = 170;
let slabHeight = 40;

let circleX = 700;
let circleY = 400;
let circleRadius = 30;

let circle2X = 500;
let circle2Y = 400;

let moveBallX = 4;
let moveBallY = 4;
let moveBall2X = -4;
let moveBall2Y = -4;

let ballSpeed = 4;
let ball2Speed = 4;

let brickX = 180;
let brickY = 100;
let tempBrickX = brickX;
let tempBrickY = brickY;

let brickWidth = 80;
let brickHeight = 40;

let brickArray = [];
let rows;
let columns;

let lives = 3;
let score = 0;
let totalScore = 0;

let start = false;
let gameOn = false;
let completed = false;
let gamePaused = false;

let playAgainButton;
let proceedButton;
let pauseButton;
let resumeButton;
let restartButton;

let colors = [];

let stars = [];
let starRadius = 5;

let level1 = true;
let level2 = false;
let level3 = false;
let level4 = false;
let levelend = false;

let hitBrickSound;   
let hitSlabSound;
let gameOverSound;
let gameWonSound;

let gameOverSoundPlayed = false;
let gameWonSoundPlayed = false;

let gameMusic;
let gameMusicIsPlaying = true;

let prevMoveBallX;
let prevMoveBallY;
let prevBallSpeed;


let balls = [];
let slab;


function setup() {
  createCanvas(width, height);
  background(0, 0, 0);

  //drawGrid();
  drawLevelOneGrid();
  //drawLevelFourGrid();
  createPlayAgainButton();
  createProceedButton();
  createPauseButton();
  createResumeButton();
  createRestartButton();
  playAgainButton.hide();
  proceedButton.hide();

  // Starry bg
  for (let i = 0; i < 150; i++) {
    fill(255, 255, 255);
    stars.push({
      starX: random(width),
      starY: random(height),
    });
  }
  hitBrickSound = new Audio('assets/brickhit.mp3');
  hitSlabSound = new Audio('assets/slabbounce.mp3');
  gameOverSound = new Audio('assets/gameover.mp3');
  gameWonSound = new Audio('assets/gamewon.mp3');
  gameMusic = new Audio('assets/gamemusic.mp3');
  gameMusic.volume = 0.2;
  balls[0] = new Ball(circleX,circleY,circleRadius);
  balls[1] = new Ball(circle2X,circle2Y,circleRadius);
  slab = new Slab(slabX,slabY,slabWidth,slabHeight);

}

function draw() {
  background(0, 0, 0);
  if(!gamePaused)
  {
    if(start && gameOn)
    {
  gameMusic.play();
    }
    else{
      gameMusic.currentTime = 0;
      gameMusic.pause();
    }
  }
  else{
    gameMusic.pause();
  }
  pauseButton.show();
  resumeButton.show();
  restartButton.show();

  // starry bg
  for (let i = 0; i < 150; i++) {
    fill(255, 255, 255);
    circle(stars[i].starX, stars[i].starY, starRadius);
  }

  // SCORE TEXT, LIVES TEXT
  textSize(32);
  fill(0,255,0);
  text("SCORE: " + score, 40, 70);
  fill(255,0,0);
  text("LIVES: " + lives, 40, 110);

  // BALL
 // drawBall();
  balls[0].show();
  if(level4)
  {
    balls[1].show();

  }

  // SLAB
  //drawSlab();
  slab.show();

  // DRAWING BRICKS

  if(level1)
  {
    textSize(32);
    fill(255,255,255);
    text("LEVEL 1",700, 50);
    drawLevelOneBricks();
    //drawLevelFourBricks();
  }
  else if(level2)
  {
    textSize(32);
    fill(255,255,255);
    text("LEVEL 2",700, 50);
    drawLevelTwoBricks();
  }
  else if(level3){
    textSize(32);
    fill(255,255,255);
    text("LEVEL 3",700, 50);
    drawLevelThreeBricks();
  }
  else if(level4){
    textSize(32);
    fill(255,255,255);
    text("LEVEL 4",700, 50);
    drawLevelFourBricks();
  }

  if (!gameOn && !start) {
    fill(0,0,255);
    rectMode(CORNER);
    rect(540,180,420,315,15);

    fill(0,0,0);
    rectMode(CORNER);
    rect(545,185,410,305,15);

    fill("orange");
    rect(555,190,brickWidth,brickHeight);
    text("3 Hits (3pts)",720,220);

    fill("#4c00b0");
    rect(555,240,brickWidth,brickHeight);
    text("2 Hits (2pts)",720,270);

    fill("#cccccc");
    rect(555,290,brickWidth,brickHeight);
    text("1 Hit (1pt)",720,320);

    fill(0,142,204);
    rect(555,340,brickWidth,brickHeight);
    text("1 Hit (1pt)",720,370);

    fill(0,160,0);
    rect(555,390,brickWidth,brickHeight);
    text("Special Brick(5 pts)",660,420);

    fill(160,0,0);
    rect(555,440,brickWidth,brickHeight);
    text("Slab Size PUP (1 pt)",660,470);
    
    fill(255, 255, 255);
    textSize(32);
    text("PRESS SPACE TO START THE GAME", 480, 535);
  }

  // Starting the game with space key
  if (keyCode === 32 && !start) {
    gameOn = true;
    start = true;
  }

  if ((gameOn && levelend ===false && start) && (level1||level2||level3||level4) && completed ===false) {
    playAgainButton.hide();
    proceedButton.hide();

    // BALL MOVEMENT 
    ballMovementAndSlabCollision(balls[0],balls[1]);
    // if (balls[0].x <= 0) {
    //   moveBallX = ballSpeed;
    // }
    // if (balls[0].x + 30 >= width) {
    //   moveBallX = -ballSpeed;
    // }

    // if (balls[0].y <= 0) {
    //   moveBallY = ballSpeed;
    // }
    // if (balls[0].y >= height) {
    //   moveBallY = -ballSpeed;
    // }

    // // BALL COLLISION WITH SLAB
    // if (balls[0].y + balls[0].r >= slab.y &&balls[0].x + balls[0].r >= slab.x 
    //   && balls[0].x -balls[0].r <= slab.x + slab.w && balls[0].y + balls[0].r <= slab.y + slab.h) {
    //   moveBallY = -ballSpeed;
    //   hitSlabSound.play();
    // }

    // balls[0].x += moveBallX;
    // balls[0].y += moveBallY;

    // SLAB MOVEMENT
    if (slab.x >= 0) {
      if (keyIsDown(LEFT_ARROW)) {
        slab.x -= 20;
      }
    }

    if (slab.x + 150 < width) {
      if (keyIsDown(RIGHT_ARROW)) {
        slab.x += 20;
      }
    }

    // BRICK COLLISION LOGIC
    fill(60, 40, 100);


    if(level1)
    {
      rows = 2;
      columns = 8;
    }
    else if(level2)
    {
      rows = 3;
      columns = 8;
    }
    else if(level3)
    {
      rows = 4;
      columns = 15;
    }
    else if(level4)
      {
        rows = 4;
        columns = 13;
      }

      ballBrickCollison(rows,columns,balls[0],balls[1]);

    // for (let i = 0; i < rows && !brickHit; i++) {
    //   for (let j = 0; j < columns && !brickHit; j++) {
    //     let brick = brickArray[i][j];
        

    //     if (brick) {
        
    //       // Ball and Brick Boundaries
    //       let ballLeft = balls[0].x - 30;
    //       let ballRight = balls[0].x + 30;
    //       let ballTop = balls[0].y - 30;
    //       let ballBottom = balls[0].y + 30;

    //       let brickLeft = brick.x;
    //       let brickRight = brick.x + brick.w;
    //       let brickTop = brick.y;
    //       let brickBottom = brick.y + brick.h;

    //       // Ball collision with brick
    //       if ( ballRight >= brickLeft &&ballLeft <= brickRight && ballBottom >= brickTop &&ballTop <= brickBottom )
    //        {
    //         brick.hp -= 1;
    //         if(brick.slabPUP)
    //           {
    //             slab.w += 30;
    //           }
    //         if (brick.hp <= 0) {
             
    //             score += brick.scorePoints;
              
    //           // else{
    //           //   score++;
    //           // }
    //           brickArray[i][j] = null;
             
    //         }

    //         // collision side ,ball direction
    //         let fromTop = ballBottom - brickTop;
    //         let fromBottom = brickBottom - ballTop;
    //         let fromLeft = ballRight - brickLeft;
    //         let fromRight = brickRight - ballLeft;

    //         let minCollision = Math.min(fromTop, fromBottom, fromLeft, fromRight); 

    //         if (minCollision === fromTop || minCollision === fromBottom) {
    //           moveBallY *= -1;
    //         } else {
    //           moveBallX *= -1;
    //         }

    //         brickHit = true; 
    //         hitBrickSound.currentTime = 0;
    //         hitBrickSound.play();
    //       }
    //     }
    //   }
    // }

    if (balls[0].y > slabY + 50) {
      lives--;
      if(lives <= 0)
      {
        gameOn = false;
      }
      else{
        balls[0].y = 300;
      }
      
    }
    if(level4)
    {
      if (balls[1].y > slabY + 50) {
        lives--;
        if(lives <= 0)
        {
          gameOn = false;
        }
        else{
          balls[1].y = 300;
        }
      }
        
    }
    if(level1 && allLevelOneBricksDestroyed())
    {
      level1=false;
      level2 = true;
      levelend = true;
      balls[0].y = 300;
      balls[0].x = random(width);
      totalScore += score;
      score = 0;
      tempBrickX = brickX;
      tempBrickY = brickY;
      brickArray = [];
      drawLevelTwoGrid();
      drawLevelTwoBricks();
      lives = 3;
      ballSpeed += 1;
      slab.w = 160;

      proceedButton.show();
    }

    if(level2 && allLevelTwoBricksDestroyed())
      {
        level2=false;
        level3 = true;
        levelend = true;
        balls[0].y = 300;
        balls[0].x = random(width);
        slab.w = 150;
        totalScore+=score;
        score = 0;
        tempBrickX = brickX;
        tempBrickY = brickY;
        brickArray = [];
        drawLevelThreeGrid();
        drawLevelThreeBricks();
        lives = 3;
        ballSpeed+=1;
        proceedButton.show();
      }

      if (level3 && allLevelThreeBricksDestroyed())
      {

        level3 = false;
        level4 = true;
        levelend = true;
        balls[0].y = 300;
        balls[0].x = random(width);
        slab.w = 140;
        totalScore+=score;
        score = 0;
        tempBrickX = brickX;
        tempBrickY = brickY;
        brickArray = [];
        drawLevelFourGrid();
        drawLevelFourBricks();
        lives = 3;
        ballSpeed+=1;
        proceedButton.show();

        // level3 = false;
        // completed = true;
        // totalScore+=score;
        // gameOn = false;
        // brickArray = [];


      }
      if(level4 && allLevelFourBricksDestroyed())
      {
        level4 = false;
        completed = true;
        totalScore += score;
        gameOn = false;
        brickArray = [];
      }
  } 
  else if(gameOn === false){
    if (start === true && completed ===false) {
      // GAME OVER
      if(gameOverSoundPlayed ===false)
      {
        gameOverSound.play();
        gameOverSoundPlayed = true;

      }
      
     
      noStroke();
      rectMode(CORNER);
      fill(255, 255, 255);
      rect(440, 100, 630, 310,15);
      rectMode(CORNER);
      fill(0, 0, 0);
      rect(450, 110, 610, 290,15);
      fill(255, 0, 0);
      textSize(60);
      text("GAME OVER", 570, 170);

      
      fill(0, 255, 0);
      text("LEVEL SCORE: " + score, 525, 250);
      
      fill(0, 255, 0);
      text("TOTAL SCORE: " + totalScore, 525, 350);
      stroke(1);
      playAgainButton.show();
    }
    else if(completed)
    {

      if(gameWonSoundPlayed ===false)
      {
        gameWonSound.play();
        gameWonSoundPlayed = true;
      }
      rectMode(CORNER);;
      fill(255,255,255);
      rect(130,90,1300,300,15);
      rectMode(CORNER);
      fill(0,0,0);
      rect(140,100,1280,280,15);

      fill(255, 0, 0);
      textSize(60);
      text("CONGRATULATIONS YOU BEAT THE GAME!", 150, 170);

      fill(0, 255, 0);
      text("LEVEL SCORE: " + score, 530, 270);
      text("TOTAL SCORE: " + totalScore, 530, 370);
      stroke(1);
      playAgainButton.show();

    }
  }
}


function drawLevelOneGrid() 
{
  let hp = 1;

  for (let i = 0; i < 2; i++) {
    brickArray[i] = [];
    let tempBrickX = brickX;
    let sp = 1;
    let specialSP = 5;
    for (let j = 0; j < 8; j++) {
      if(j ===4)
      {
        tempBrickX += 500;
        //brickArray[i][j] = { brickX: tempBrickX, brickY: tempBrickY,brickWidth,brickHeight,brickHealth: hp,special:false,slabPUP: false,scorePoints: sp };
        brickArray[i][j] = new Brick(tempBrickX,tempBrickY,brickWidth,brickHeight,hp,false,sp);
      }
      else if(i ===0 && j ===2)
      {
        //brickArray[i][j] = { brickX: tempBrickX, brickY: tempBrickY,brickWidth,brickHeight,brickHealth: hp,special:true,slabPUP: false };
        brickArray[i][j] = new Brick(tempBrickX,tempBrickY,brickWidth,brickHeight,hp,false,specialSP);
      }
      else if(i===0 && j===6)
      {
        //brickArray[i][j] = { brickX: tempBrickX, brickY: tempBrickY,brickWidth,brickHeight,brickHealth: hp,special:false,slabPUP: true,scorePoints: 1 };
        brickArray[i][j] = new Brick(tempBrickX,tempBrickY,brickWidth,brickHeight,hp,true,sp);
      }
      else{
      //brickArray[i][j] = { brickX: tempBrickX, brickY: tempBrickY,brickWidth,brickHeight,brickHealth: hp,special:false,slabPUP: false,scorePoints: sp };
      brickArray[i][j] = new Brick(tempBrickX,tempBrickY,brickWidth,brickHeight,hp,false,sp);
      
      }
      tempBrickX += brickWidth;
      
    }
    tempBrickY += brickHeight;
    //hp--;
    
    
  }
}

function drawLevelOneBricks()
{
  colors = ["#cccccc", "#008ECC"];
  let color = 0;
  fill(60, 40, 100);
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 8; j++) {
      let brick = brickArray[i][j];
      if (brick) {

        if(i ===0 && j===2)
        {
          let brightness =30 + brick.hp *15;

        fill(0,160,0);
        rect(brick.x, brick.y, brick.w, brick.h);
        
        fill(255, 255, 255, brightness);
        rect(brick.x, brick.y, brick.w, brick.h);
        }
        else if(i===0 & j===6)
        {
          let brightness =30 + brick.hp *15;

        fill(160,0,0);
        rect(brick.x, brick.y, brick.w, brick.h);
        
        fill(255, 255, 255, brightness);
        rect(brick.x, brick.y, brick.w, brick.h);
        }
        else{

        let brightness =30 + brick.hp *15;

        fill(colors[color]);
        rect(brick.x, brick.y, brick.w, brick.h);
        
        fill(255, 255, 255, brightness);
        rect(brick.x, brick.y, brick.w, brick.h);
        }
     
      }
    }
    color++;
  }              
}

function drawLevelTwoGrid() 
{
  let hp = 3;
  let sp = 3;
  for (let i = 0; i < 3; i++) {
    brickArray[i] = [];
    let tempBrickX = brickX;
    for (let j = 0; j < 8; j++) {
      if(j ===4)
      {
        tempBrickX += 500;
       // brickArray[i][j] = { brickX: tempBrickX, brickY: tempBrickY,brickWidth,brickHeight,brickHealth: 1,special:false,scorePoints: sp };
        brickArray[i][j] = new Brick(tempBrickX,tempBrickY,brickWidth,brickHeight,1,false,sp);
      }
      else if(i ===1 && j===1)
      {
       // brickArray[i][j] = { brickX: tempBrickX, brickY: tempBrickY,brickWidth,brickHeight,brickHealth: 1,special:true };
        brickArray[i][j] = new Brick(tempBrickX,tempBrickY,brickWidth,brickHeight,1,false,5);
      }
      else if(i ===2 && j===2)
      {
        //brickArray[i][j] = { brickX: tempBrickX, brickY: tempBrickY,brickWidth,brickHeight,brickHealth: 1,special:false,slabPUP: true,scorePoints:1 };
        brickArray[i][j] = new Brick(tempBrickX,tempBrickY,brickWidth,brickHeight,1,true,1);
      }
      else if(i ===3 && j ===6)
      {
        //brickArray[i][j] = { brickX: tempBrickX, brickY: tempBrickY,brickWidth,brickHeight,brickHealth: 1,special:true };
        brickArray[i][j] = new Brick(tempBrickX,tempBrickY,brickWidth,brickHeight,1,false,5);
      }
      else{
     // brickArray[i][j] = { brickX: tempBrickX, brickY: tempBrickY,brickWidth,brickHeight,brickHealth: hp,special:false,scorePoints: sp };
      brickArray[i][j] = new Brick(tempBrickX,tempBrickY,brickWidth,brickHeight,hp,false,sp);
      
      }
      tempBrickX += brickWidth;
    }
    hp--;
    if(i===1)
    {
      tempBrickY += 200;
    }
    else{
    tempBrickY += brickHeight;
    }
    if(i>=2)
      {
        sp = 1;
      }
      else{
        sp--;
      }
  }
}

function drawLevelTwoBricks()
{
  colors = ["orange", "#4c00b0", "#cccccc", "#008ECC"];
  let color = 0;
  fill(60, 40, 100);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 8; j++) {
      let brick = brickArray[i][j];
      if (brick) {

        if((i ===1 && j ===1) || (i ===3 && j===6) )
        {
          let brightness =30 + brick.hp *15;

        fill(0,160,0);
        rect(brick.x, brick.y, brick.w, brick.h);
        
        fill(255, 255, 255, brightness);
        rect(brick.x, brick.y, brick.w, brick.h);

        }
        else if(i===2 && j===2)
        {
          let brightness =30 + brick.hp *15;

          fill(160,0,0);
          rect(brick.x, brick.y, brick.w, brick.h);
          
          fill(255, 255, 255, brightness);
          rect(brick.x, brick.y, brick.w, brick.h);
        }
        else{
          let brightness =30 + brick.hp*15;

        fill(colors[color]);
        rect(brick.x, brick.y, brick.w, brick.h);
        
        fill(255, 255, 255, brightness);
        rect(brick.x, brick.y, brick.w, brick.h);

        }

        
      }
    }
    color++;
  }
}
function drawLevelThreeGrid() 
{
  let hp = 3;
  let sp = 3;
  for (let i = 0; i < 4; i++) {
    brickArray[i] = [];
    let tempBrickX = brickX;
    for (let j = 0; j < 15; j++) {
      if(i ===2 && (j===2 || j ===4 || j===6 || j===8 || j===11 || j===13))
      {
        
     // brickArray[i][j] = { brickX: tempBrickX, brickY: tempBrickY,brickWidth,brickHeight,brickHealth: 1,special:true };
      brickArray[i][j] = new Brick(tempBrickX,tempBrickY,brickWidth,brickHeight,1,false,5);
      tempBrickX += brickWidth;
      }
    
      else
      {
    
    //  brickArray[i][j] = { brickX: tempBrickX, brickY: tempBrickY,brickWidth,brickHeight,brickHealth: hp,special:false,scorePoints: sp };
      brickArray[i][j] = new Brick(tempBrickX,tempBrickY,brickWidth,brickHeight,hp,false,sp);
      tempBrickX += brickWidth;
      }
    }
    if(i>=2)
    {
      sp = 1;
    }
    else{
      sp--;
    }
    hp--;
    tempBrickY += brickHeight;
  }
}

function drawLevelThreeBricks() 
{
  colors = ["orange", "#4c00b0", "#cccccc", "#008ECC"];
  let color = 0;
  fill(60, 40, 100);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 15; j++) {
      let brick = brickArray[i][j];
      if (brick) {

        if(i ===2 && (j===2 || j ===4 || j===6 || j===8 || j===11 || j===13))
          {
            let brightness =30 + brick.hp *15;

            fill(0,160,0);
            rect(brick.x, brick.y, brick.w, brick.h);
            
            fill(255, 255, 255, brightness);
            rect(brick.x, brick.y, brick.w, brick.h);
          }
          else{

        let brightness =30 + brick.hp *15;

        fill(colors[color]);
        rect(brick.x, brick.y, brick.w, brick.h);
        
        fill(255, 255, 255, brightness);
        rect(brick.x, brick.y, brick.w, brick.h);
          }
      }
    }
    color++;
  }
}

function drawLevelFourGrid() 
{
  let hp = 3;
  let sp = 3;
  for (let i = 0; i < 4; i++) {
    brickArray[i] = [];
    let tempBrickX = brickX;
    for (let j = 0; j < 13; j++) {
      if(j ===2 || j===8)
      {
        tempBrickX += brickWidth;
        brickArray[i][j] = new Brick(tempBrickX,tempBrickY,brickWidth,brickHeight,1,false,5);
      }
      else if(i ===2 && j ===5)
      {
        brickArray[i][j] = new Brick(tempBrickX,tempBrickY,brickWidth,brickHeight,1,true,1);
      }
      else{
        brickArray[i][j] = new Brick(tempBrickX,tempBrickY,brickWidth,brickHeight,hp,false,sp);
      }
      tempBrickX += brickWidth;
    }
    if(i>=2)
    {
      sp = 1;
    }
    else{
      sp--;
    }
    hp--;
    if(i ===2)
    {
      hp = 1;
    }
    if(i ===1 ||  i ===3)
    {
    tempBrickY += brickHeight *2;
    }
    else
    {
      tempBrickY += brickHeight;
    }
    if(i===2)
    {
      tempBrickY += brickHeight;
    }
  }
}

function drawLevelFourBricks() 
{
  colors = ["orange", "#4c00b0", "#cccccc", "#008ECC"];
  let color = 0;
  fill(60, 40, 100);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 13; j++) {
      let brick = brickArray[i][j];
      if (brick) {

        if(j ===2 || j===8)
          {
            let brightness =30 + brick.hp *15;
            fill(0,160,0);
            rect(brick.x, brick.y, brick.w, brick.h);

            fill(255, 255, 255, brightness);
            rect(brick.x, brick.y, brick.w, brick.h);
          }
          else if(i ===2 && j ===5)
          {
             let brightness =30 + brick.hp *15;
            fill(160,0,0);
            rect(brick.x, brick.y, brick.w, brick.h);
            
            fill(255, 255, 255, brightness);
            rect(brick.x, brick.y, brick.w, brick.h);
          }
          else{
            let brightness =30 + brick.hp *15;
            fill(colors[color]);
            rect(brick.x, brick.y, brick.w, brick.h);
            
            fill(255, 255, 255, brightness);
            rect(brick.x, brick.y, brick.w, brick.h);
          }
        }
    }
    color++;
  }
}



function createPlayAgainButton() 
{
  playAgainButton = createButton("PLAY AGAIN?");
  playAgainButton.position(650, 420);
  playAgainButton.size(200, 150);

  playAgainButton.mousePressed(() => {
    balls[0].y = 300;
    balls[0].x = random(width);
    score = 0;
    tempBrickX = brickX;
    tempBrickY = brickY;
    lives = 3;
    brickArray = [];
    drawLevelOneGrid();
    drawLevelOneBricks();
    level1 = true;
    level2 = false;
    level3 = false;
    level4 = false;
    gameOn = false;
    start = false;
    totalScore = 0;
    ballSpeed = 4;
    completed = false;
    levelend = false;
    slab.w = 170;
    gameOverSoundPlayed = false;
    gameWonSoundPlayed = false;
    playAgainButton.hide();
    slab.x = 700;
  },50);
}
function createProceedButton()
{
  proceedButton = createButton("START NEXT LEVEL");
  proceedButton.position(650, 200);
  proceedButton.size(200, 150);

  proceedButton.mousePressed(() => {
    levelend = false;
    proceedButton.hide();
  });
}

function createPauseButton()
{
  pauseButton = createButton("PAUSE");
  pauseButton.position(1200,30);
  pauseButton.size(100,50);

  pauseButton.mousePressed(() => {
    if(!gamePaused)
    {
    prevMoveBallX = moveBallX;
    prevMoveBallY = moveBallY;
    prevBallSpeed = ballSpeed;
    moveBallX = 0;
    moveBallY = 0;
    ballSpeed = 0;
    gamePaused = true;
    }
    
  })
}

function createResumeButton()
{
  resumeButton = createButton("RESUME");
  resumeButton.position(1300,30);
  resumeButton.size(100,50);

  resumeButton.mousePressed(() => {
    if(gamePaused)
    {
    moveBallX = prevMoveBallX;
    moveBallY = prevMoveBallY;
    ballSpeed = prevBallSpeed;
    gamePaused = false;
    }
    
  })
}

function createRestartButton()
{
  restartButton = createButton("RESTART");
  restartButton.position(1400, 30);
  restartButton.size(100, 50);

  restartButton.mousePressed(() => {
     balls[0].y = 300;
    balls[0].x = random(width);
    score = 0;
    tempBrickX = brickX;
    tempBrickY = brickY;
    lives = 3;
    brickArray = [];
    drawLevelOneGrid();
    drawLevelOneBricks();
    level1 = true;
    level2 = false;
    level3 = false;
    level4 = false;
    gameOn = false;
    start = false;
    totalScore = 0;
    completed = false;
    levelend = false;
    slab.w = 170;
    gameOverSoundPlayed = false;
    gameWonSoundPlayed = false;
    playAgainButton.hide();
    gamePaused = false;
    moveBallX = 4;
    moveBallY = 4;
    ballSpeed = 4;
    slab.x = 700;
    proceedButton.hide();
  },100);
}

function allLevelOneBricksDestroyed()
{
  let count = 0;
  for(let i =0;i<2;i++)
  { 
    for(let j=0;j<8;j++)
    {
      if(brickArray[i][j] === null)
      {
        count++;
      }
    }

  }
  if(count === 16)
  {
    return true;
  }
  else{
    return false;
  }
}

function allLevelTwoBricksDestroyed()
{
  let count = 0;
  for(let i =0;i<3;i++)
  { 
    for(let j=0;j<8;j++)
    {
      if(brickArray[i][j] === null)
      {
        count++;
      }
    }

  }
  if(count === 24)
  {
    return true;
  }
  else{
    return false;
  }
}

function allLevelThreeBricksDestroyed()
{
  let count = 0;
  for(let i =0;i<4;i++)
  { 
    for(let j=0;j<15;j++)
    {
      if(brickArray[i][j] === null)
      {
        count++;
      }
    }

  }
  if(count === 60)
  {
    return true;
  }
  else{
    return false;
  }
}

function allLevelFourBricksDestroyed()
{
  let count = 0;
  for(let i =0;i<4;i++)
  { 
    for(let j=0;j<13;j++)
    {
      if(brickArray[i][j] === null)
      {
        count++;
      }
    }

  }
  if(count === 52)
  {
    return true;
  }
  else{
    return false;
  }
}

class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xSpeed = 3;
    this.ySpeed = -3;
  }
  
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  
  checkEdges() {
    if (this.x - this.r < 0 || this.x + this.r > width) {
      this.xSpeed *= -1;
    }
    if (this.y - this.r < 0) {
      this.ySpeed *= -1;
    }
  }
  
  checkPaddle(paddle) {
    if (
      this.y + this.r > paddle.y &&
      this.x > paddle.x &&
      this.x < paddle.x + paddle.w
    ) {
      this.ySpeed *= -1;
    }
  }
  
  checkBricks(bricks) {
    for (let brick of bricks) {
      if (
        this.x > brick.x &&
        this.x < brick.x + brick.w &&
        this.y > brick.y &&
        this.y < brick.y + brick.h
      ) {
        this.ySpeed *= -1;
        brick.hit = true;
      }
    }
  }
  
  show() {
    //fill(255);
    //circle(this.x, this.y, this.r * 2);

    let gradient = drawingContext.createRadialGradient(this.x, this.y, 10, this.x, this.y, this.r);
    gradient.addColorStop(0, 'white');       
    gradient.addColorStop(0.3, 'lightblue'); 
    gradient.addColorStop(1, 'blue');        

    drawingContext.fillStyle = gradient;
    ellipse(this.x, this.y,this.r * 2);
  }
}

class Slab {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = 0;
  }
  
  move(speed) {
    this.speed = speed;
  }
  
  update() {
    this.x += this.speed;
    this.x = constrain(this.x, 0, width - this.w);
  }
  
  show() {
    let gradient = drawingContext.createLinearGradient(this.x, this.y, this.x, this.y + this.h);
    gradient.addColorStop(0, '#FF6347');  
    gradient.addColorStop(1, 'red');  

    drawingContext.fillStyle = gradient;
    rectMode(CORNER);
    let cornerRadius = 20;
    rect(this.x, this.y, this.w, this.h, cornerRadius);
  }
}

class Brick {
  constructor(x, y, w, h,hp,slabPUP,scorePoints) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.hit = false;
    this.scorePoints = scorePoints;
    this.slabPUP = slabPUP;
    this.hp = hp;

  }
  
  show() {
    if (!this.hit) {
      fill(255, 0, 0);
      rect(this.x, this.y, this.w, this.h);
    }
  }
}

function ballMovementAndSlabCollision(ball,ball2)
{
  if (ball.x <= 0) {
    moveBallX = ballSpeed;
  }
  if (ball.x + 30 >= width) {
    moveBallX = -ballSpeed;
  }

  if (ball.y <= 10) {
    moveBallY = ballSpeed;
  }
  if (ball.y >= height) {
    moveBallY = -ballSpeed;
  }
  

  // BALL COLLISION WITH SLAB
  if (ball.y + ball.r >= slab.y &&ball.x + ball.r >= slab.x 
    && ball.x -ball.r <= slab.x + slab.w && ball.y + ball.r <= slab.y + slab.h) {
    moveBallY = -ballSpeed;
    hitSlabSound.play();
  }
  ball.x += moveBallX;
  ball.y += moveBallY;

  if(level4)
  {
    if (ball2.x <= 0) {
      moveBall2X = ball2Speed;
    }
    if (ball2.x + 30 >= width) {
      moveBall2X = -ball2Speed;
    }
  
    if (ball2.y <= 0) {
      moveBall2Y = ball2Speed;
    }
    if (ball2.y >= height) {
      moveBallY = -ball2Speed;
    }
    
  
    // BALL COLLISION WITH SLAB
    if (ball2.y + ball2.r >= slab.y &&ball2.x + ball2.r >= slab.x 
      && ball2.x -ball2.r <= slab.x + slab.w && ball2.y + ball2.r <= slab.y + slab.h) {
      moveBall2Y = -ball2Speed;
      hitSlabSound.play();
    }
    ball2.x += moveBall2X;
    ball2.y += moveBall2Y;
  }
}

function ballBrickCollison(rows,columns,ball,ball2)
{

  let brickHit = false; 
  let brickHit2 = false;
  for (let i = 0; i < rows && !brickHit; i++) {
    for (let j = 0; j < columns && !brickHit; j++) {
      let brick = brickArray[i][j];
      

      if (brick) {
      
        // Ball and Brick Boundaries
        let ballLeft = ball.x - 30;
        let ballRight = ball.x + 30;
        let ballTop = ball.y - 30;
        let ballBottom = ball.y + 30;

        let brickLeft = brick.x;
        let brickRight = brick.x + brick.w;
        let brickTop = brick.y;
        let brickBottom = brick.y + brick.h;

        // Ball collision with brick
        if ( ballRight >= brickLeft &&ballLeft <= brickRight && ballBottom >= brickTop &&ballTop <= brickBottom )
         {
          brick.hp -= 1;
          if(brick.slabPUP)
            {
              slab.w += 30;
            }
          if (brick.hp <= 0) {
           
              score += brick.scorePoints;
            
            // else{
            //   score++;
            // }
            brickArray[i][j] = null;
           
          }

          // collision side ,ball direction
          let fromTop = ballBottom - brickTop;
          let fromBottom = brickBottom - ballTop;
          let fromLeft = ballRight - brickLeft;
          let fromRight = brickRight - ballLeft;

          let minCollision = Math.min(fromTop, fromBottom, fromLeft, fromRight); 

          if (minCollision === fromTop || minCollision === fromBottom) {
            moveBallY *= -1;
          } else {
            moveBallX *= -1;
          }

          brickHit = true; 
          hitBrickSound.currentTime = 0;
          hitBrickSound.play();

      }
    }
  }
}
if(level4)
{

for (let i = 0; i < rows && !brickHit2; i++) {
  for (let j = 0; j < columns && !brickHit2; j++) {
    let brick = brickArray[i][j];
    

    if (brick) {
    
      // Ball and Brick Boundaries
      let ball2Left = ball2.x - 30;
let ball2Right = ball2.x + 30;
let ball2Top = ball2.y - 30;
let ball2Bottom = ball2.y + 30;

let brickLeft2 = brick.x;
let brickRight2 = brick.x + brick.w;
let brickTop2 = brick.y;
let brickBottom2 = brick.y + brick.h;

// Ball collision with brick
if ( ball2Right >= brickLeft2 &&ball2Left <= brickRight2 && ball2Bottom >= brickTop2 &&ball2Top <= brickBottom2 )
 {
  brick.hp -= 1;
  if(brick.slabPUP)
    {
      slab.w += 30;
    }
  if (brick.hp <= 0) {
   
      score += brick.scorePoints;
    
    // else{
    //   score++;
    // }
    brickArray[i][j] = null;
   
  }

  // collision side ,ball direction
  let fromTop2 = ball2Bottom - brickTop2;
  let fromBottom2 = brickBottom2- ball2Top;
  let fromLeft2 = ball2Right - brickLeft2;
  let fromRight2 = brickRight2 - ball2Left;

  let minCollision = Math.min(fromTop2, fromBottom2, fromLeft2, fromRight2); 

  if (minCollision === fromTop2 || minCollision === fromBottom2) {
    moveBall2Y *= -1;
  } else {
    moveBall2X *= -1;
  }

  brickHit2 = true; 
  hitBrickSound.currentTime = 0;
  hitBrickSound.play();

    }
  }
}
}
}


}