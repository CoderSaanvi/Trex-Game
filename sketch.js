var trex,trex_collided,trex_running,ground,groundImage,invisibleGround,cloudImg,cloud,CloudsGroup,ObstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,trex_collided

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var count

var gameOver,gameOverImg,restart,restartImg

function preload() {
  trex_running = loadAnimation('trex1.png','trex3.png','trex4.png');
  groundImage = loadImage('ground2.png');
  cloudImg = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trex_collided = loadImage("trex_collided.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,40,10);
  trex.addAnimation("trex1",trex_running);
  trex.scale = 0.5;
  trex.addAnimation("trex2",trex_collided);
  
  count = 0;
  
  ground = createSprite(300,180,600,20);
  ground.addImage(groundImage);
  
  invisibleGround = createSprite(300,190,600,5);
  invisibleGround.visible = false;
  
  CloudsGroup = createGroup();
  ObstaclesGroup = createGroup();
  
  gameOver = createSprite(300,110,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.6;
  gameOver.visible = false;
  
  restart = createSprite(300,150,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;
}

function draw() {
  background(255);
  drawSprites();
  
  if(gameState===PLAY){
    
   ground.velocityX = -6;
    
   count = count+Math.round(getFrameRate()/60)
    
    
      if(keyDown("space") && trex.y>164){
    trex.velocityY = -12;
    }
    
    if(ground.x<0){
    ground.x = ground.width/2;
    }
    
  trex.velocityY = trex.velocityY+0.8;
    
  spawnClouds();
  spawnObstacles();
    
      if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
      }
  }
    
 else if(gameState===END){
    
    ground.velocityX = 0;
    
    trex.velocityY = 0;
    
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
   
    trex.changeAnimation("trex2",trex_collided);
   
   restart.visible = true;
   
   gameOver.visible = true;
    
    }
  
  trex.collide(invisibleGround);
  
  text("Score    "+count,500,80);
  
  if(mousePressedOver(restart)){
     reset();
     }
  
}

function spawnClouds(){
  
    if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.addImage(cloudImg);
    cloud.y = Math.round(random(80,120));   
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth +1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,70);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random (1,6));
     switch(rand){
       case 1: obstacle.addImage(obstacle1);
         break;
       case 2: obstacle.addImage(obstacle2);
         break;
       case 3: obstacle.addImage(obstacle3);
         break;
       case 4: obstacle.addImage(obstacle4);
         break;
       case 5: obstacle.addImage(obstacle5);
         break;
       case 6: obstacle.addImage(obstacle6);
         break;
         
         default:break;
     }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  trex.changeAnimation("trex1",trex_running);
  gameOver.visible = false;
  restart.visible = false;
  count = 0;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
}