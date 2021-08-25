// hiiiiii

// declaring the variables
var ironman, road, ultron, gameover, fbg, playB, controlsB, back, missile;

// score variables
var score = 0;

// declaring groups
var ultronGrup, missileGrup;

var gameStates = 0;

function preload() {
  ironI = loadImage("Ironman.png");
  roadI = loadImage("Road.jpg");
  ultronI = loadImage("ultron.png");
  missileI = loadImage("missile.png");
  fbgi = loadImage("background.jpg");
  playBI = loadImage("play.png");
  controlsBI = loadImage("controls.png");
  controlsBG = loadImage("controltext1.jpg");
  backI = loadImage("back.png");
  comic1 = loadImage("1.png");
  comic2 = loadImage("2.png");
  comic3 = loadImage("3.png");
  comic4 = loadImage("4.png");
  comic5 = loadImage("5.png");
  gameoverI = loadImage("gameover.jpeg");
  mainsound = loadSound("Gulmira.m4a");
  intro = loadSound("mark2.m4a");
}

function setup() {
  createCanvas(800,270)

  mainsound.loop();
  intro.loop();

  edges = createEdgeSprites();

  //background images 
  road = createSprite(900,135,20,20);
  road.addImage(roadI);
  road.scale = 1.53;
  road.visible = false;

  //Ironman
  ironman = createSprite(50,200,20,20);
  ironman.addImage(ironI);
  ironman.scale = 0.3;
  ironman.setCollider("rectangle",0,-150 ,140,400);
  ironman.rotation = 90;
  ironman.visible = false;
  //ironman.debug = true;

  //first background image
  fbg = createSprite(400,300,50,50);
  fbg.visible = true;
  fbg.addImage(fbgi);
  fbg.scale = 0.75;

  //play button
  playB = createSprite(400,80,50,20)
  playB.addImage(playBI);
  playB.scale = 0.2;
  playB.visible = true;

  //control button
  controlsB = createSprite(400,190,50,20)
  controlsB.addImage(controlsBI);
  controlsB.scale = 0.2;
  controlsB.visible = true;
    
  //gameOver imge
  gameover = createSprite(400,135,20,20);
  gameover.addImage(gameoverI);
  gameover.scale = 0.4;
  gameover.visible = false;
    
  //back button
  back = createSprite(740,250,50,20);
  back.addImage(backI);
  back.scale = 0.15;
  back.visible = false;
    
  //creating group
  ultronGrup = new Group();
  missileGrup = new Group();
}

function draw() {
  background(0);
  
  if(keyDown("T") && gameStates === 0 ) {
  gamestates = 4;
  }
  
  //console.log();
  
  //home page
  if (gameStates === 0) {
    mainsound.stop();

    ironman.visible = false;
    road.visible = false;
    back.visible = false;
    gameover.visible = false;
    playB.visible = true;
    controlsB.visible = true;
    fbg.visible = true;
    fbg.addImage(fbgi);
    fbg.scale = 0.75;
    fbg.x = 400;
    fbg.y = 300;

      //going to game
      if (mousePressedOver(playB)) {
        gameStates = "3a";
        frameCount = 1;
        score = 0;
        road.x = 900;
      }

      //controls page
      if (mousePressedOver(controlsB)) {
        gameStates = 1;
        } 

    drawSprites();
  }

    //basics of controls page
  if(gameStates === 1) {
    playB.visible = false;
    gameover.visible = false;
    controlsB.visible = false;
    back.visible = true;
    fbg.addImage(controlsBG);
    fbg.y = 135;
    fbg.scale = 1.04;

      if(mousePressedOver(back)) {
        gameStates = 0;
      }

    drawSprites();
  }

  //play state
  if(gameStates === 2) {

    ironman.visible = true;
    road.visible = true;
    back.visible = false;
    fbg.visible = false;
    playB.visible = false;
    gameover.visible = false;
    controlsB.visible = false;


      //missile launch code
      if(keyWentDown("SPACE")) {
        Shoot();
      }

    //reseting background
    if(road.x === -100) {
      road.x = 900;
    }
    road.velocityX  = -10;

    //controls for IRONMAN  
    if(keyDown("UP") || keyDown("W")) {
      ironman.y = ironman.y - 10;
    }

    if(keyDown("DOWN") || keyDown("S")) {
      ironman.y = ironman.y + 10;
    }

    ironman.bounce(edges);

    //ultron destroy code
    if(missileGrup.isTouching(ultronGrup)) {
      missileGrup.destroyEach();
      ultronGrup.destroyEach();
      score = score + 50;
    }

    if(ironman.isTouching(ultronGrup)) {
      gameStates = 4;
      mainsound.stop();
      intro.play();
      ultronGrup.destroyEach();
      missileGrup.destroyEach();
      }

    Ultron();

    drawSprites();

    // score display
    textSize(20);
    fill(0)
    text("Score: " +score,680,30);
  }

  // comic strips
  if(gameStates === "3a") {
    fbg.addImage(comic1);
    fbg.y = 130;
    fbg.scale = 1.05;
    playB.visible = false;
    controlsB.visible = false;

      if( frameCount % 200 === 0) {
        gameStates = "3b"
        frameCount = 1;
      }

    drawSprites();
  }

  if(gameStates === "3b") {
    fbg.addImage(comic2);
    fbg.y = 135;
    fbg.scale = 0.95;
    playB.visible = false;
    controlsB.visible = false;

      if( frameCount % 400 === 0) {
        gameStates = "3c";
        frameCount = 1;
      }

    drawSprites();
  }

  if(gameStates === "3c") {
    fbg.addImage(comic3);
    fbg.y = 135;
    fbg.scale = 0.95;
    playB.visible = false;
    controlsB.visible = false;

      if( frameCount % 400 === 0 ) {
        gameStates = "3d";
        frameCount = 1;
      }

    drawSprites();
  }

  if(gameStates === "3d") {
    fbg.addImage(comic4);
    fbg.y = 135;
    fbg.scale = 0.95;
    playB.visible = false;
    controlsB.visible = false;

      if( frameCount % 400 === 0) {
        gameStates = "3e";
        frameCount = 1;
      }

    drawSprites();
  }

  if(gameStates === "3e") {
    fbg.addImage(comic5);
    fbg.y = 135;
    fbg.scale = 0.85;
    playB.visible = false;
    controlsB.visible = false;

      if(frameCount % 300 === 0) {
        gameStates = 2;
        road.x = 900;
        intro.stop();
        mainsound.play();
      }

    drawSprites();
  }

  if(gameStates === 4) {
    gameover.visible = true; 
    ironman.visible = false;
    road.visible = false;
    back.visible = false;
    controlsB.visible = false;
    fbg.visible = false;
    back.visible = true; 

      if(keyDown("SPACE")) {
        gameStates = 2;
        mainsound.play();
        intro.stop();
        road.x = 900;
        score = 0;
      }

      if(mousePressedOver(back)) {
        gameStates = 0;
      }

    drawSprites();
    textSize(20);
    fill("YELLOW")
    text("PRESS SPACE TO RESTART" ,250,185)
  }
  
}

function Ultron() {
  
  if( frameCount % 200 ===0) {
    
    ultron = createSprite(850,100,20,20);
    ultron.y = Math.round(random(10,240));
    ultron.addImage(ultronI);
    ultron.scale = 0.5;
    ultron.velocityX = -10;
    ultron.setCollider("rectangle",-20,0, 180,50)
    ultron.lifetime = 300;
    ultronGrup.add(ultron);
    //ultron.debug = true;
  }
}

function Shoot() {
  missile = createSprite(ironman.x,ironman.y,20,20);
  missile.velocityX = 6;
  missile.addImage(missileI);
  missile.scale = 0.03 ;
  missile.rotation = 90;
  missile.lifetime = 150;
  missileGrup.add(missile);
}
