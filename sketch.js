var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,ground_image,invisible_ground;
var man,man_running,man_collided,manImage,car,car_running,car_collided,carImage;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4;
var score;
var gameOver,restart,gameOverImage,restartImage;

function preload(){
ground_image=loadImage("Background.png");
  man_running=loadAnimation("Run (1).png","Run (2).png","Run (3).png");

  car_running=loadAnimation("Walk (1).png");
  car_collided=loadAnimation("Walk (11).png");
  obstacle1=loadImage("obstacle1.png");
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  man_collided=loadImage("Dead (30).png");
  manImage=loadImage("Idle (1).png");
}

function setup() {
 createCanvas(600,500);
  
ground=createSprite(0,0,0,0);
  ground.shapeColor="white";
ground.addImage("ground_image",ground_image);
ground.scale=1.4;
   ground.velocityX=-1
  
  man=createSprite(300,420,600,10);
  man.addAnimation("man_running",man_running);
  man.addImage("man_collided",man_collided);
  man.addImage("manImage",manImage);
  man.scale=0.6;
 // man.velocityX=2;
  man.debug=false;
  man.setCollider("rectangle",0,0,man.width,man.height)
  
  
  car=createSprite(300,20,200,10);
  car.addAnimation("car_running",car_running);
  car.scale=0.2;
  car.debug=false;
  car.velocityX=3;
  car.velocityX=Math.round(random(1,2));
   
  
  invisible_ground=createSprite(300,470,600,10);
  invisible_ground.visible=false;
  
   gameOver = createSprite(300,179);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.7;

  
  restart = createSprite(300,299);
  restart.addImage(restartImage);
  restart.scale=0.6;

  obstaclesGroup=new Group();
  
  score=0;
}

function draw() {
 background("black");
  
 // console.log(man.y);
   //Gravity
man.velocityY = man.velocityY + 0.8;
man.collide(invisible_ground); 
  
   //Gravity
car.velocityY = car.velocityY + 0.8;
car.collide(invisible_ground); 
  
  
   if (gameState===PLAY){
    gameOver.visible=false;
  restart.visible=false;
  score = score + Math.round(getFrameRate()/60);
 
    spawnObstacles();
   if (obstaclesGroup.isTouching(car)){
     car.velocityY=-12;
   }
 ground.velocityX = -(4 + 3* score/100);
     
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
     if(score>0 && score%100 === 0){
     }
    
 if((keyDown("space")&& man.y >= 220)) {
   man.velocityY = -12;
   }  
  
  if (man.isTouching(obstaclesGroup)){
    gameState=END;
   }
  }
else if ( gameState===END) {
  gameOver.visible=true;
  restart.visible=true;
  ground.velocityX = 0;
     man.velocityY = 0
    man.changeImage("manImage",manImage);
     man.changeImage("man_collided",man_collided);
   
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
   obstaclesGroup.setVelocityXEach(0);
  
    if(mousePressedOver(restart)) {
      reset();
    }
} 
  
 
  drawSprites();
  fill("lightpink");
  textSize(20);
   text("Score: "+ score, 500,50);
}

function reset(){
  gameState=PLAY;
gameOver.visible=false;
restart.visible=false;
man.changeAnimation("man_running",man_running);
man.changeAnimation("car_running",car_running);  
  obstaclesGroup.destroyEach();
  score=0;
  car.x=50;
}

function spawnObstacles() {
   if (frameCount % 60 === 0){
   var obstacle = createSprite(600,450,10,40);
   obstacle.velocityX = -6 ;//+ score/100);
   
    //generate random obstacles
   var rand = Math.round(random(1,6));
     obstacle.addImage(obstacle1);
   obstacle.scale=0.1;
      obstaclesGroup.add(obstacle);
    obstacle.debug=false;
obstacle.setCollider("circle",0,0,1);
   }
     
}

